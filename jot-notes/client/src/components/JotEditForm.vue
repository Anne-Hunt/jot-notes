<script setup>
import { computed, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { jotService } from '../services/JotService.js';
// eslint-disable-next-line vue/no-dupe-keys
import { Jot } from '../models/Jot.js';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';

const jot = defineProps({Jot})
const activeJot = computed(()=> AppState.activeJot)
const userBooks = computed(()=> AppState.notebooks)
const route = useRoute()
const edit = ref(false) 

const formData = ref({
  name: activeJot.value?.name || '',
  body: activeJot.value?.body || '',
  color: activeJot.value?.color || '',
  tags: activeJot.value?.tags || [],
  private: activeJot.value?.private || '',
  notebookIds: activeJot.value?.notebookIds || [],
  editedAt: new Date().toLocaleDateString
})

async function updateJot(){
  try {
    if(activeJot.value?.notebookIds.includes(formData.value.notebookIds)){
      let notebooks = activeJot.value.notebookIds.push(formData.value.notebookIds)
      formData.value.notebookIds = notebooks
    }
    const jotId = route.params.jotId
    formData.value.editedAt = new Date().toLocaleDateString
    if(activeJot.value.notebookIds != formData.value.notebookIds){
      formData.value.notebookIds.push(activeJot.value.notebookIds)
    }
    await jotService.editUserJot(jotId, formData.value)
    openEdit()
  }
  catch (error){
    Pop.toast("Unable to get update Jot", 'error');
    logger.log("unable to get update jot", error)
  }
}

function openEdit(){
  edit.value = !edit.value
  logger.log(edit)
}

</script>


<template>
        <form @submit.prevent="updateJot()">
            <section class="row mt-3 px-0 mx-0">
                <div class="col-12 mb-3">
                    <div class="row justify-content-between ">
                        <div class="col-3">
                                    <label for="name">
                                    Name
                                </label>
                                </div>
                                <div class="col-4 text-end"><small class="fst-italic mb-2 text-dark">required; 24 characters max</small></div>
                            </div>
                    <input type="text" id="name" v-model="formData.name" class="form-control border-dark p-2" maxlength="24">
                </div>
    <div class="col-12 fill font mb-3" >
      <textarea class="rounded bg-light border border-dark form-control fill font w-100" name="body" v-model="formData.body" ></textarea>
    </div>
    <div class="col-12">
      <div class="row">
        <div class="col">
          <label for="color">Change Color</label>
          <select v-model="formData.color" class="form-select border-dark" aria-label="Default select example">
            <option selected>Select a Color</option>
            <option value="#85144b">Maroon</option>
            <option value="#FF4136">Red</option>
            <option value="#FF851B">Orange</option>
            <option value="#FFDC00">Yellow</option>
            <option value="#01FF70">Lime</option>
            <option value="#2ECC40">Green</option>
            <option value="#3D9970">Olive</option>
            <option value="#39CCCC">Teal</option>
            <option value="#7FDBFF">Aqua</option>
            <option value="#0074D9">Blue</option>
            <option value="#001f3f">Navy</option>
            <option value="#4b0082">Indigo</option>
            <option value="#B10DC9">Purple</option>
            <option value="#F012BE">Fuschia</option>
          </select>
        </div>
        <div class="col">
          <div class="form mb-2">
            <div class="row justify-content-between">
                        <div class="col-2">
                                    <label for="tags">
                                    Tags
                                </label>
                                </div>
                                <div class="col-10 text-end"><small class="fst-italic mb-2 text-dark">separate with commas</small></div>
                            </div>
            <input class="form-control border-dark" v-model="formData.tags" id="tags">
          </div>
        </div>
        <div class="class">
          <label for="notebooks">Add to Notebook</label>
          <select multiple aria-label="select multiple notebooks" class="form-select border-dark" name="notebookList" id="notebookList" v-model="formData.notebookIds">
            <option v-for="userbook in userBooks" :key="userbook.id" :value="userbook.id">{{ userbook.name }}</option>
          </select>
        </div>
        <div class="col">
          <div class="form-check mb-2 pt-4">
            <input class="form-check-input" v-model="formData.private" type="checkbox" value="true" id="privatecheck">
            <label class="form-check-label" for="privatecheck">
              Private?
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <button class="btn btn-dark" @click="updateJot()">SUBMIT</button>
    </div>
  </section>
        </form>
</template>


<style lang="scss" scoped>
.fill{
  height: 40dvh;
}
</style>
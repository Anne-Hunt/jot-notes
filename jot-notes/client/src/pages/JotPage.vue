<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import { jotService } from '../services/JotService.js';
import { accountService } from '../services/AccountService.js';


const activeJot = computed(()=> AppState.activeJot)
const account = computed(()=> AppState.account)
const route = useRoute()
const userBooks = computed(()=> AppState.notebooks)

// const jot = ref({
//   name: activeJot.value?.name,
//   body: activeJot.value?.body,
//   color: activeJot.value?.color,
//   tags: activeJot.value?.tags,
//   private: activeJot.value?.private,
//   editedAt: new Date().toLocaleDateString
// })

const formData = ref({
  name: activeJot.value?.name || '',
  body: activeJot.value?.body || '',
  color: activeJot.value?.color || '',
  tags: activeJot.value?.tags || [],
  private: activeJot.value?.private || '',
  notebookIds: activeJot.value?.notebookIds || [],
  editedAt: new Date().toLocaleDateString
})

// let editor = computed(()=> {if(AppState.account.id == AppState.activeJot.creatorId)return true})

const edit = ref(false)

async function setActiveJot(){
    try {
      const jotId = route.params.jotId
      await jotService.setActiveJot(jotId)
      logger.log(AppState.activeJot)
    }
    catch (error){
      Pop.toast("Unable to set active Jot", 'error');
      logger.log("unable to set active jot", error)
    }
}

async function updateJot(){
  try {
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

async function getNotebooks(){
  try {
    await accountService.getAccountNotebooks()
  }
  catch (error){
    Pop.toast("Unable to get Notebooks for user", 'error');
    logger.log("unable to get notebooks", error)
  }
} 
function openEdit(){
  edit.value = !edit.value
  logger.log(edit)
}
// createJot
// updateJot
// autoUpdateJot
// updateJotColor
// setActiveJot
// drawNoteCount
// drawJotListBtn
// drawJotList
// drawActiveJot
// deleteJot
// createNotebook
// setActiveNotebook
// drawNotebookChangerOptions
// drawNotebookList
// drawNotebookCount
// drawActiveNotebook
// deleteNotebook
// sortedByNotebooks
// autoSaveOn
// autoSaveOff
onMounted(()=>{
    setActiveJot()
    getNotebooks()
})

</script>


<template>
<section class="rounded px-2 my-3" :style="{backgroundColor: `${activeJot?.color}`}">

  <section class="row py-3 justify-content-between bg-dark " >
    <div class="col-10 text-light fontfix">
      <h1>Jot: "{{ activeJot?.name }}" <i v-if="activeJot?.private == true" class="mdi mdi-lock"></i><i class="mdi mdi-lock-open" v-else></i></h1>
    </div>
    <div class="col-1 text-light fontfix" v-if="account?.id == activeJot?.creatorId">
      <i class="mdi mdi-dots-horizontal fs-1" type="button" @click="openEdit()"></i>
    </div>
  </section>
  <section v-if="edit == true" class="row px-2 m-0 py-3">
    <input type="text" v-model="formData.name" class="form-control border-dark p-2" maxlength="24">
    <p class="text-end"><small class="fst-italic mb-2 text-dark">required; 24 characters max</small></p>
    <!-- <p>by {{ activeJot?.creator.name }}</p> -->
  </section>
  <section v-else class="row px-0 m-0 py-3">
    <h2 >{{ activeJot?.name }} </h2>
    <!-- <p>by {{ activeJot?.creator.name }}</p> -->
  </section>

  <section v-if="edit == true" class="row mt-3 px-0 mx-0">
    <div class="col-12 fill font mb-3" >
      <textarea class="rounded bg-light border border-dark form-control fill font w-100 fs-5" name="body" v-model="formData.body" ></textarea>
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
            <label for="tags">Tags</label>
            <input class="form-control border-dark" v-model="formData.tags" id="tags">
            <p class="text-end"><small class="fst-italic">separate with comma</small></p>
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

  <section v-else class="row mt-3 px-0 mx-0">
    <div class="col-12 rounded bg-light fs-5 shadow mb-3 fill font" >
      {{ activeJot?.body }}
    </div>
  </section>
  
</section>
</template>


<style lang="scss" scoped>

.fontfix{
  text-shadow: 1px 1px 4px black;
}
.fill{
  height: 50dvh;
}
.font{
    font-family: "Covered By Your Grace", "Reenie Beanie", sans-serif;
}
</style>
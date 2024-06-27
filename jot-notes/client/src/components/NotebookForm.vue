<script setup>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { notebookService } from '../services/NotebookService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';

const account = computed(()=>AppState.account)

let notebookData = ref({
    name: '',
    body: '',
    coverImg: '',
    color: '',
    tags: [],
    private: false,
    creatorId: ''
})

async function createNotebook(){
    try {
    notebookData.value.creatorId = AppState.account.id
    await notebookService.createNotebook(notebookData)
}
catch (error){
  Pop.toast("Unable to create Jot at this time", 'error');
  logger.log("unable to create jot", error)
}
}
</script>


<template>
<form @submit.prevent="createNotebook()">
    <div class="form-floating">
        <textarea class="form-control" placeholder="Notebook Name" id="name"></textarea>
        <label for="name">Name</label>
    </div>
    <div class="form-floating">
        <textarea class="form-control" placeholder="body" id="body"></textarea>
        <label for="body">Notebook Description</label>
    </div>
    <div class="form-floating">
        <textarea class="form-control" placeholder="URL for Cover Image" id="coverimg"></textarea>
        <label for="coverimg">Cover Image</label>
    </div>
    <div class="form-floating">
        <textarea class="form-control" placeholder="Separate tags with commas" id="tags"></textarea>
        <label for="tags">Tags</label>
    </div>
    <select class="form-select" aria-label="Default select example">
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
  <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="privatecheck">
      <label class="form-check-label" for="privatecheck">
          Private?
      </label>
  </div>
</form>
</template>


<style lang="scss" scoped>

</style>
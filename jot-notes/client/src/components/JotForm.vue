<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { jotService } from '../services/JotService.js';
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(()=>AppState.account)

let jotdata = ref({
    name: '',
    body: '',
    color: '',
    tags: [],
    private: false,
    creatorId: ''
})

async function createJot(){
try {
    jotdata.value.creatorId = AppState.account.id
    await jotService.createJot(jotdata)
}
catch (error){
  Pop.toast("Unable to create Jot at this time", 'error');
  logger.log("unable to create jot", error)
}
}
</script>


<template>
<form @submit.prevent="createJot()">
    <div class="form-floating">
        <textarea class="form-control" placeholder="Jot Name" id="name"></textarea>
        <label for="name">Name</label>
    </div>
    <div class="form-floating">
        <textarea class="form-control" placeholder="body" id="body"></textarea>
        <label for="body">Jot Text</label>
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
<script setup>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import { jotService } from '../services/JotService.js';
import { notebookService } from '../services/NotebookService.js';


const jots = computed(()=> AppState.jots)
const notebooks = computed(()=> AppState.notebooks)

async function getContent(){
try {
  await jotService.getPublicJots()
  await notebookService.getPublicNotebooks()
}
catch (error){
  Pop.toast("Unable to access content, sorry!", 'error');
  logger.log("unable to load public content", error)
}
}

onMounted(()=> 
getContent())
</script>

<template>
  <section class="row">

  </section>
<section class="row pt-3">
  <div class="col">
    <h2>Public Notebooks</h2>
    <div class="row">

      <div class="col-md-6 col-12" v-for="notebook in notebooks" :key="notebook.id">
        <Moleskine :notebook="notebook"></Moleskine>
      </div>
    </div>
  </div>
  <div class="col">
    <h2>Public Jots</h2>
    <div class="row">
      <div  class="col-md-6 col-12" v-for="jot in jots" :key="jot.id">
        <Page :jot="jot"></Page>
      </div>
      </div>
    </div>
</section>
</template>

<style scoped lang="scss">

</style>

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
<section class="row">
  <div class="col p-2">
    <h2>Public Notebooks</h2>
    <div v-for="notebook in notebooks" :key="notebook.id">
                        <NotebookListItem :notebook="notebook"></NotebookListItem>
                        </div>
  </div>
  <div class="col">
    <h2>Public Jots</h2>
    <div v-for="jot in jots" :key="jot.id">
                        <JotListItem :jot="jot"></JotListItem>
                        </div>
  </div>
</section>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>

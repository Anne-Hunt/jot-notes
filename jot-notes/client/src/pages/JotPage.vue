<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import { jotService } from '../services/JotService.js';


const activeJot = computed(()=> AppState.activeJot)
const route = useRoute()


async function setActiveJot(){
    try {
      const jotId = route.params.jotId
      await jotService.setActiveJot(jotId)
    }
    catch (error){
      Pop.toast("Unable to set active Jot", 'error');
      logger.log("unable to set active jot", error)
    }
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
})

</script>


<template>
<section class="row">
    <h1>Jot</h1>
    <div class="col-md-6 col-12">
      <textarea name="body" id="bodyarea" cols="30" rows="10"></textarea>
    </div>
    <div class="col-md-6 col-12"></div>
</section>
</template>


<style lang="scss" scoped>

</style>
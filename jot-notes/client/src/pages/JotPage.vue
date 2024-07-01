<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import { jotService } from '../services/JotService.js';


const activeJot = computed(()=> AppState.activeJot)
const account = computed(()=> AppState.account)
const route = useRoute()

const jot = ref({
  name: activeJot.value?.name,
  body: activeJot.value?.body,
  color: activeJot.value?.color,
  tags: activeJot.value?.tags,
  private: activeJot.value?.private,
  editedAt: Date()
})

let editor

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

async function updateJot(){
  try {
    const jotId = route.params.jotId
    await jotService.editUserJot(jotId, jot.value)
  }
  catch (error){
    Pop.toast("Unable to set update Jot", 'error');
    logger.log("unable to set update jot", error)
  }
}

function edit(){
  editor = false
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
    edit()
})

</script>


<template>
<section class="row" v-if="activeJot?.creatorId == account.id">
    <h1>Jot</h1>
    <div v-if="activeJot?.creatorId == account.id">
      <i class="mdi mdi-dots-horizontal fs-1" @click="edit()"></i>
    </div>
</section>
<section class="row" v-if="editor = true && activeJot?.creatorId == account.id">

</section>
<section class="row" v-else>
<h2 class="fontfix rounded" :style="{backgroundColor: `${activeJot?.color}`}">{{ activeJot?.name }} | <i class="mdi mdi-lock fs-2"></i></h2>
</section>

</template>


<style lang="scss" scoped>

.fontfix{
  text-shadow: 1px 1px 4px black;
}
</style>
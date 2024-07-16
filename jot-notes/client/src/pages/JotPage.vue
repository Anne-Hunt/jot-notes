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

let editor = false

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
<section class="rounded px-2 my-3" :style="{backgroundColor: `${activeJot?.color}`}">

  <section class="row py-3 justify-content-between bg-dark " >
    <div class="col-10 text-light fontfix">
      <h1>Jot: "{{ activeJot?.name }}" <i v-if="activeJot?.private == true" class="mdi mdi-lock"></i><i class="mdi mdi-lock-open" v-else></i></h1>
    </div>
    <div class="col-1 text-light fontfix" v-if="account?.id == activeJot?.creatorId">
      <i class="mdi mdi-dots-horizontal fs-1" @click="edit()"></i>
    </div>
  </section>
  <section class="row mt-3 px-0 mx-0">
    <div class="col-md-6 rounded bg-light border border-dark shadow" v-if="editor == false && !account">
      {{ activeJot?.body }}
    </div>
    <div class="col-md-6"  v-else-if="editor == true && account">
      <textarea class="rounded bg-light border border-dark" name="body" :id="activeJot?.id" cols="30" rows="10" v-model="jot.body"></textarea>
    </div>
  </section>
  <section class="row">
    <h2 >{{ activeJot?.name }} </h2>
  </section>
  
</section>
</template>


<style lang="scss" scoped>

.fontfix{
  text-shadow: 1px 1px 4px black;
}
</style>
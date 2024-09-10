<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import { jotService } from '../services/JotService.js';
import { accountService } from '../services/AccountService.js';
import JotEditForm from '../components/JotEditForm.vue';


const activeJot = computed(()=> AppState.activeJot)
const account = computed(()=> AppState.account)
const route = useRoute()
// const userBooks = computed(()=> AppState.notebooks)

// const jot = ref({
//   name: activeJot.value?.name,
//   body: activeJot.value?.body,
//   color: activeJot.value?.color,
//   tags: activeJot.value?.tags,
//   private: activeJot.value?.private,
//   notebookIds: activeJot.value?.notebookIds,
//   editedAt: new Date().toLocaleDateString
// })

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
  <!-- <section v-if="edit == true" class="row px-2 m-0 py-3">
    <input type="text" v-model.lazy=".name" class="form-control border-dark p-2" maxlength="24">
    <p class="text-end"><small class="fst-italic mb-2 text-dark">required; 24 characters max</small></p>
  </section>
  <section v-else class="row px-0 m-0 py-3">
    <h2 >{{ activeJot?.name }} </h2>
  </section> -->

  <JotEditForm v-if="edit == true"/>

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
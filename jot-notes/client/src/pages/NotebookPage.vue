<script setup>
import { computed, onMounted } from 'vue';
import Page from '../components/JotListItem.vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import { notebookService } from '../services/NotebookService.js';

const jots = computed(()=> AppState.jots)
const notebook = computed(()=> AppState.activeNotebook)
const route = useRoute()

async function setNotebook(){
try {
  const notebookId = route.params.notebookId
  await notebookService.getNotebookById(notebookId)
}
catch (error){
  Pop.toast("Unable to get notebook", 'error');
  logger.log('Unable to get notebook', error)
}
}

async function getJots(){
    try {
  const notebookId = route.params.notebookId
  await notebookService.getNotebookJots(notebookId)
}
catch (error){
  Pop.toast("Unable to get notebook", 'error');
  logger.log('Unable to get notebook', error)
}
}


onMounted(()=>{
    setNotebook()
    getJots()
})
</script>


<template>
    <section class="row">
        <div class="col-9">
        <section class="row align-items-center">
            <div class="col-3 rounded-start">
                <img class="object-fit-cover rounded-start" :src="notebook?.coverImg" alt="">
            </div>
            <div class="col-1"></div>
            <div class="col-8">
                <h3 class="fontfix text-light text-truncate"><i v-if="notebook?.private == true" class="mdi mdi-lock fontfix"></i>
                    {{ notebook?.name }}
                </h3>
                </div>
            </section>
            <section class="row">
                <!-- <div v-for="jot in jots" :key="jot?.id">
                    <Page jot="jot"></Page>
                </div> -->

            </section>
        </div>
        <div class="col-3">
            <img class="profile border border-3 shadow" :src="notebook?.creator.picture" alt="">
            <h2>By {{ notebook?.creator.name }}</h2>
        </div>
        </section>
</template>


<style lang="scss" scoped>
.profile{
    height: 100px;
    width: 100px;
    object-fit: cover;
    object-position: center;
}
</style>
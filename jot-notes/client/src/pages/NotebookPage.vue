<script setup>
import { computed, onMounted } from 'vue';
import Page from '../components/JotListItem.vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { useRoute } from 'vue-router';
import { notebookService } from '../services/NotebookService.js';

const jots = computed(()=> AppState.notebookJotList)
const notebook = computed(()=> AppState.activeNotebook)
const route = useRoute()
const image = computed(()=>`url(${AppState.activeNotebook?.coverImg})`)

async function setNotebook(){
try {
  const book = route.params.notebookId
  await notebookService.getNotebookById(book)
const jotbook = AppState.notebooks.find(book => book.id == route.params.notebookId)
AppState.activeNotebook = jotbook
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
    <section class="row m-0 p-0 justify-content-center">
        <div class="col-10">
        <section class="cover row align-items-center text-center">
            <!-- <div class="cover rounded-start">
                <img class="object-fit-cover rounded-start" :src="notebook?.coverImg" alt="">
            </div> -->
            <h3 class="fontfix text-light text-truncate"><i v-if="notebook?.private == true" class="mdi mdi-lock fontfix"></i>
                {{ notebook?.name }}
            </h3>
            <div class="col-1"></div>
            <div class="col-8">
                </div>
            </section>
            <section class="row">
                <div v-for="jot in jots" :key="jot?.id">
                    <Page :jot="jot"></Page>
                </div>

            </section>
        </div>
        <div class="col-3 px-0 m-0 py-3">
            <div class="row p-0 mx-0 mb-3 justify-content-center">
                <img class="profile border border-3 shadow rounded-circle p-0 m-0" :src="notebook?.creator?.picture" alt="">
            </div>
            <div class="row p-0 m-0 text-center">

                <h2>by {{ notebook?.creator?.name }}</h2>
            </div>
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

.cover{
    background-image: v-bind(image);
    height: 20dvh;
    background-position: center;
    background-size: cover;
    filter: contrast(.8);
}
.fontfix{
    text-shadow: 1px 1px 4px black;
}
</style>
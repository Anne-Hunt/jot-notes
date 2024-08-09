<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import JotListItem from '../components/JotListItem.vue';
import { useRoute } from 'vue-router';
import { accountService } from '../services/AccountService.js';

const account = computed(() => AppState.account)
const jots = computed(()=> AppState.jots)
const notebooks = computed(()=> AppState.notebooks)
const route = useRoute()

async function getContent(){
    try {
      await accountService.getAccountJots()
      await accountService.getAccountNotebooks()
    } catch (error) {
        logger.log('Unable to getContent')
        Pop.error('Unable to load any of your creations!', 'error')
    }
}

onMounted(()=>{
    getContent()
})

</script>

<template>
    <section class="row">
        <div class="col-12 about text-center">
            <div v-if="account">
                <div class="cover row bg-dark m-0 justify-content-center py-2 rounded-bottom shadow border-bottom border-start border-end border-light">
                    <h1 class="text-light fontfix">Welcome back, {{ account.name }}</h1>
                    <img class="profileImg rounded-circle border border-5 border-light p-0 shadow" :src="account.picture" alt="" />
                    <i class="mdi mdi-dots-horizontal fs-1 btn text-light text-end bottom-right fontfix" data-bs-toggle="modal"
                    data-bs-target="#modalId"></i>
                </div>
                <div class="row pt-3">
                    <div class="col-6">
                        <h2 class="text-white">Jots</h2>
                        <div v-for="jot in jots" :key="jot.id">
                        <JotListItem :jot="jot"></JotListItem>
                        </div>
                    </div>
                    <div class="col-6">
                        <h2 class="text-white">Notebooks</h2>
                        <div v-for="notebook in notebooks" :key="notebook.id">
                        <NotebookListItem :notebook="notebook"></NotebookListItem>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="col-12">
                <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
            </div>
        </div>
    </section>
    <Modal><AccountEditForm/></Modal>
</template>

<style scoped lang="scss">
.cover{
  height: 30dvh;
  background-image: url("src/assets/img/purty-wood.png");
  background-position: center;
  background-repeat: repeat;
  position:relative;
  text-align: center;
//   background-filter: contrast(.8);
}
.profileImg{
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
  position:absolute;
  bottom: -50px;
}
.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}
.fontfix{
  text-shadow: 1px 1px 4px black;
}
</style>

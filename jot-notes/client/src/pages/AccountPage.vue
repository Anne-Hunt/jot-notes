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
                <div class="row bg-info m-0 justify-content-center py-2 rounded-bottom shadow">
                    <h1 class="text-light fontfix">Welcome back, {{ account.name }}</h1>
                    <img class="rounded-circle border border-5 border-light p-0 shadow" :src="account.picture" alt="" />
                    <i class="mdi mdi-dots-horizontal fs-1 btn text-light text-end fontfix" data-bs-toggle="modal"
                    data-bs-target="#modalId"></i>
                </div>
                <div class="row pt-3">
                    <div class="col-6">
                        <h2>Jots</h2>
                        <div v-for="jot in jots" :key="jot.id">
                        <JotListItem :jot="jot"></JotListItem>
                        </div>
                    </div>
                    <div class="col-6">
                        <h2>Notebooks</h2>
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
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
}

.fontfix{
  text-shadow: 1px 1px 4px black;
}
</style>

<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import JotListItem from '../components/JotListItem.vue';
import { profileService } from '../services/ProfileService.js';
import { useRoute } from 'vue-router';

const profile = computed(() => AppState.activeProfile)
const account = computed(() => AppState.account)
const jots = computed(()=> AppState.jots)
const notebooks = computed(()=> AppState.notebooks)
const route = useRoute()

async function getContent(){
    try {
        const profileId = route.params.profileId
        await profileService.getProfileNotebooks(profileId)
        await profileService.getProfileJots(profileId)
    } catch (error) {
        logger.log('Unable to getContent')
        Pop.error('Unable to load any public creations!', 'error')
    }
}

onMounted(()=>
getContent())
</script>

<template>
    <section class="row">
        <div class="col-12 about text-center">
            <div v-if="account">
                <h1>Meet {{ profile.name }}</h1>
                <img class="rounded" :src="profile.picture" alt="" />
                <div class="row">
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
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>

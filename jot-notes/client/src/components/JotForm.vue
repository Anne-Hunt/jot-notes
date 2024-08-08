<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { jotService } from '../services/JotService.js';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { useRouter } from 'vue-router';

const account = computed(()=>AppState.account)
const jotId = computed(()=> AppState.activeJot.id)
const router = useRouter()

let jotdata = ref({
    name: '',
    body: "Start your jot here",
    color: '',
    tags: [],
    private: false,
    creatorId: ''
})

async function createJot(){
try {
    // jotdata.value.creatorId = account.value.id
    const dateNow = Date()
    await jotService.createJot(jotdata.value, dateNow)
    router.push({name: 'Jot', params: {jotId: AppState.activeJot.id}})
}
catch (error){
  Pop.toast("Unable to create Jot at this time", 'error');
  logger.log("unable to create jot", error)
}
}
</script>


<template>
    <div class="container-fluid">
        <form @submit.prevent="createJot()">
            <div class="form-floating" v-if="jotdata.name.length > 24">
                <textarea class="form-control border border-2 border-danger" v-model="jotdata.name" id="name"></textarea>
                <label for="name">Name</label>
                <p class="text-end"><small class="fst-italic mb-2 text-danger">required; 24 characters max</small></p>
            </div>
            <div class="form-floating" v-else>
                <textarea class="form-control" v-model="jotdata.name" id="name"></textarea>
                <label for="name">Name</label>
                <p class="text-end"><small class="fst-italic mb-2">required; 24 characters max</small></p>
            </div>
            <!-- <div class="form-floating mb-2">
                <textarea class="form-control" v-model="jotdata.body" placeholder="body" id="body"></textarea>
                <label for="body">Jot Text</label>
            </div> -->
            <div class="form-floating mb-2">
                <textarea class="form-control" v-model="jotdata.tags" placeholder="Separate tags with commas" id="tags"></textarea>
                <label for="tags">Tags</label>
                <p class="text-end"><small class="fst-italic">separate with comma</small></p>
            </div>
            <select v-model="jotdata.color" class="form-select" aria-label="Default select example">
                <option selected>Select a Color</option>
                <option value="#85144b">Maroon</option>
                <option value="#FF4136">Red</option>
                <option value="#FF851B">Orange</option>
                <option value="#FFDC00">Yellow</option>
                <option value="#01FF70">Lime</option>
                <option value="#2ECC40">Green</option>
                <option value="#3D9970">Olive</option>
                <option value="#39CCCC">Teal</option>
                <option value="#7FDBFF">Aqua</option>
                <option value="#0074D9">Blue</option>
                <option value="#001f3f">Navy</option>
                <option value="#4b0082">Indigo</option>
                <option value="#B10DC9">Purple</option>
                <option value="#F012BE">Fuschia</option>
            </select>
            <p class="text-end"><small class="fst-italic mb-2">required</small></p>
            <div class="row align-items-center justify-content-evenly p-2">
                <div class="col-6 form-check mb-2">
                    <input class="form-check-input" v-model="jotdata.private" type="checkbox" value="true" id="privatecheck">
                    <label class="form-check-label" for="privatecheck">
                        Private?
                    </label>
                </div>
                <div class="col-6" v-if="jotdata.name.length > 1 && account && jotdata.color">
                    <button class="btn btn-warning text-end" type="submit">SUBMIT</button>
                </div>
                <div class="col-6" v-else>
                    <button class="btn btn-warning text-end" type="submit" disabled>SUBMIT</button>
                </div>
            </div>
        </form>
    </div>
</template>


<style lang="scss" scoped>

</style>
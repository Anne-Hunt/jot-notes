<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { accountService } from '../services/AccountService.js';


const accountData = ref({
    name: '',
    picture: ''
})

async function updateAccount(){
    try {
      const update = accountData.value
      await accountService.editAccount(update)
    }
    catch (error){
      Pop.toast("Unable to update account", 'error');
      logger.log("unable to update account", error)
    }
}

</script>


<template>
    <form @submit.prevent="updateAccount()">
        <div class="form-floating mb-2">
            <textarea class="form-control" v-model="accountData.name" placeholder="Your Name" id="name"></textarea>
            <label for="name">Name</label>
        </div>
            <div class="form-floating mb-2">
                <textarea class="form-control" v-model="accountData.picture" placeholder="Picture URL" id="picture"></textarea>
                <label for="picture">Picture URL</label>
            </div>
            <button class="btn btn-warning" type="submit">SUBMIT</button>
        </form>
</template>


<style lang="scss" scoped>

</style>
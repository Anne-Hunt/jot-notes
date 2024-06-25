<script setup>
import { Notebook } from '../models/Notebook.js';


defineProps({notebook: Notebook})

</script>


<template>
<div>
    <RouterLink :to="{name: 'Notebook', params: {profileId: `${notebook.id}`}}">
        <h3><i v-if="notebook.private == true" class="mdi mdi-lock"></i>
            {{ notebook.name }}
        </h3>
    </RouterLink>
    
</div>
</template>


<style lang="scss" scoped>

</style>
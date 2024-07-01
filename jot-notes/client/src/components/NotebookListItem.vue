<script setup>
import { Notebook } from '../models/Notebook.js';


defineProps({notebook: Notebook})

</script>


<template>
<div>
    <RouterLink :to="{name: 'Notebook', params: {notebookId: `${notebook.id}`}}">
        <h3 class="fontfix text-light"><i v-if="notebook.private == true" class="mdi mdi-lock fontfix"></i>
            {{ notebook.name }}
        </h3>
    </RouterLink>
    
</div>
</template>


<style lang="scss" scoped>

</style>
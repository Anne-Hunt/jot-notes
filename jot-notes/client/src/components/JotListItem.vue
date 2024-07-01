<script setup>
import { Jot } from '../models/Jot.js';


defineProps({jot: Jot})

</script>


<template>
<div>
    <RouterLink :to="{name: 'Jot', params: {jotId: `${jot.id}`}}">
        <h3>
            <i v-if="jot.private == true" class="mdi mdi-lock"></i>
            {{ jot.name }}
        </h3>
    </RouterLink>
    
</div>
</template>


<style lang="scss" scoped>

</style>
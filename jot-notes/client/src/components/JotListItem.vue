<script setup>
import { Jot } from '../models/Jot.js';


defineProps({jot: Jot})

</script>


<template>
<div class="rounded mb-1 shadow p-2" :style="{backgroundColor: `${jot.color}`}">
    <RouterLink :to="{name: 'Jot', params: {jotId: `${jot.id}`}}">
        <h3 class="text-light fontfix">
            <i v-if="jot.private == true" class="mdi mdi-lock fontfix"></i>
            {{ jot.name }}
        </h3>
    </RouterLink>
    
</div>
</template>


<style lang="scss" scoped>
.fontfix{
  text-shadow: 1px 1px 4px black;
}
</style>
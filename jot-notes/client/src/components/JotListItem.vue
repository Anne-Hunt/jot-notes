<script setup>
import { Jot } from '../models/Jot.js';


defineProps({jot: Jot})

</script>


<template>
<div class="rounded mb-1 shadow size" :style="{backgroundColor: `${jot.color}`}">
    <RouterLink :to="{name: 'Jot', params: {jotId: `${jot.id}`}}">
        <div class="row h-100 align-items-center">
            <div class="col-1"></div>
            <div class="col-11">

                <h3 class="text-light fontfix text-truncate">
                    <i v-if="jot.private == true" class="mdi mdi-lock fontfix"></i>
                    {{ jot.name }}
                </h3>
            </div>
        </div>
    </RouterLink>
    
</div>
</template>


<style lang="scss" scoped>
.fontfix{
  text-shadow: 1px 1px 4px black;
}

.size{
    height: 10dvh;
}
</style>
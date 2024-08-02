<script setup>
import { Jot } from '../models/Jot.js';


defineProps({jot: Jot})

</script>


<template>
<div class="rounded mb-1 shadow size" >
    <RouterLink :to="{name: 'Jot', params: {jotId: `${jot.id}`}}">
        <div class="row h-100 align-items-center">
            <div class="col-1 rounded bg-dark p-0 m-0">
                <i class="mdi mdi-book fs-1" :style="{color: `${jot.color}`}"></i>
            </div>
            <div class="col-11">
                <h3 class="text-dark">
                    {{ jot.name }}
                </h3>
                <div class="text-truncate book">
                    <i v-if="jot.private == true" class="mdi mdi-lock text-dark bottom-right fontfix"></i>
                </div>
            </div>
        </div>
    </RouterLink>
    
</div>
</template>


<style lang="scss" scoped>
.fontfix{
  text-shadow: 1px 1px 4px black;
}
.book{
    position: relative;
}
.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}
.size{
    height: 10dvh;
}
</style>
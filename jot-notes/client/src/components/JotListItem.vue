<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Jot } from '../models/Jot.js';

const account = computed(()=> AppState.account)

defineProps({jot: Jot})

</script>


<template>
    <div v-if="jot.private == true && jot.creatorId != account.id" class="">

    </div>
<div v-else class="rounded mb-1 shadow size bg-light px-2 mx-0 my-2" >
    <RouterLink :to="{name: 'Jot', params: {jotId: `${jot.id}`}}">
        <div class="row h-100 align-items-center p-0 m-0">
            <div class="col-1 rounded px-1 m-0 book text-center">
                <i class="mdi mdi-book fs-1" :style="{color: `${jot.color}`}"></i>
                <i v-if="jot.private == true" class="mdi mdi-lock text-black center"></i>
            </div>
            <div class="col-11 p-0 m-0">
                <span class="text-dark text-truncate fs-3 font">
                    {{ jot.name }}
                </span>
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
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.size{
    height: 10dvh;
}
.font{
    font-family: "Covered By Your Grace", "Reenie Beanie", sans-serif;
}
</style>
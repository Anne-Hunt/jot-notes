<script setup>
import { Jot } from '../models/Jot.js';


defineProps({jot: Jot})

</script>


<template>
        <RouterLink :to="{name: 'Jot', params: {jotId: `${jot.id}`}}">
        <div class="rounded-end p-2 shadow size bg-white mb-2 font">
            <p class="pb-0 text-truncate text-uppercase" :style="{color: `${jot.color}`}">{{ jot.name }}
                <i v-if="jot.private == true" class="mdi mdi-lock fontfix"></i>
            </p>
            <p class="body text-dark text-wrap text-truncate text-start">{{ jot.body }}</p>
        </div>
        </RouterLink>
</template>


<style lang="scss" scoped>
.fontfix{
  text-shadow: 1px 1px 4px black;
}

.size{
    width: 165px;
    height: 29.5dvh;
    background-image: url("src/assets/img/light-paper-fibers.png");
}

.body{
    font-size: xx-small;
}
.font{
    font-family: "Covered By Your Grace", "Reenie Beanie", sans-serif;
}
</style>
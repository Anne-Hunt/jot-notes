<script setup>
import { Jot } from '../models/Jot.js';


defineProps({jot: Jot})

</script>


<template>
        <RouterLink :to="{name: 'Jot', params: {jotId: `${jot.id}`}}">
        <div class="rounded-end p-2 shadow size bg-page mb-2">
            <p class="pb-0 text-truncate" :style="{color: `${jot.color}`}">{{ jot.name }}
                <i v-if="jot.private == true" class="mdi mdi-lock fontfix"></i>
            </p>
            <p class="body text-dark text-wrap text-truncate">{{ jot.body }}</p>
        </div>
        </RouterLink>
</template>


<style lang="scss" scoped>
.fontfix{
  text-shadow: 1px 1px 4px black;
}

.size{
    width: 175px;
    height: 29dvh;
}

.body{
    font-size: xx-small;
}
</style>
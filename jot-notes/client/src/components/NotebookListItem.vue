<script setup>
import { Notebook } from '../models/Notebook.js';


defineProps({notebook: Notebook})

</script>


<template>
<div>
    <div class="rounded size mb-1 shadow" :style="{backgroundColor: `${notebook.color}`}">

        <RouterLink :to="{name: 'Notebook', params: {notebookId: `${notebook.id}`}}">
            <div class="row align-items-center p-o m-0">
                <div class="col-3 rounded-start p-0 m-0 d-flex justify-content-start">
                    <img class="object-fit-cover rounded-start" :src="notebook.coverImg" alt="">
                </div>
                <div class="col-1"></div>
                <div class="col-8">
                    <h3 class="fontfix text-light text-truncate font"><i v-if="notebook.private == true" class="mdi mdi-lock fontfix"></i>
                        {{ notebook.name }}
                    </h3>
                </div>
            </div>
        </RouterLink>
    </div>
    
</div>
</template>


<style lang="scss" scoped>
img{
    object-fit: cover;
    object-position: center;
    height: 10dvh;
    width: 100px;
}

.size{
    max-height: 10dvh;
}

.fontfix{
  text-shadow: 1px 1px 4px black;
}
.font{
    font-family: "Covered By Your Grace", "Reenie Beanie", sans-serif;
}

</style>
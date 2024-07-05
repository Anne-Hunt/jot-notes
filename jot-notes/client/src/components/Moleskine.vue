<script setup>
import { Notebook } from '../models/Notebook.js';


defineProps({notebook: Notebook})

</script>


<template>
    <div class="rounded-end size mb-2 p-0 border border-dark shadow">
        <RouterLink :to="{name: 'Notebook', params: {notebookId: `${notebook.id}`}}">
    <div class="top" :style="{backgroundColor: `${notebook.color}`}">
    </div>
    <div class="spine p-0 m-0"></div>
            <div class="row m-0 p-0 align-items-center">
                <div class="row p-0 m-0 bg-light">
                    <p class="text-dark text-uppercase text-truncate">
                        {{ notebook.name }}
                        <i v-if="notebook.private == true" class="mdi mdi-lock fontfix"></i>
                    </p>
                </div>
            </div>
            <div class="row bg-warning p-0 m-0 stripe shadow"></div>
            <div class="bottom shadow" :style="{backgroundColor: `${notebook.color}`}"></div>
            <div class="bg-page pages shadow"></div>
            <div class="band shadow"></div>
        </RouterLink>
</div>
</template>


<style lang="scss" scoped>

.size{
    max-width: 175px;
}

.top{
    height: 10dvh;
}

.bottom{
    height: 10dvh;
}

.stripe{
    height: 2dvh;
}

.band{
    height: 5px;
    width: 29.5dvh;
    transform: rotate(90deg) translate(-48%, -500%);
    background-color: rgb(70, 68, 68);
    // position: absolute;
//   top: 10%;
//   right: 20%;
}

.spine{
    height: 5px;
    width: 28dvh;
    transform: rotate(90deg) translate(13%, 1980%);
    background-color: black;
    opacity: 10%;
    // position: absolute;
//   top: 10%;
//   right: 20%;
}
.pages{
    height: 2px;
}

.fontfix{
  text-shadow: 1px 1px 4px black;
}
</style>
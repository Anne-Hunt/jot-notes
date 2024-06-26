<script setup>
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'


</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
  --c-navy: #001f3f;
--c-blue: #0074D9;
--c-aqua: #7FDBFF;
--c-teal: #39CCCC;
--c-purple: #B10DC9;
--c-indigo: #4b0082;
--c-fuchsia: #F012BE;
--c-maroon: #85144b;
--c-red: #FF4136;
--c-orange: #FF851B;
--c-yellow: #FFDC00;
--c-olive: #3D9970;
--c-green: #2ECC40;
--c-lime: #01FF70;
--c-black: #111111;
--c-grey: #AAAAAA;
--c-silver: #DDDDDD;
--c-white: #FFFFFF;
--c-primary: #8254ad;
--c-secondary: #603e80;
--c-tertiary: #ad68ed;
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>

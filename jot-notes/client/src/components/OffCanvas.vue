<script setup>
import JotForm from './JotForm.vue';
import NotebookForm from './NotebookForm.vue';


</script>


<template>
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasForms" aria-labelledby="ocLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="ocLabel">Create</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="accordion" id="accordionForms">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        Create a Jot
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionForms">
      <div class="accordion-body">
        <JotForm/>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Create a Notebook
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionForms">
      <div class="accordion-body">
        Complete the form to make a new notebook
        <NotebookForm/>
    </div>
  </div>
</div>
  </div>
</div>
</div>
</template>


<style lang="scss" scoped>

</style>
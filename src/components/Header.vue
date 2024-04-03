<script>
  import {store} from '../data/store.js';

  export default {
    data() {
      return {
        store,
      }
    },
  }
</script>

<template>

  <header class="bg-dark m-0 py-3">
    <div class="container d-flex justify-content-between">
      <h1 class="text-danger fw-bold">Boolflix</h1>
      <div class="d-flex align-items-center">
        <input class="py-1 px-2 me-2 rounded-3" type="text" v-model="store.apiParams.query">
        <div @click="$emit('performSearch')" class="btn btn-warning fw-bold">Cerca</div>
      </div>
    </div>
  </header>

</template>

<style lang="scss" scoped>
  

</style>
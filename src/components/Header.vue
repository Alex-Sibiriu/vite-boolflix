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

  <header class="bg-black m-0 py-3">
    <div class="container d-flex justify-content-between">
      <h1 @click="store.isSearching = false" class="my-logo text-danger fw-bold cursp">Boolflix</h1>
      <div class="d-flex align-items-center">
        <input @keyup.enter="$emit('performSearch')" v-model.trim="store.apiParams.query" class="py-1 px-2 me-2 rounded-3" type="text" placeholder="Cerca...">
        <div @click="$emit('performSearch')" class="btn btn-warning fw-bold">Cerca</div>
      </div>
    </div>
  </header>

</template>

<style lang="scss" scoped>
  
  .my-logo {
    cursor: pointer;
  }

</style>
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
  <div class="container">
    <input type="text" v-model="store.apiParams.query">
    <div @click="$emit('performSearch')" class="btn btn-info">Cerca</div>
  </div>
</template>

<style lang="scss" scoped>
  

</style>
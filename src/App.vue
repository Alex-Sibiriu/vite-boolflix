<script>
  import axios from 'axios';  
  import {store} from './data/store.js';
  import Header from './components/Header.vue';
  import Main from './components/Main.vue';

  export default {
    components: {
      Header,
      Main,
    },
    data() {
      return {
        store,
      }
    }
  }
</script>

<template>
  <h1 class="text-center">Hello</h1>
</template>

<style lang="scss" scoped>
  @import './assets/scss/main.scss';

</style>
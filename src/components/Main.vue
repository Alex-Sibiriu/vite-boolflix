<script>
  import {store} from '../data/store.js';
  import PopShow from './partials/PopShow.vue';
  import Card from './partials/Card.vue';

  export default {
    components : {
      PopShow,
      Card,
    },

    data() {
      return {
        store,
      }
    },
  }
</script>

<template>

  <main class="bg-dark py-5">

    <PopShow />

    <div class="container">
      <h2
        v-if="store.movie.showList.length > 0"
        class="fw-bold text-center text-white fs-1">Film
        <span v-if="store.selectedGenre">: {{ store.selectedGenre }}</span>
      </h2>
      <div class="row row-cols-6">
        <Card 
          v-for="movie in store.movie.showList" 
          :key="movie.id"
          :program="movie"
        />
      </div>
    </div>
  
    <div class="container mb-5">
      <h2
        v-if="store.tv.showList.length > 0"
        class="fw-bold text-center text-white fs-1 mt-5">Serie TV
        <span v-if="store.selectedGenre">: {{ store.selectedGenre }}</span>
      </h2>
      <div class="row row-cols-6">
        <Card 
          v-for="serie in store.tv.showList" 
          :key="serie.id"
          :program="serie"
        />
      </div>
    </div>
  </main>

</template>

<style lang="scss" scoped>
  
  main {
    min-height: calc(100vh - 70px)
  }

</style>
<script>
  import {store} from '../data/store.js';
  import Card from './partials/Card.vue'

  export default {
    components : {
      Card
    },

    data() {
      return {
        store,
      }
    },
  }
</script>

<template>

  <main class="py-3">
    <div class="container">
      <h2 v-if="store.allMovies.length > 0" class="fw-bold text-center text-white fs-1">Film</h2>
      <div class="row row-cols-3">
        <Card 
          v-for="movie in store.allMovies" 
          :key="movie.id"
          :program="movie"
        />
      </div>
    </div>
  
    <div class="container mb-5">
      <h2 v-if="store.allSeries.length > 0" class="fw-bold text-center text-white fs-1 mt-5">Serie TV</h2>
      <div class="row row-cols-3">
        <Card 
          v-for="serie in store.allSeries" 
          :key="serie.id"
          :program="serie"
        />
      </div>
    </div>
  </main>

</template>

<style lang="scss" scoped>
  

</style>
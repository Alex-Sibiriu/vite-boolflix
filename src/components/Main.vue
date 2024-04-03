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

  <div class="container mb-5">
    <h2>Film</h2>
    <div class="row row-cols-3">
      <Card 
        v-for="movie in store.allMovies" 
        :key="movie.id"
        :originalTitle="movie.originalTitle" 
        :title="movie.title"
        :language="movie.language"
        :rating="movie.rating"
      />
    </div>
  </div>

  <div class="container mb-5">
    <h2>Serie TV</h2>
    <div class="row row-cols-3">
      <Card 
        v-for="serie in store.allSeries" 
        :key="serie.id"
        :originalTitle="serie.originalTitle" 
        :title="serie.title"
        :language="serie.language"
        :rating="serie.rating"
      />
    </div>
  </div>

</template>

<style lang="scss" scoped>
  

</style>
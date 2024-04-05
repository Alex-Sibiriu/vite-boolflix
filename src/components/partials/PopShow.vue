<script>
  import {store} from '../../data/store';
  import Card from './Card.vue'

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

    <div class="container">
      <h2 v-if="store.movie.popularList.length > 0" class="fw-bold text-center text-white fs-1">Film Popolari</h2>
      <div class="row row-cols-6">
        <Card 
          v-for="movie in store.movie.popularList" 
          :key="movie.id"
          :program="movie"
        />
      </div>
    </div>

    <div class="container">
      <h2 v-if="store.tv.popularList.length > 0" class="fw-bold text-center text-white fs-1 mt-5">Serie TV Popolari</h2>
      <div class="row row-cols-6">
        <Card 
          v-for="serie in store.tv.popularList" 
          :key="serie.id"
          :program="serie"
        />
      </div>
    </div>

</template>

<style lang="scss" scoped>
  

</style>
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

    <div v-if="store.isPopMovie" class="container">
      <h2 v-if="store.movie.popularList.length > 0" class="my-5 fw-bold ps-3 text-white fs-1">Popular Movies</h2>
      <div class="row row-cols-6">
        <Card 
          v-for="movie in store.movie.popularList" 
          :key="movie.id"
          :program="movie"
        />
      </div>
    </div>

    <div v-if="store.isPopTv" class="container">
      <h2 v-if="store.tv.popularList.length > 0" class="my-5 fw-bold ps-3 text-white fs-1">Popular TV Series</h2>
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
  
  h2 {
    border-left: 5px solid red;
  }

</style>
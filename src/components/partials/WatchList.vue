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

    <div class="container text-center text-white">
      <h2 class="fs-1 fw-bold">Your Watchlist</h2>
    </div>

    <h2 v-if="store.myWatchList.movie.length < 1 && store.myWatchList.tv.length < 1" class="fs-1 fw-bold text-center">Is Empty</h2>

    <div v-if="store.myWatchList.movie" class="container">
      <h3 v-if="store.myWatchList.movie.length > 0" class="ps-3 fw-bold text-white fs-2">Tv Series</h3>
      <div class="row row-cols-6">
        <Card 
          v-for="movie in store.myWatchList.movie" 
          :key="movie.id"
          :program="movie"
        />
      </div>
    </div>

    <div v-if="store.myWatchList.tv" class="container">
      <h3 v-if="store.myWatchList.tv.length > 0" class="ps-3 mb-5 fw-bold text-white fs-1 mt-5">Movies</h3>
      <div class="row row-cols-6">
        <Card 
          v-for="serie in store.myWatchList.tv" 
          :key="serie.id"
          :program="serie"
        />
      </div>
    </div>

</template>

<style lang="scss" scoped>
  
  h2 {
    color: #DC1A28;
  }

  h3 {
    border-left: 5px solid #DC1A28;
  }

</style>
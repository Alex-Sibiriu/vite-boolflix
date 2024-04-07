<script>
  import {store} from '../../data/store.js';
  import Card from './Card.vue';

  export default {
    components : {
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

    <div class="container">
      <h2
        v-if="store.movie.showList.length > 0"
        class="my-5 ps-3 fw-bold text-white fs-1">Movies
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
        :class="{'separator' : store.movie.showList.length > 0}"
        class="my-5 ps-3 fw-bold text-white fs-1 pt-2">TV Series
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

</template>

<style lang="scss" scoped>

  .separator {
    border-top: 5px solid grey;
  }

  h2 {
    border-left: 5px solid red;
  }

</style>
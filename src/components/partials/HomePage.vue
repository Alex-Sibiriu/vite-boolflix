<script>
  import {store} from '../../data/store.js';
  import PopShow from './PopShow.vue';
  import Card from './Card.vue';
  import Swiper from './Swiper.vue';
  import Jumbo from './Jumbo.vue';


  export default {
    components : {
      PopShow,
      Card,
      Swiper,
      Jumbo,
    },

    data() {
      return {
        store,
      }
    },
  }
</script>

<template>
  
    <Jumbo 
      :show="store.jumboShow"
    />

    <h3 v-if="store.movie.popularList.length > 0" class="ms-5 ps-3 text-white mt-5 pb-1 fw-bold">Popular Movie</h3>
    <Swiper 
      :showList="store.movie.popularList"
    />
    
    <h3 v-if="store.tv.animeList.length > 0" class="ms-5 ps-3 text-white mt-5 pb-1 fw-bold">Animation</h3>
    <Swiper 
      :showList="store.tv.animeList"
    />

    <h3 v-if="store.tv.actionList.length > 0" class="ms-5 ps-3 text-white mt-5 pb-1 fw-bold">Action Adventure</h3>
    <Swiper 
      :showList="store.tv.actionList"
    />

</template>

<style lang="scss" scoped>

  h3 {
    border-left: 5px solid red;
  }

</style>
<script>
  import {store} from '../data/store.js';

  import HomePage from './partials/HomePage.vue';
  import FilteredPage from './partials/FilteredPage.vue';
  import PopShow from './partials/PopShow.vue';
  import WatchList from './partials/WatchList.vue';

  export default {
    components : {
      HomePage,
      FilteredPage,
      PopShow,
      WatchList,
    },

    data() {
      return {
        store,
      }
    },
  }
</script>

<template>

  <main class="bg-black">
  
    <HomePage 
      v-if="store.isHome"
    />

    <FilteredPage 
      v-if="!store.isHome && !store.isPopMovie & !store.isPopTv"
    />

    <PopShow 
      v-if="!store.isHome"
    />

    <WatchList 
      v-if="store.isWatchList && !store.isHome && !store.isPopMovie & !store.isPopTv"
    />

  </main>

</template>

<style lang="scss" scoped>
  
  main {
    min-height: calc(100vh - 70px);
    padding-bottom: 300px;
    overflow: hidden;
  }

</style>
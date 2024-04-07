<script>
  import {store} from '../../data/store';

  export default {
    components: {
    },

    props: {
      program: Object,
    },

    data() {
      return {
        store,
      }
    },

    methods: {
      getImagePath(imgPath) {
        return new URL(imgPath, import.meta.url).href
      },
    }
  }
</script>

<template>
  <div class="col mt-3 text-center">
    
    <div
      @click="store.isShowDetails = true; store.selectedShow = program"
      class="card h-100 bg-poster position-relative overflow-hidden">
      <img v-if="program.poster_path" class="h-100 poster-img" :src="`https://image.tmdb.org/t/p/w342/${program.poster_path}`">
      <img v-else class="h-100 poster-img" src="../../assets/img/default-img.png" :alt="program.title">
      <h2 v-if="!program.poster_path" class="text-white position-absolute start-50 bottom-0 translate-middle-x pb-3">{{ program.title }}</h2>

    </div>

  </div>
</template>

<style lang="scss" scoped>

.card {
  background: rgb(75, 75, 75);
  cursor: pointer;
  transition: all .6s;
  &:hover {
    scale: 1.1;
    z-index: 10;
  }
  &:hover .poster-img {
    filter: brightness(1.2);
  }
  .poster-img {
    transition: all .6s;
  }
}

</style>
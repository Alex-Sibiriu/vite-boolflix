<script>
  import {store} from '../../data/store';

  export default {
    props: {
      show: Object
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
    },

    computed: {
      gradientStacco() {
        return store.selectedShow.vote_average * 10;
      },
    }
  }
</script>

<template>

  <div v-if="store.isShowDetails" class="wrapper w-100 fixed-top d-flex justify-content-center align-items-center">
    <div class="my-info-box d-flex flex-wrap container rounded-3 text-white bg-dark px-4 pb-3">

      <div @click="store.isShowDetails = false" class="w-100 pt-1 pb-3 text-secondary text-end fs-3"><i class="fa-regular fa-circle-xmark"></i></div>

      <div class="left-details pe-3 d-flex flex-column justify-content-between">
        <div class="titles">
          <h2 class="pb-3">Title: {{ show.title }}</h2>
          <h3>Original Title: {{ show.originalTitle }}</h3>

          <img
          v-if="show.original_language === 'en' || show.original_language === 'it'"
          class="lang-flag mx-auto py-4 rounded-circle"
          :src="getImagePath(`../../assets/img/${show.original_language}.png`)"
          :alt="show.original_language">
          <p v-else class="fs-6 pt-2"> Language: {{ show.original_language }}</p>

          <div class="star-box text-warning" :style="{ background: 'linear-gradient(to right, gold '+ gradientStacco +'%, transparent '+ gradientStacco +'%)' }">
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <p class="pt-5">{{ show.overview }}</p>
        </div>

        <div class="mt-4">
          <h4 class="pb-3">Cast</h4>
          <div class="d-flex">
            <span
              v-for="actor in store.allCast"
              :key="actor.id"
              class="actor-section d-inline-block d-flex flex-column align-items-center px-2">
              <img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/w342/${actor.profile_path}`">
              <img v-else-if="actor.gender === 1" src="../../assets/img/default-female-icon.jpg">
              <img v-else-if="actor.gender === 2" src="../../assets/img/default-male-icon.jpg">
              <img v-else src="../../assets/img/default-image.png">
              <h4 class="text-center pt-2">{{ actor.name }}</h4>
              <h6 v-if="actor.character" class="text-center">as {{ actor.character }}</h6>
            </span>
          </div>
        </div>

        
      </div>
      
      <div class="right-details d-flex justify-content-end">
        <img v-if="show.poster_path" class="mb-3" :src="`https://image.tmdb.org/t/p/w342/${show.poster_path}`">
      </div>

    </div>
  </div>

</template>

<style lang="scss" scoped>
  
  .wrapper {
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    i {
      cursor: pointer;
    }
    .left-details {
      width: 70%;
      .lang-flag {
        width: 60px;
      }
      .star-box {
        mask-image: url('../../assets/img/star-solid.svg');
        mask-size: 1.105rem;
        mask-position: center;
        mask-repeat: repeat-x;
        mask-origin: content-box;
        width: fit-content;
      }
      .actor-section {
        width: calc(100% / 5);
        img {
          width: 80%;
          aspect-ratio: 1;
          object-fit: cover;
          object-position: center;
          border-radius: 50%;
        }
      }
    }
    .right-details {
      width: 30%;
    }
  }

</style>
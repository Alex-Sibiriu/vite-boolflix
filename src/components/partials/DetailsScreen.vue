<script>
  import {store} from '../../data/store';
  import Swiper from './Swiper.vue'; 

  export default {
    props: {
      show: Object
    },

    components: {
      Swiper,
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

      toggleWatchList(show, showID) {
        if (!store.myWatchList[show.type].includes(show)) {
          store.myWatchList[show.type].unshift(show)
        } else {
          const index = store.myWatchList[show.type].findIndex(item => item.id === showID);
            store.myWatchList[show.type].splice(index, 1);
        }
      }
    },

    computed: {
      allGenres() {
        const genresArray = store.selectedShow.type === 'movie' ? store.movie.allGenres : store.tv.allGenres
        const allGenres = [];
        let j = 0;

        for (let i = 0; i < genresArray.length; i++) {
          if (genresArray[i].id === store.selectedShow.genre_ids[j] && genresArray[i].name) {
            allGenres.push(genresArray[i].name)
            j++
          }
        }

        return allGenres.join(', ')
      }
    }
  }
</script>

<template>

  <div v-if="store.isShowDetails" class="wrapper w-100 fixed-top d-flex justify-content-center align-items-center">
    <div class="my-info-box d-flex flex-wrap container rounded-3 text-white bg-dark px-4 pb-3">

      <div @click="store.isShowDetails = false" class="w-100 pt-1 pb-3 text-secondary text-end fs-3"><i class="fa-regular fa-circle-xmark"></i></div>

      <div class="left-details pe-3 d-flex flex-column justify-content-between">
        <div class="titles pb-3">
          <h2 class="pb-3">Title: {{ show.title }}</h2>
          <h4 class="pb-4">Original Title: {{ show.originalTitle }}</h4>
          
          <span class="star-box text-warning me-2" :style="{ background: 'linear-gradient(to right, gold '+ show.vote_average * 10 +'%, transparent '+ show.vote_average * 10 +'%)' }">
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </span>

          <span class="p-2" v-if="show.releaseDate">Release: {{ show.releaseDate.split('-')[0] }}</span>

          <img class="lang-icon" :src="`https://www.unknown.nu/flags/images/${show.original_language}-100`" :alt="show.original_language">

          <p class="mt-2" v-if="allGenres">Genres: {{ allGenres }}</p>

          <p class="pt-4">{{ show.overview }}</p>

          <span @click.stop="changeJumbo(show)" class="btn btn-secondary me-1 mb-2 fs-4 mt-4">
            <span>Play </span>
            <i class="fa-regular fa-circle-play ms-2"></i>
          </span>

          <span class="btn btn-secondary ms-1 mb-2 fs-4 mt-4">
            <span @click="toggleWatchList(show, show.id)">

              <span v-if="!store.myWatchList[show.type].includes(show)">
                Add to Watchlist <i class="fa-regular fa-square-plus ms-2"></i>
              </span>

              <span v-else>Remove from Watchlist <i class="fa-regular fa-square-minus ms-2"></i></span>
              
            </span>
          </span>

        </div>


        <div v-if="show.cast.length > 0" class="mt-auto">
          <h5 class="pb-3">Cast</h5>
          <div class="d-flex">
            <div
              v-for="actor in show.cast"
              :key="actor.id"
              class="actor-section d-flex flex-column align-items-center px-2">

              <img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/w342/${actor.profile_path}`">
              <img v-else-if="actor.gender === 1" src="../../assets/img/default-female-icon.jpg">
              <img v-else-if="actor.gender === 2" src="../../assets/img/default-male-icon.jpg">
              <img v-else src="../../assets/img/default-image.png">
              
              <h6 class="text-center pt-2 m-0 fw-bold">{{ actor.name }}</h6>
              <p v-if="actor.character" class="text-center fst-italic">as {{ actor.character }}</p>
          </div>
          </div>
        </div>

        <div v-if="show.similar.length > 0">
          <h5>Similar</h5>
          <div class="d-flex">
            <div v-for="item in show.similar" :key="item.id" @click="store.selectedShow = item" class="similar-box">

              <img :src="`https://image.tmdb.org/t/p/w342/${item.backdrop_path}`">
              <h6 class="text-white text-center pt-2">{{ item.title }}</h6>

            </div>
          </div>
        </div>

      </div>
      
      <div class="right-details">
        <img v-if="show.poster_path" class="mb-3 ms-3" :src="`https://image.tmdb.org/t/p/w342/${show.poster_path}`">
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
      .lang-icon {
        width: 25px;
      }
      .star-box {
        mask-image: url('../../assets/img/star-solid.svg');
        mask-size: 1.125rem;
        mask-position: left;
        mask-repeat: repeat-x;
        mask-origin: content-box;
      }
      .actor-section {
        width: 20%;
        img {
          width: 60%;
          aspect-ratio: 1;
          object-fit: cover;
          object-position: center;
          border-radius: 50%;
        }
      }
      .similar-box {
        width: calc(20% - 5px);
        margin-right: 5px;
        cursor: pointer;
        img {
          width: 100%;
          border: 5px solid black;
        }
      }
    }
    .right-details {
      width: 30%;
      img {
        max-width: 100%;
      }
    }
  }

</style>
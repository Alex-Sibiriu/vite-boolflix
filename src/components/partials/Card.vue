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

      starRating(rating) {
        const ratingInt = Math.ceil(rating)
        const starArray = []

        for (let i = 0; i < 5; i++) {
          if (i < ratingInt / 2 ) {
            starArray.push('<i class="fa-solid fa-star"></i>')
          } else {
            starArray.push('<i class="fa-regular fa-star"></i>')
          }
        }

        return starArray.join('')
      },

      showDetails(show) {
        this.store.isShowDetails = true;
        show.type === 'movie' ? store.movieCastParams.movie_id = show.id : store.seriesCastParams.series_id = show.id;
      },
    }
  }
</script>

<template>
  <div class="col mt-3 text-center">
    
    <div
      @click="store.isShowDetails = true; showDetails(program); store.selectedShow = program"
      class="card h-100 bg-poster position-relative overflow-hidden">
      <img v-if="program.poster_path" class="h-100 poster-img" :src="`https://image.tmdb.org/t/p/w342/${program.poster_path}`">
      <img v-else class="h-100 poster-img" src="../../assets/img/default-img.png" :alt="program.title">
      <h2 v-if="!program.poster_path" class="text-white position-absolute start-50 bottom-0 translate-middle-x pb-3">{{ program.title }}</h2>
    
      <!-- <div class="info-box position-absolute h-100 w-100 text-white p-3 d-flex flex-column justify-content-between">
        <h2 v-if="program.originalTitle != program.title">Titolo Originale: {{ program.originalTitle }}</h2>
        <h2>Titolo: {{ program.title }}</h2>

        <img
          v-if="program.original_language === 'en' || program.original_language === 'it'"
          class="lang-flag mx-auto py-4 rounded-pill"
          :src="getImagePath(`../../assets/img/${program.original_language}.png`)"
          :alt="program.original_language">

        <h3 v-else class="text-danger"> Lingua: {{ program.original_language }}</h3>

        <div v-if="program.overview" class="overflow-y-auto spoiler-box flex-grow-1">
          <p class="fw-medium">Trama: {{ program.overview }}</p>
        </div>

        <div>
          <span>Voto: </span>
          <span v-html="starRating(program.vote_average)" class="rating-box text-warning pt-3"></span>
        </div>
      </div> -->

    </div>

  </div>
</template>

<style lang="scss" scoped>

.card {
  background: rgb(75, 75, 75);
  cursor: pointer;
  transition: all .6s;
  &:hover {
    scale: 1.15;
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
<script>
  import {store} from '../../data/store';

  export default {
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
      }
    }
  }
</script>

<template>
  <div class="col mt-3 text-center">
    <div class="card h-100 bg-poster position-relative overflow-hidden">
      <img v-if="program.poster_path" class="h-100 poster-img" :src="`https://image.tmdb.org/t/p/w342/${program.poster_path}`">
      <img v-else class="h-100 poster-img" src="../../assets/img/default-img.png" :alt="program.title">
    
      <div class="info-box position-absolute h-100 w-100 text-white p-3 d-flex flex-column">
        <h2 v-if="program.originalTitle != program.title">Titolo Originale: {{ program.originalTitle }}</h2>
        <h2>Titolo: {{ program.title }}</h2>
        <img
          v-if="program.original_language === 'en' || program.original_language === 'it'"
          class="lang-flag mx-auto py-4"
          :src="getImagePath(`../../assets/img/${program.original_language}.png`)"
          :alt="program.original_language">
        <h3 v-else class="text-danger"> Lingua: {{ program.original_language }}</h3>
        <div class="overflow-y-auto spoiler-box flex-grow-1">
          <p class="fw-medium">Trama: {{ program.overview }}</p>
        </div>
        <div>
          <span>Voto: </span>
          <span v-html="starRating(program.vote_average)" class="rating-box text-warning pt-3"></span>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>

.card {
  background: rgb(75, 75, 75);
  transition: all .6s;
  .info-box {
    top: 100%;
    transition: all .6s;
    .lang-flag {
      width: 100px;
    }
    .spoiler-box {
      scrollbar-width: none;
    }
  }
  &:hover {
    background: rgb(0, 0, 0);
  }
  &:hover .info-box {
    top: 0;
  }
  &:hover .poster-img {
    transition: all .6s;
    filter: brightness(.4);
  }
}

</style>
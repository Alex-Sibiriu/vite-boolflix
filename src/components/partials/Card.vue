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
  <div class="col mb-2 text-center">
    <div class="card h-100 bg-poster">
      <img v-if="program.image" :src="`https://image.tmdb.org/t/p/w342/${program.image}`">
      <img v-else src="../../assets/img/default-img.png" :alt="program.title">
      <h2>Titolo Originale: {{ program.originalTitle }}</h2>
      <h2>Titolo: {{ program.title }}</h2>
      <img
        v-if="program.language === 'en' || program.language === 'it'"
        class="lang-flag mx-auto"
        :src="getImagePath(`../../assets/img/${program.language}.png`)"
        :alt="program.language">
      <h3 v-else class=" text-danger "> Lingua: {{ program.language }}</h3>
      <p v-html="starRating(program.rating)" class="rating-box"></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.lang-flag {
  width: 100px;
}

</style>
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
      getImagePath: function(imgPath) {
        return new URL(imgPath, import.meta.url).href
      }
    }
  }
</script>

<template>
  <div class="col mb-2 text-center">
    <div class="card h-100 bg-warning">
      <h2>Titolo Originale: {{ program.originalTitle }}</h2>
      <h2>Titolo: {{ program.title }}</h2>
      <img
        v-if="program.language === 'en' || program.language === 'it'"
        :src="getImagePath(`../../assets/img/${program.language}.png`)"
        :alt="program.language">
      <h3 v-else class=" text-danger ">{{ program.language }}</h3>
      <h3>Voto: {{ program.rating }}</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
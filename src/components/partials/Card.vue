<script>
  import {store} from '../../data/store';

  export default {
    props: {
      image: String,
      originalTitle: String,
      title: String,
      language: String,
      rating: Number
    },

    data() {
      return {
        store,
      }
    },
  }
</script>

<template>
  <div class="col mb-2 text-center">
    <div class="card h-100 bg-warning">
      <h2>Titolo Originale: {{ originalTitle }}</h2>
      <h2>Titolo: {{ title }}</h2>
      <h3>Lingua: {{ language }}</h3>
      <h3>Voto: {{ rating }}</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
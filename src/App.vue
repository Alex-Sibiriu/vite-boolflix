<script>
  import axios from 'axios';  
  import {store} from './data/store.js';
  import Header from './components/Header.vue';
  import Main from './components/Main.vue';

  export default {
    components: {
      Header,
      Main,
    },
    
    methods: {
      getMovie() {
        axios.get(store.apiUrlMovie, {
          params: store.apiParams
        })
        .then(response => {
          store.allMovies = response.data.results
          store.allMovies = store.allMovies.map(movie => {
            return {
              id: movie.id,
              image: movie.poster_path,
              originalTitle: movie.original_title,
              title: movie.title,
              language: movie.original_language,
              rating: movie.vote_average
            }
          })
          console.log(store.allMovies);
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta dei Film:', error);
        });
      },

      getSeries() {
        axios.get(store.apiUrlSeries, {
          params: store.apiParams
        })
        .then(response => {
          store.allSeries = response.data.results
          store.allSeries = store.allSeries.map(serie => {
            return {
              id: serie.id,
              image: serie.poster_path,
              originalTitle: serie.original_name,
              title: serie.name,
              language: serie.original_language,
              rating: serie.vote_average
            }
          })
          console.log(store.allSeries);
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta dei Film:', error);
        });
      }
    },
    mounted() {
      this.getMovie()
    }
  }
</script>

<template>
  <Header 
    @performSearch="getMovie(), getSeries()"/>>
  <Main />
</template>

<style lang="scss" scoped>
  @import './assets/scss/main.scss';

</style>
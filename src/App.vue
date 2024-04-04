<script>
  import axios from 'axios';  
  import {store} from './data/store.js';
  import Header from './components/Header.vue';
  import Main from './components/Main.vue';
  import DetailsScreen from './components/partials/DetailsScreen.vue';

  export default {
    components: {
      Header,
      Main,
      DetailsScreen,
    },

    data() {
      return {
        store
      }
    },
    
    methods: {
      getPopMovie() {
        axios.get(store.apiPopMovie, {
          params: store.apiParams
        })
        .then(response => {
          store.allPopMovies = response.data.results;
          store.allPopMovies = store.allPopMovies.map(movie => {
            return {
              ...movie,
              originalTitle: movie.original_title,
              type: 'movie'
            }
          })
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta dei Film:', error);
        });
      },

      getPopSeries() {
        axios.get(store.apiPopSeries, {
          params: store.apiParams
        })
        .then(response => {
          store.allPopSeries = response.data.results;
          store.allPopSeries = store.allPopSeries.map(serie => {
            return {
              ...serie,
              originalTitle: serie.original_name,
              title: serie.name,
              type: 'tv'
            }
          })
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta dei Film:', error);
        });
      },

      getPopShow() {
        this.getPopMovie();
        this.getPopSeries();
      },

      getMovie() {
        store.isSearching = true;
        axios.get(store.apiUrlMovie, {
          params: store.apiParams
        })
        .then(response => {
          store.allMovies = response.data.results;
          store.allMovies = store.allMovies.map(movie => {
            return {
              ...movie,
              originalTitle: movie.original_title,
              type: 'movie'
            }
          })
          store.apiParams.query = '';
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta dei Film:', error);
        });
      },

      getSeries() {
        store.isSearching = true;
        axios.get(store.apiUrlSeries, {
          params: store.apiParams
        })
        .then(response => {
          store.allSeries = response.data.results
          store.allSeries = store.allSeries.map(serie => {
            return {
              ...serie,
              originalTitle: serie.original_name,
              title: serie.name,
              type: 'tv'
            }
          })
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta dei Film:', error);
        });
      },

      getMovieCast() {
        store.allCast = [];

        axios.get(store.apiMovieCast.replace('{movie_id}', store.movieCastParams.movie_id), {
          params: store.movieCastParams
        })
        .then(response => {
          for (let i = 0; i < 5; i++) {
            if (response.data.cast[i]) {
              store.allCast.push(response.data.cast[i])
            }
          }
          console.log(store.selectedShow.genre_ids);
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta del Cast:', error);
        });
      },

      getTVCast() {
        store.allCast = [];

        axios.get(store.apiSeriesCast.replace('{series_id}', store.seriesCastParams.series_id), {
          params: store.seriesCastParams
        })
        .then(response => {
          for (let i = 0; i < 5; i++) {
            if (response.data.cast[i]) {
              store.allCast.push(response.data.cast[i])
            }
          }
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta del Cast:', error);
        });
      },
    },

    mounted() {
      this.getPopShow()

      this.$watch(
        () => store.selectedShow,
        (newValue, oldValue) => {
          if (newValue.type == 'movie') {
            this.getMovieCast();
          } else {
            this.getTVCast()
          }
        }
      );
    }
  }
</script>

<template>

    <Header 
      @performSearch="getMovie(), getSeries()"
    />

    <DetailsScreen 
      :show="store.selectedShow"
    />

    <Main 
      @searchMovieCast="getMovieCast()"
      @searchTvCast="getTVCast()"
    />

</template>

<style lang="scss" scoped>
  @import './assets/scss/main.scss';

</style>
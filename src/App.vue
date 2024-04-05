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
      getPopular(type) {
        axios.get(store.apiPopular + type + '/popular', {
          params: store.apiParams
        })
        .then(response => {
          store[type].popularList = response.data.results;
          store[type].popularList = store[type].popularList.map(show => {
            return {
              ...show,
              title: show.name ? show.name : show.title,
              originalTitle: show.original_title ? show.original_title : show.original_name,
              type: type
            }
          })
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta del Programma:', error);
        });
      },

      getShow(type) {
        store[type].showList = [];
        axios.get(store.apiUrlShow + type, {
          params: store.apiParams
        })
        .then(response => {
          store[type].showList = response.data.results;
          store[type].showList = store[type].showList.map(show => {
            return {
              ...show,
              title: show.name ? show.name : show.title,
              originalTitle: show.original_title ? show.original_title : show.original_name,
              type: type
            }
          })
          store.apiParams.query = '';
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta dello Show:', error);
        });
      },
      
      getCast(type) {
        store.allCast = [];
        
        const castParams = this.store[type].castParams;
        const secondValue = castParams[Object.keys(castParams)[1]];
        const newApi = `https://api.themoviedb.org/3/movie/${secondValue}/credits`
        
        axios.get(newApi, {
          params: store[type].castParams
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
      
      getGenres(type) {
        axios.get(store.apiGenres + type + '/list', {
          params: store.apiParams
        })
        .then(response => {
          store[type].allGenres = response.data.genres
        })
      },
      
      resetArrays() {
        store.movie.popularList = [];
        store.tv.popularList = [];
        store.allMovies = [];
        store.allSeries = [];
      },

      getPopShow() {
        this.resetArrays();
        this.getPopular('tv')
        this.getPopular('movie')
      },
      
      getMovieSeries() {
        this.resetArrays();
        this.getShow('movie');
        this.getShow('tv')
      },
    },

    mounted() {
      this.getPopShow();
      this.getGenres('movie');
      this.getGenres('tv');

      this.$watch(
        () => store.selectedShow,
        (newValue, oldValue) => {
          if (newValue.type == 'movie') {
            this.getCast('movie')
          } else {
            this.getCast('tv')
          }
        }
      );
    }
  }
</script>

<template>

    <Header 
      @performSearch="getMovieSeries()"
      @goHome="getPopShow()"
      @goMoviePop="resetArrays(), getPopular('movie')"
      @goTvPop="resetArrays(), getPopular('tv')"
    />

    <DetailsScreen 
      :show="store.selectedShow"
    />

    <Main 
      @searchMovieCast="getCast('movie')"
      @searchTvCast="getCast('tv')"
    />

</template>

<style lang="scss" scoped>
  @import './assets/scss/main.scss';

</style>
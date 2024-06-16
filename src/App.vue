<script>
  import axios from 'axios';  
  import {store} from './data/store.js';
  import Header from './components/Header.vue';
  import Main from './components/Main.vue';
  import DetailsScreen from './components/partials/DetailsScreen.vue';
  import Swiper from './components/partials/Swiper.vue'

  export default {
    components: {
      Header,
      Main,
      DetailsScreen,
      Swiper,
    },

    data() {
      return {
        store,
      }
    },
    
    methods: {
      getPopular(type) {
        axios.get(store.apiUrl + type + '/popular', {
          params: store.apiParams
        })
        .then(response => {
          store[type].popularList = response.data.results;
          store[type].popularList = store[type].popularList.map(show => {
            return {
              ...show,
              title: show.name ? show.name : show.title,
              originalTitle: show.original_title ? show.original_title : show.original_name,
              type: type,
              releaseDate: show.first_air_date ? show.first_air_date : show.release_date,
              cast: [],
              similar: [],
              videos: [],
              images: []
            }
          })
          setTimeout(() => {
            store.jumboShow = store.movie.popularList[0]
          }, 10);
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta del Programma:', error);
        });
      },

      getShow(type) {
        axios.get(store.apiUrl + 'search/' + type, {
          params: store.apiParams
        })
        .then(response => {
          store[type].showList = response.data.results;
          store[type].showList = store[type].showList.map(show => {
            return {
              ...show,
              title: show.name ? show.name : show.title,
              originalTitle: show.original_title ? show.original_title : show.original_name,
              type: type,
              releaseDate: show.first_air_date ? show.first_air_date : show.release_date,
              cast: [],
              similar: [],
              videos: []
            }
          })
          setTimeout(() => {
            store.apiParams.query = '';
          }, 10);
        })
        .catch(error => {
          console.log('Si è verificato un errore durante la richiesta dello Show:', error);
        });
      },

      getImages(show) {
        if (show.type === 'movie') {
          axios.get(store.apiUrl + show.type + '/' + show.id + '/images', {
            params: {
              api_key: store.api_key,
              movie_id: show.id
            }
          })
          .then(response => {
            const image = response.data.backdrops.find(image => image.height === 2160);
            if (show.images.length < 1 && image) {
              show.images.push(image)
            }
          })
        } else {
          axios.get(store.apiUrl + show.type + '/' + show.id + '/images', {
            params: {
              api_key: store.api_key,
              series_id: show.id
            }
          })
          .then(response => {
            const image = response.data.backdrops.find(image => image.height === 2160);
            if (show.images.length < 1 && image) {
              show.images.push(image)
            }
          })
        }
      },

      getVideos(show) {
        if (show.type === 'movie') {
          axios.get(store.apiUrl + show.type + '/' + show.id + '/videos', {
            params: {
              api_key: store.api_key,
              movie_id: show.id,
              language: store.apiParams.language
            }
          })
          .then(response => {
            if (response.data.results.length === 0) {
              axios.get(store.apiUrl + show.type + '/' + show.id + '/videos', {
                params: {
                  api_key: store.api_key,
                  movie_id: show.id
                }
              })
              .then(result => {
                const video = result.data.results.find(video => video.type === 'Trailer' );
                if (show.videos.length < 1 && video) {
                  show.videos.push(video)
                }
              })
            } else {
              const video = response.data.results.find(video => video.type === 'Trailer' );
              if (show.videos.length < 1 && video) {
                show.videos.push(video)
              }
            }
          })
        } else {
          axios.get(store.apiUrl + show.type + '/' + show.id + '/videos', {
            params: {
              api_key: store.api_key,
              series_id: show.id,
              language: store.apiParams.language
            }
          })
          .then(response => {
            if (response.data.results.length === 0) {
              axios.get(store.apiUrl + show.type + '/' + show.id + '/videos', {
                params: {
                  api_key: store.api_key,
                  movie_id: show.id
                }
              })
              .then(result => {
                const video = result.data.results.find(video => video.type === 'Trailer' );
                if (show.videos.length < 1 && video) {
                  show.videos.push(video)
                }
              })
            } else {
              const video = response.data.results.find(video => video.type === 'Trailer' );
              if (show.videos.length < 1 && video) {
                show.videos.push(video)
              }
            }
          })
        }
      },

      generalCast(show) {
        show.cast = [];
        if (show.type === 'movie') {
          axios.get(store.apiUrl + show.type + '/' + show.id + '/credits', {
            params: {
              api_key: store.api_key,
              movie_id: show.id,
              language: store.apiParams.language
            }
          })
          .then(response => {
            for (let i = 0; i < 5; i++) {
              if (response.data.cast[i] && !show.cast.includes(response.data.cast[i])) {
                show.cast.push(response.data.cast[i])
              }
            }
          })
        } else {
          axios.get(store.apiUrl + show.type + '/' + show.id + '/credits', {
            params: {
              api_key: store.api_key,
              series_id: show.id
            }
          })
          .then(response => {
            for (let i = 0; i < 5; i++) {
              if (response.data.cast[i] && !show.cast.includes(response.data.cast[i])) {
                show.cast.push(response.data.cast[i])
              }
            }
          })
        }
      },
      
      getGenres(type) {
        axios.get(store.apiUrl + 'genre/' + type + '/list', {
          params: store.apiParams
        })
        .then(response => {
          store[type].allGenres = response.data.genres
        })
      },

      searchGenres(type) {
        axios.get(store.apiUrl + 'discover/' + type, {
          params: store.apiParams
        })
        .then(response => {
          store[type].showList = response.data.results;
          store[type].showList = store[type].showList.map(show => {
            return {
              ...show,
              title: show.name ? show.name : show.title,
              originalTitle: show.original_title ? show.original_title : show.original_name,
              type: type,
              releaseDate: show.first_air_date ? show.first_air_date : show.release_date,
              cast: [],
              similar: [],
              videos: []
            }
          })
        })
      },

      getAnime() {
        axios.get(store.apiAnimation)
        .then(response => {
          store.tv.animeList = response.data.results;
          store.tv.animeList = store.tv.animeList.map(show => {
            return {
              ...show,
              title: show.name,
              originalTitle: show.original_name,
              type: 'tv',
              releaseDate: show.first_air_date,
              cast: [],
              similar: [],
              videos: []
            }
          })
        })
      },

      getAction() {
        axios.get(store.apiAction)
        .then(response => {
          store.tv.actionList = response.data.results;
          store.tv.actionList = store.tv.actionList.map(show => {
            return {
              ...show,
              title: show.name,
              originalTitle: show.original_name,
              type: 'tv',
              releaseDate: show.first_air_date,
              cast: [],
              similar: [],
              videos: []
            }
          })
        })
      },

      getLangs() {
        store.langLoading = true;
        axios.get('https://api.themoviedb.org/3/configuration/languages?api_key=0585ec1cc8079d0abe869737c38b08bc')
        .then(response => {
          store.allLang = response.data;
        })
        .catch(error => {
          console.error("Errore nel caricamento delle lingue:", error);
        })
      },

      getSimilar(show) {
        show.cast = [];
        if (show.type === 'movie') {
          axios.get(store.apiUrl + show.type + '/' + show.id + '/similar', {
            params: {
              api_key: store.api_key,
              movie_id: show.id,
              language: store.apiParams.language
            }
          })
          .then(response => {
            if (show.similar.length < 1) {
              for (let i = 0; i < 5; i++) {
                if (response.data.results[i] && !show.similar.includes(response.data.results[i]) && response.data.results[i].backdrop_path) {
                  show.similar.push(response.data.results[i])
                }
                show.similar = show.similar.map(item => {
                  return {
                    ...item,
                    title: item.name ? item.name : item.title,
                    originalTitle: item.original_title ? item.original_title : item.original_name,
                    type: show.type,
                    releaseDate: item.first_air_date ? item.first_air_date : item.release_date,
                    cast: [],
                    similar: [],
                    videos: []
                  }
                })
              }
            }
          })
        } else {
          axios.get(store.apiUrl + show.type + '/' + show.id + '/similar', {
            params: {
              api_key: store.api_key,
              series_id: show.id
            }
          })
          .then(response => {
            if (show.similar.length < 1) {
              for (let i = 0; i < 5; i++) {
                if (response.data.results[i] && !show.similar.includes(response.data.results[i]) && response.data.results[i].backdrop_path) {
                  show.similar.push(response.data.results[i])
                }
                show.similar = show.similar.map(item => {
                  return {
                    ...item,
                    title: item.name ? item.name : item.title,
                    originalTitle: item.original_title ? item.original_title : item.original_name,
                    type: show.type,
                    releaseDate: item.first_air_date ? item.first_air_date : item.release_date,
                    cast: [],
                    similar: [],
                    videos: []
                  }
                })
              }
            }
          })
        }
      },

      createHome() {
        this.getPopShow();
        this.getAnime();
        this.getAction();
      },

      getPopShow() {
        this.getPopular('tv')
        this.getPopular('movie')
      },
      
      getMovieSeries() {
        this.getShow('movie');
        this.getShow('tv');
      },
    },

    mounted() {
      this.getLangs();
      this.createHome();
      this.getGenres('movie');
      this.getGenres('tv');

      this.$watch(
        () => store.selectedShow,
        (newValue, oldValue) => {
          this.generalCast(newValue);
          this.getSimilar(newValue);
          this.getVideos(newValue);
        }
      );

      this.$watch(
        () => store.jumboShow,
        (newValue, oldValue) => {
          this.generalCast(newValue);
          this.getVideos(newValue);
          this.getImages(newValue)
        }
      );

      this.$watch(
        () => store.selectedLang,
        (newValue, oldValue) => {
          store.apiParams.language = store.selectedLang.iso_639_1;
          this.createHome();
          this.getGenres('movie');
          this.getGenres('tv');
          store.isHome = true
        }
      );
    }
  }
</script>

<template>

    <Header 
      @performSearch="getMovieSeries(), 
                      store.isHome = false, 
                      store.isPopMovie = false, 
                      store.isPopTv = false, 
                      store.selectedGenre = '',
                      store.isWatchList = false"

      @goHome="createHome(), store.isHome = true, store.isWatchList = false"
      @goMoviePop="getPopular('movie'), store.isHome = false, store.isWatchList = false"
      @goTvPop="getPopular('tv'), store.isHome = false, store.isWatchList = false"

      @searchGenresTv="searchGenres('tv'), 
                      store.isHome = false, 
                      store.isPopMovie = false, 
                      store.isPopTv = false, 
                      store.movie.showList = [],
                      store.isWatchList = false"

      @searchGenresMovie="searchGenres('movie'), 
                          store.isHome = false, 
                          store.isPopMovie = false, 
                          store.isPopTv = false, 
                          store.tv.showList = [],
                          store.isWatchList = false"
      
      @viewWatchList="store.isWatchList = true,
                      store.isHome = false, 
                      store.isPopMovie = false, 
                      store.isPopTv = false, 
                      store.selectedGenre = '',
                      store.tv.showList = [],
                      store.movie.showList = []"
    />

    <DetailsScreen 
      :show="store.selectedShow"
    />

    <Main />

</template>

<style lang="scss" scoped>
  @import './assets/scss/main.scss';

</style>
import { reactive } from 'vue';

export const store = reactive({
  apiPopMovie: 'https://api.themoviedb.org/3/movie/popular',
  apiPopSeries: 'https://api.themoviedb.org/3/tv/popular',

  apiUrlMovie: 'https://api.themoviedb.org/3/search/movie',
  apiUrlSeries: 'https://api.themoviedb.org/3/search/tv',
  apiParams: {
    api_key: '0585ec1cc8079d0abe869737c38b08bc',
    language: 'it-IT',
    query: '',
  },

  apiMovieCast: 'https://api.themoviedb.org/3/movie/{movie_id}/credits',
  movieCastParams: {
    api_key: '0585ec1cc8079d0abe869737c38b08bc',
    movie_id: 0
  },

  apiSeriesCast: 'https://api.themoviedb.org/3/tv/{series_id}/credits',
  seriesCastParams: {
    api_key: '0585ec1cc8079d0abe869737c38b08bc',
    series_id: 0
  },

  allCast: [],

  allPopMovies: [],
  allPopSeries: [],
  allMovies: [],
  allSeries: [],

  // allFlags: [],
  isSearching: false,
  isShowDetails: false,

  selectedShow: {},
  rating100: 0,
});
import { reactive } from 'vue';

export const store = reactive({
  apiUrlMovie: 'https://api.themoviedb.org/3/search/movie',
  apiUrlSeries: 'https://api.themoviedb.org/3/search/tv',
  apiParams: {
    api_key: '0585ec1cc8079d0abe869737c38b08bc',
    language: 'it-IT',
    query: '',
  },

  allMovies: [],
  allSeries: []
});
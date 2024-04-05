import { reactive } from 'vue';

export const store = reactive({
  apiParams: {
    api_key: '0585ec1cc8079d0abe869737c38b08bc',
    language: 'it-IT',
    query: '',
  },

  apiUrlShow: 'https://api.themoviedb.org/3/search/',
  apiGenres: 'https://api.themoviedb.org/3/genre/',
  apiPopular: 'https://api.themoviedb.org/3/',

  movie: {
    allGenres: [],
    showList: [],

    popularList: [],

    apiCast: `https://api.themoviedb.org/3/movie/{movie_id}/credits`,
    castParams: {
      api_key: '0585ec1cc8079d0abe869737c38b08bc',
      movie_id: 0
    },
  },

  tv: {
    allGenres: [],
    showList: [],

    popularList: [],

    apiCast: 'https://api.themoviedb.org/3/tv/{series_id}/credits',
    castParams: {
      api_key: '0585ec1cc8079d0abe869737c38b08bc',
      series_id: 0
    },
  },

  allCast: [],
  // allFlags: [],
  isShowDetails: false,
  selectedShow: {},
});
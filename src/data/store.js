import { reactive } from 'vue';

export const store = reactive({
  apiParams: {
    api_key: '0585ec1cc8079d0abe869737c38b08bc',
    language: 'it',
    query: '',
    with_genres: 0,
  },

  selectedLang:   {
    "iso_639_1": "it",
    "english_name": "Italian",
    "name": "Italiano"
  },

  apiUrl: 'https://api.themoviedb.org/3/',

  api_key: '0585ec1cc8079d0abe869737c38b08bc',

  apiAnimation: 'https://api.themoviedb.org/3/discover/tv?api_key=0585ec1cc8079d0abe869737c38b08bc&language=it-IT&query=&with_genres=16',
  apiAction: 'https://api.themoviedb.org/3/discover/tv?api_key=0585ec1cc8079d0abe869737c38b08bc&language=it-IT&query=&with_genres=10759',

  movie: {
    allGenres: [],
    showList: [],
    popularList: [],

    castParams: {
      api_key: '0585ec1cc8079d0abe869737c38b08bc',
      movie_id: 0
    },
  },

  tv: {
    allGenres: [],
    showList: [],
    popularList: [],
    animeList: [],
    actionList: [],

    castParams: {
      api_key: '0585ec1cc8079d0abe869737c38b08bc',
      series_id: 0
    },
  },

  jumboShow: {},
  
  isShowDetails: false,

  selectedShow: {},
  selectedGenre: '',

  isHome: true,
  isPopMovie: false,
  isPopTv: false,
  isWatchList: false,

  allLang: [],

  myWatchList: {
    movie: [],
    tv: []
  }
});
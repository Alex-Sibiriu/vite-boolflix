<script>
  import {store} from '../data/store.js';

  export default {
    data() {
      return {
        store,
      }
    },
    methods: {
      getImagePath(imgPath) {
        return new URL(imgPath, import.meta.url).href
      },
    },
  }
</script>

<template>

  <header class="bg-black fw-bold overflow-y-visible pt-4 pb-2">
    <div class="container d-flex justify-content-between h-100">
      <nav class="h-100">
        <ul class="text-white list-unstyled d-flex h-100">

          <li class="h-100 d-flex align-items-center px-3 pe-none">
            <img class="my-logo" src="../assets/img/boolflix-logo.png" alt="Boolflix">
          </li>

          <li @click="store.isHome = true" class="fs-5 h-100 d-flex align-items-center px-3">Home</li>

          <li class="nav-item dropdown h-100 position-relative">
            <span class="fs-5 h-100 w-100 px-3 d-flex align-items-center d-block" data-bs-toggle="dropdown" aria-expanded="false">
              Movie
            </span>
            <ul class="my-dropdown rounded-0 dropdown-menu dropdown-menu-dark">
              <li class="w-100"><a @click.prevent="store.isPopMovie = true, store.isPopTv = false, store.isHome = false" class="dropdown-item w-100 fw-bold" href="#">Most Popular</a></li>
              <li class="w-100"><a class="dropdown-item w-100 fw-bold" href="#">Top Rated</a></li>
              <li class="my-genre-wrapper w-100 position-relative">
                <a class="dropdown-item w-100 fw-bold" href="#">Genres</a>
                <ul class="my-genres-list p-2 list-unstyled position-absolute start-100 top-0">
                  <li 
                    v-for="genre in store.movie.allGenres"
                    :key="genre.id"
                    @click="store.apiParams.with_genres = genre.id; store.selectedGenre = genre.name; $emit('searchGenresMovie'), console.log('ho cliccato il genere')"
                    class="py-2 px-3">{{ genre.name }}</li>
                </ul>
              </li>
              <li class="w-100"><a class="dropdown-item w-100 fw-bold" href="#">Latest Releases</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown h-100 position-relative">
            <span class="fs-5 h-100 w-100 px-3 d-flex align-items-center d-block" data-bs-toggle="dropdown" aria-expanded="false">
              TV Series
            </span>
            <ul class="my-dropdown rounded-0 dropdown-menu dropdown-menu-dark">
              <li @click="store.isPopMovie = false, store.isPopTv = true, store.isHome = false" class="w-100"><a class="dropdown-item w-100 fw-bold" href="#">Most Popular</a></li>
              <li class="w-100"><a class="dropdown-item w-100 fw-bold" href="#">Top Rated</a></li>
              <li class="my-genre-wrapper w-100 position-relative">
                <a class="dropdown-item w-100 fw-bold" href="#">Genres</a>
                <ul class="my-genres-list p-2 list-unstyled position-absolute start-100 top-0">
                  <li 
                    v-for="genre in store.tv.allGenres"
                    :key="genre.id"
                    @click="store.apiParams.with_genres = genre.id; store.selectedGenre = genre.name, $emit('searchGenresTv')"
                    class="py-2 px-3">{{ genre.name }}</li>
                </ul>
              </li>
              <li class="w-100"><a class="dropdown-item w-100 fw-bold" href="#">Latest Releases</a></li>
            </ul>
          </li>

          <li @click="$emit('viewWatchList')" class="fs-5 h-100 d-flex align-items-center px-3">Watch List</li>
        </ul>
      </nav>

      <div class="d-flex align-items-center">

        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <button class="btn btn-dark dropdown-toggle btn-lang me-2" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="d-inline-block text-start active-lang">
                <img class="lang-img pb-1" :src="`https://www.unknown.nu/flags/images/${store.selectedLang.iso_639_1}-100`">
                {{ store.selectedLang.english_name }}
              </span>
            </button> 
            <ul class="lang-menu dropdown-menu dropdown-menu-dark overflow-y-auto overflow-x-hidden">
              <li
                v-for="lang in store.allLang"
                :key="lang.iso_639_1"
                @click="store.selectedLang = lang">
                <a
                  v-if="lang.english_name != 'No Language'"
                  class="dropdown-item w-100"
                  href="#">
                  <img
                    :src="`https://www.unknown.nu/flags/images/${lang.iso_639_1}-100`"
                    onerror="this.src=`https://upload.wikimedia.org/wikipedia/commons/7/7e/White_flag_with_question_mark.png`"
                    :alt="lang.iso_639_1"
                    class="lang-img"> {{ lang.english_name }}</a>
              </li>
            </ul>
          </li>
        </ul>

        <span class="searchBox d-inline-block ms-2">
            <input
              @keyup.enter="$emit('performSearch')"
              v-model.trim="store.apiParams.query"
              class="searchInput rounded-pill"
              type="text"
              placeholder="Search">
            <button class="searchButton" href="#">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </span>
        
      </div>
    </div>
  </header>

</template>

<style lang="scss" scoped>
  

  .btn-lang {
    width: 210px;
    .active-lang {
      width: 95%;
    }
  }
  .lang-menu {
    width: 97%;
    max-height: 400px;
    scrollbar-width: none;
  }
  .lang-img {
    width: 20px;
  }

  header {
    height: 100px;
    z-index: 99999;
    border-bottom: 1px solid red;
    nav > ul > li > ul{
      display: none;
    }
    nav > ul > li:hover {
      background: #1B1B1B;
      > ul {
        display: block;
      }
    }
    li {
      cursor: pointer;
      transition: all .4s;
      &.my-genre-wrapper:hover {
        .my-genres-list {
          display: block;
        }
      }
    }
    .my-dropdown {
      background: rgb(27, 27, 27);
      box-shadow: 4px 6px 10px rgba(0, 0, 0, 0.7);
      top: 100%;
      z-index: 9999;
      transition: all .3s;
      li {
        width: 130px;
        padding: 5px 10px;
      }
      .my-genres-list {
        display: none;
        column-count: 2;
        background: #292929;
        width: max-content;
        box-shadow: 4px 6px 10px rgba(0, 0, 0, 0.7);
        li {
          width: 100%;
          &:hover {
            background: #3D3D3D;
          }
        }
      }
    }
  }

  .my-logo {
    height: 2.7rem;
  }

  .searchBox {
    background: #2f3640;
    border-radius: 40px;
    height: 60px;
    padding: 10px;
    &:hover .searchInput {
      width: 240px;
      height: 40px;
      padding: 10px 6px;
      background: #DC1A28;
    }
    &:hover .searchButton {
      background: white;
      color : #2f3640;
      height: 40px;
      width: 40px;
    }
    .searchButton {
      color: white;
      float: right;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #2f3640;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.4s;
    }
    .searchInput {
      border:none;
      background: none;
      outline:none;
      float:left;
      padding: 0;
      color: white;
      font-size: 16px;
      transition: 0.4s;
      line-height: 40px;
      width: 0px;
      height: 40px;
    }
  }

</style>
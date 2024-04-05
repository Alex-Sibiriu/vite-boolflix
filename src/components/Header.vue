<script>
  import {store} from '../data/store.js';

  export default {
    data() {
      return {
        store,
      }
    },
    methods: {
      
    },
  }
</script>

<template>

  <header class="bg-black">
    <div class="container d-flex justify-content-between h-100">
      <nav class="h-100">
        <ul class="text-white list-unstyled d-flex h-100">

          <li class="h-100 d-flex align-items-center px-3">
            <h1 class="my-logo text-danger fw-bold cursp">Boolflix</h1>
          </li>

          <li @click="$emit('goHome')" class="h-100 d-flex align-items-center px-3">Home</li>

          <li class="nav-item dropdown h-100 position-relative">
            <span class="h-100 w-100 px-3 d-flex align-items-center d-block" data-bs-toggle="dropdown" aria-expanded="false">
              Movie
            </span>
            <ul class="my-dropdown dropdown-menu dropdown-menu-dark">
              <li class="w-100"><a @click.prevent="$emit('goMoviePop')" class="dropdown-item w-100" href="#">Most Popular</a></li>
              <li class="w-100"><a class="dropdown-item w-100" href="#">Top Rated</a></li>
              <li class="w-100 position-relative">
                <a class="dropdown-item w-100" href="#">Genres</a>
                <ul class="my-genres-list p-2 list-unstyled position-absolute start-100 top-0">
                  <li 
                    v-for="genre in store.movie.allGenres"
                    :key="genre.id"
                    @click="store.apiParams.with_genres = genre.id; store.selectedGenre = genre.name; $emit('searchGenresMovie')"
                    class="py-2 px-3">{{ genre.name }}</li>
                </ul>
              </li>
              <li class="w-100"><a class="dropdown-item w-100" href="#">Latest Releases</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown h-100 position-relative">
            <span class="h-100 w-100 px-3 d-flex align-items-center d-block" data-bs-toggle="dropdown" aria-expanded="false">
              TV Series
            </span>
            <ul class="my-dropdown dropdown-menu dropdown-menu-dark">
              <li @click="$emit('goTvPop')" class="w-100"><a class="dropdown-item w-100" href="#">Most Popular</a></li>
              <li class="w-100"><a class="dropdown-item w-100" href="#">Top Rated</a></li>
              <li class="w-100 position-relative">
                <a class="dropdown-item w-100" href="#">Genres</a>
                <ul class="my-genres-list p-2 list-unstyled position-absolute start-100 top-0">
                  <li 
                    v-for="genre in store.tv.allGenres"
                    :key="genre.id"
                    @click="store.apiParams.with_genres = genre.id; store.selectedGenre = genre.name; $emit('searchGenresTv')"
                    class="py-2 px-3">{{ genre.name }}</li>
                </ul>
              </li>
              <li class="w-100"><a class="dropdown-item w-100" href="#">Latest Releases</a></li>
            </ul>
          </li>

        </ul>
      </nav>
      <div class="d-flex align-items-center">
        <input @keyup.enter="$emit('performSearch')" v-model.trim="store.apiParams.query" class="py-1 px-2 me-2 rounded-3" type="text" placeholder="Search...">
        <div @click="$emit('performSearch')" class="btn btn-warning fw-bold">Search</div>
      </div>
    </div>
  </header>

</template>

<style lang="scss" scoped>
  
  header {
    height: 70px;
    z-index: 9999;
    li {
      cursor: pointer;
      transition: all .4s;
    }
    .my-genres-list {
      column-count: 2;
      background: #292929;
      width: max-content;
      li {
        width: 100%;
        &:hover {
          background: #3D3D3D;
        }
      }
    }
  }

  .my-dropdown {
    background: rgb(27, 27, 27);
    top: 100%;
    z-index: 9999;
    transition: all .3s;
    li {
      width: 130px;
      padding: 5px 10px;
    }
  }

</style>
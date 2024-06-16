<script>
  import {store} from '../../data/store';
  import Card from '../partials/Card.vue'

  import { Swiper, SwiperSlide } from 'swiper/vue';

  import 'swiper/css';

  import 'swiper/css/navigation';

  import {Autoplay, Navigation } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
      Card
    },

    props: {
      showList: Array,
    },

    data() {
      return {
        store,
        modules: [Autoplay, Navigation],
        activeShow: {}
      }
    },

    methods: {
      getImagePath(imgPath) {
        return new URL(imgPath, import.meta.url).href
      },

      setActiveShow(show) {
        this.activeShow = show
      },

      toggleWatchList(show, showID) {
        if (!store.myWatchList[show.type].includes(show)) {
          store.myWatchList[show.type].unshift(show)
        } else {
          const index = store.myWatchList[show.type].findIndex(item => item.id === showID);
            store.myWatchList[show.type].splice(index, 1);
        }
      }
    },

    computed: {
      allGenres() {
        const genresArray = this.activeShow.type === 'movie' ? store.movie.allGenres : store.tv.allGenres
        const allGenres = [];
        let j = 0;

        for (let i = 0; i < genresArray.length; i++) {
          if (this.activeShow.genre_ids && genresArray[i].id === this.activeShow.genre_ids[j] && genresArray[i].name) {
            allGenres.push(genresArray[i].name)
            j++
          }
        }
        return allGenres.join(', ')
      }
    }
  }

</script>

<template>
  <div class="py-2 w-100">

    <swiper
      :navigation="true"
      :slidesPerGroup="5"
      :slidesPerGroupSkip="1"
      :grabCursor="true"
      :loop="true"
     
      :initialSlide="6"
      :slidesPerView="6"
      :centeredSlides="true"
      :spaceBetween="10"
      
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide
        v-for="show in showList" :key="show.id"
        @mouseenter="setActiveShow(show)"
        class="position-relative h-100 bg-danger"
        >

        <img :src="`https://image.tmdb.org/t/p/w342/${show.backdrop_path}`">

        <img class="thumb-logo position-absolute" src="../../assets/img/boolflix-logo.png">

        <div class="info-box position-absolute bg-dark text-white px-2 rounded-bottom-4 d-flex flex-column justify-content-between">

            <h5 class="pt-3 fw-bold"> {{ show.title }}</h5>

            <div>
              <p class="m-0 fs-6" v-if="allGenres"><strong>Genres: </strong>{{ allGenres }}</p>

              <span class="star-box" :style="{ background: 'linear-gradient(to right, goldenrod '+ show.vote_average * 10 + '%, transparent '+ show.vote_average * 10 +'%)' }">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
              </span>
            </div>

            <div class="buttons pt-2 ">
              <span class="btn btn-secondary me-1 mb-2">
                <span>Start Watching</span>
                <i class="fa-regular fa-circle-play ms-2"></i>
              </span>

              <span class="btn btn-secondary ms-1 mb-2">
                <span @click="toggleWatchList(show, show.id)">

                  <span v-if="!store.myWatchList[show.type].includes(show)">
                    Add to Watchlist <i class="fa-regular fa-square-plus ms-2"></i>
                  </span>

                  <span v-else>Remove from Watchlist <i class="fa-regular fa-square-minus ms-2"></i></span>

                </span>
              </span>

            </div>
            
        </div>
      </swiper-slide>

    </swiper>




  </div>
</template>

<style lang="scss" scoped>

.swiper {
  width: 100%;
  height: 100%;
  overflow: visible !important;
  &:hover {
    z-index: 999999999;
  }
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all .3s;
  &:hover{
    box-shadow: 4px 6px 10px rgba(0, 0, 0, 0.7);
    scale: 1.1;
    filter: brightness(1.1);
    z-index: 99999;
    & > .info-box {
      z-index: 9999999;
      overflow: visible;
      animation: dropInfo .3s ease-in both;
      * {
        animation: showTxt .3s ease-in both;
      }
    }
  } 
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    overflow: auto;
  }
  .thumb-logo {
    height: 1rem;
    width: min-content;
    top: 5px;
    left: 7px;
  }
}

.info-box {
  height: 0px;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, 0.7);
  top: 100%;
  transition: all .3s;
  overflow: hidden;
  width: 100%;
  .star-box {
    color: goldenrod;
    mask-image: url('../../assets/img/star-solid.svg');
    mask-size: 1.27rem;
    mask-position: center;
    mask-repeat: repeat-x;
    mask-origin: content-box;
    flex-grow: 0;
  }
  .buttons span {
    font-size: .7rem;
  }
}

  @keyframes dropInfo {
    0% {
      height: 0px;
    }
    75% {
      height: 150px;
    }
    100% {
      height: max-content;
    }
  }

  @keyframes showTxt {
    0% {
      opacity: 0;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
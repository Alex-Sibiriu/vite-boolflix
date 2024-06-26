<script>
  import {store} from '../../data/store';

  export default {
    props: {
      show: Object
    },

    data() {
      return {
        store,
        showVideo: false
      }
    },

    methods: {
      startVideo() {
        this.showVideo = !this.showVideo
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
        const genresArray = store.jumboShow.type === 'movie' ? store.movie.allGenres : store.tv.allGenres
        const allGenres = [];
        let j = 0;

        for (let i = 0; i < genresArray.length; i++) {
          if (store.jumboShow.genre_ids && genresArray[i].id === store.jumboShow.genre_ids[j] && genresArray[i].name) {
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

    <div class="my-info-box position-relative text-white bg-black">

      <div class="front-bg w-100">

        <img v-if="show.images && show.images.length > 0 && !showVideo" class="w-100 h-100" :src="`https://image.tmdb.org/t/p/original/${show.images[0].file_path}`">

        <div v-else-if="show.videos && show.videos.length > 0" class="video-box text-end position-relative">
          <iframe id="jumbo-video" width="1920" height="1080" :src="`https://www.youtube.com/embed/${show.videos[0].key}?controls=0&modestbranding=1&showinfo=0&showsearch=0&rel=0&autoplay=${showVideo ? 1 : 0}&loop=1`" frameborder="0"  type="video/mp4" allow='autoplay'></iframe>
        </div>

        <div
          @mouseenter="startVideo()"
          @mouseleave="startVideo()"
          class="front-details position-absolute top-0 ps-5 w-100" :class="{'shadow-x' : showVideo}">

          <h2 class="pb-3 fs-1 fw-bold">{{ show.title }}</h2>
          
          <div>
            <span class="star-box text-warning me-2" :style="{ background: 'linear-gradient(to right, gold '+ show.vote_average * 10 +'%, transparent '+ show.vote_average * 10 +'%)'}">
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </span>
            <span v-if="show.releaseDate" class="me-2">Release: {{ show.releaseDate.split('-')[0] }}</span>
            <img class="lang-icon" :src="`https://www.unknown.nu/flags/images/${show.original_language}-100`" :alt="show.original_language">
          </div>
          <p v-if="allGenres">Genres: {{ allGenres }}</p>

          <div class="pt-3 fs-5 show-overview">
            <p class="p-0">{{ show.overview }}</p>
          </div>

          <div class="mt-4 cast-box mt-auto">
            <h5 class="pt-3">Cast:</h5>
            
            <ul class="d-flex flex-column list-unstyled">
              <li
                v-for="actor in show.cast"
                :key="actor.id"
                class="actor-section d-inline-block px-2">
                <strong>{{ actor.name }}</strong> as {{ actor.character }}
              </li>
            </ul>
          </div>

          <div>
            <span class="btn btn-secondary me-1 mb-2 fs-4 mt-4">
              <span>Play</span>
              <i class="fa-regular fa-circle-play ms-2"></i>
            </span>

            <span class="btn btn-secondary ms-1 mb-2 fs-4 mt-4">
              <span @click="toggleWatchList(show, show.id)">

                <span v-if="!store.myWatchList['movie'].includes(show)">
                  Add to Watchlist <i class="fa-regular fa-square-plus ms-2"></i>
                </span>

                <span v-else>Remove from Watchlist <i class="fa-regular fa-square-minus ms-2"></i></span>
                
              </span>
            </span>

          </div>

        </div>
      </div>
    </div>

</template>

<style lang="scss" scoped>

  #jumbo-video::-webkit-media-controls {
      display: none !important;
  }
          
  #jumbo-video::-webkit-media-controls-enclosure {
    display: none !important;
  }

  #jumbo-video::-webkit-media-controls-panel {
    display: none !important;
  }

  #jumbo-video::-webkit-media-controls-play-button {
    display: none !important;
  }

  .video-box {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 170px;
      width: 100%;
      background: linear-gradient(to bottom, black 90%, transparent);
    }
    #jumbo-video {
      object-fit: cover;
    }
  }

  .my-info-box {
    height: 1080px;
  }
    i {
      cursor: pointer;
    }
    .front-bg {
      height: 1080px;
      background-size: contain;
      background-position-x: right;
      background-repeat: no-repeat;
      box-shadow: -20px -20px 20px inset rgba(0, 0, 0),
                    10px 0px 20px inset black;
      z-index: 999;
      .front-details {
        background: linear-gradient(to right, rgb(0, 0, 0) 25%, transparent 50%);
        padding-right: 70%;
        padding-top: 6%;
        line-height: 2rem;
        height: 1080px;
      }
      .star-box {
        mask-image: url('../../assets/img/star-solid.svg');
        mask-size: 1.125rem;
        mask-position: left;
        mask-repeat: repeat-x;
        mask-origin: content-box;
      }
      .lang-icon {
        width: 25px;
      }
    }
    .back-img {
      height: 100%;
      justify-self: self-end;
      img {
        height: 100%;
      }
    }

    .show-overview {
      height: 170px;
      overflow-y: auto;
      scrollbar-width: none;
    }
  

</style>
<template>
  <div class="app-window app-page__wrapper">
    <div class="app-window__close-button"></div>
    <div class="app-page__content app-page__padding">
      <div class="app-window__logo">
        <img alt="How To Fix Democracy's Logo" src="../assets/logo.png" />
      </div>
      <div class="search-view__search-bar">
        <div class="search-view__search-bar__input">
          <input type="text" name="search-query" placeholder="Search for an episode" v-model="query" />
        </div>
        <div class="material-icons search-view__search-bar__button">
          <button @click="search()">search</button>
        </div>
      </div>
      <div class="search-view__results" v-show="searchingFor">
        <div class="search-view__results__query">
          Search results for: <span>{{ searchingFor }}</span>
        </div>
        <div class="search-view__results__empty" v-show="results.length === 0">
          <img alt="No results found." src="../assets/search-query--empty.svg" />
          <p>No results</p>
        </div>
        <ul class="search-view__results__list" v-show="results.length > 0">
          <li v-for="result in results" :key="result.videoUrl">
            <div class="search-view__results__thumbnail-wrapper">
              <div class="search-view__results__thumbnail" :style="{ backgroundImage: `url('${getThumbnail(result.videoUrl)}')` }"></div>
            </div>
            <div class="search-view__results__info">
              <h3>Episode {{ result.order }}</h3>
              <h2>{{ result.title }}</h2>
              <p>{{ result.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.search-view {
  &__search-bar {
    display: flex;
    padding: 0 0 64px 0;

    &__input {
      flex: 1;
      background-color: #111111;
      border-radius: 10px;

      input {
        width: 100%;
        background: none;
        border: none;
        padding: 16px 32px;
        font-size: 1em;
        font-weight: 300;
        letter-spacing: 2.22px;
        line-height: 20px;
        color: $colors-white;

        &::placeholder {
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    &__button {
      flex: 0;
      display: flex;

      button {
        background: none;
        border: none;
        color: $colors-white;
        cursor: pointer;
        padding: 0 0 0 32px;

        @include media-breakpoint-large {
          padding: 0 16px 0 32px;
        }
      }
    }
  }

  &__results {
    &__query {
      font-weight: 300;
      letter-spacing: 2px;
      line-height: 30px;
      text-transform: uppercase;
      padding-bottom: 64px;

      span {
        font-weight: 700;
      }
    }

    &__empty {
      border-top: 1px solid #3e3e3e;
      text-align: center;
      padding: 160px 0;

      img {
        max-width: 25%;
        margin-left: -6.8%;
      }

      p {
        margin: 40px 0 0 0;
        font-weight: 300;
        letter-spacing: 2px;
        line-height: 30px;
        text-transform: uppercase;
      }
    }

    &__list {
      list-style: none;
      padding: 0;

      li {
        border-top: 1px solid #3e3e3e;
        padding: 64px 0;
        display: flex;
        flex-direction: column;

        @include media-breakpoint-large {
          flex-direction: row;
        }
      }
    }

    &__info {
      flex: 1;
      margin: 32px 0 0 0;

      @include media-breakpoint-large {
        margin: 0 0 0 32px;
      }

      h3 {
        color: #fc8b00;
        font-size: 1.25em;
        font-weight: 700;
        letter-spacing: 1.67px;
        line-height: 20px;
        text-transform: uppercase;
        margin: 0 0 20px 0;

        @include media-breakpoint-large {
          line-height: 12px;
        }
      }

      h2 {
        font-size: 1.875em;
        font-weight: 300;
        letter-spacing: 2.78px;
        line-height: 30px;
        text-transform: uppercase;
        margin: 0 0 30px 0;

        @include media-breakpoint-large {
          line-height: 20px;
        }
      }

      p {
        font-size: 1.125em;
        font-weight: 300;
        line-height: 30px;
      }
    }

    &__thumbnail {
      width: 100%;
      height: 200px;
      background-size: cover;
      background-position: center center;
      background-color: rgba(255, 255, 255, 0.01);

      @include media-breakpoint-large {
        width: 320px;
        height: 180px;
      }

      &-wrapper {
        flex: 1;

        @include media-breakpoint-large {
          flex: 0;
        }
      }
    }
  }
}
</style>

<script>
import utils from '../utils'

export default {
  name: 'searchView',
  data () {
    return {
      query: '',
      searchingFor: 'Lorem Ipsum',
      results: []
    }
  },
  methods: {
    dataSaver () {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      return (connection && (connection.saveData || connection.connectionType === 'cellular'))
    },
    getThumbnail (videoUrl) {
      const videoId = utils.getVideoIdFromYoutubeUrl(videoUrl)
      return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : ''
    },
    search () {
      if (this.query && this.query.length > 0) {
        this.searchingFor = this.query
      }
    }
  },
  metaInfo () {
    return {
      title: 'Search | How To Fix Democracy',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: utils.getDefaultDescription()
        },
        {
          vmid: 'og:title',
          property: 'og:title',
          content: 'Search | How To Fix Democracy'
        },
        {
          vmid: 'og:description',
          property: 'og:description',
          content: utils.getDefaultDescription()
        }
      ]
    }
  }
}
</script>

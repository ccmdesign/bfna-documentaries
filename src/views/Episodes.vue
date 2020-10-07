<template>
  <div class="app-window app-page__wrapper">
    <div class="app-page__content">
      <ul class="episodes-view__list">
        <li v-for="(video, index) in videoList" :key="index" @click="setCurrentVideo(index)">
          <div class="episodes-view__episode">
            <div class="episodes-view__author-wrapper">
              <div class="episodes-view__author" :style="{ backgroundImage: `url('${getAuthorPicture(video)}')` }"></div>
            </div>
            <div class="episodes-view__description">
              <h4>Episode {{ video.order }} | Season {{ video.season }}</h4>
              <h3>{{ video.title }}</h3>
              <p>{{ video.description }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.episodes-view {
  &__list {
    list-style: none;
    padding: 24px 24px 64px 24px;

    li {
      border-top: 1px solid #3e3e3e;
      display: block;
      padding: 32px 0;
      position: relative;

      &::before {
        position: absolute;
        content: '';
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABfklEQVR4Ae2aJVC1YRBG8fS7K+7OLtYjDolKQyMdesQqDXePuNOHDgV3d9lEepGdnXnO1XqunO81DzcAAAAAAAAAAADA3fzbtsAV73CJh6dlgZsbTSeGmRa4UTihqhg/owIisUzpRgVE4ZIbIt4bFZDbKmdaFZAbdfJv0wISV8MCElfDAhJXuwISV8sCEle7AhJXEwJL8s4lrvoCHt5UScfucdUXuCEumMbc46ovcAcV8bZLXPUFhNif1KIfVzcBgTN51SWu+gJCxHuqpUuXuOoLCJROyy5x1RcQYvySqvnMJa76AgJF0bxTXPUFBK+kCtp3iau+gBD/j0fc4qovICQV8rpLXPUFhJgv3Og+crUgkIefEP7ET+FF5ToZxYUsxo+qbAwlHAZz3M+/zQ6naYUKMKF5LYH4H9SsE0xM6pMCLC+reFMlHxpe2OJF/WA+T0A/mFhe1w8mtpi0g4ltVgmmAfSDicMe+sHEgSfVYOLQn0owAQAAAAAAAAAAcA3AC3ysiOXI9gAAAABJRU5ErkJggg==');
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: contain;
        -webkit-filter: contrast(4) invert(1);
        -moz-filter: contrast(4) invert(1);
        -o-filter: contrast(4) invert(1);
        -ms-filter: contrast(4) invert(1);
        filter: contrast(4) invert(1);
        top: 24px;
        right: 0;
      }
    }
  }

  &__episode {
    display: flex;
  }

  &__author {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    &-wrapper {
      flex: 0;
      padding-top: 24px;
    }
  }

  &__description {
    margin-left: 24px;

    h4 {
      color: #fc8b00;
      font-size: 1em;
      font-weight: 700;
      letter-spacing: 2px;
      line-height: 16px;
      text-transform: uppercase;
      margin: 0;
    }

    h3 {
      color: #ffffff;
      font-size: 1.75em;
      font-weight: 300;
      letter-spacing: 2.78px;
      line-height: 28px;
      text-transform: uppercase;
      margin: 12px 0;
    }

    p {
      color: #ffffff;
      font-size: 0.875em;
      font-weight: 300;
      margin: 0;
    }
  }
}
</style>

<script>
import utils from '../utils'

export default {
  name: 'episodesView',
  computed: {
    videoList () {
      return this.$store.state.videoList
    },
    currentIndex () {
      return this.$store.state.currentVideo
    },
    hasVideos () {
      return this.$store.getters.hasVideos
    },
    currentVideo () {
      return this.hasVideos ? this.videoList[this.currentIndex] : this.$store.getters.emptyEpisode
    }
  },
  methods: {
    setCurrentVideo (index) {
      this.$store.commit('setCurrentVideo', index)
      this.$router.replace('/')
    },
    getAuthorPicture (episode) {
      if (this.hasVideos && episode.authors.length > 0) {
        return episode.authors[0].picture.url
      } else {
        return ''
      }
    }
  },
  metaInfo () {
    return {
      title: 'Episodes | How To Fix Democracy',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: utils.getDefaultDescription()
        },
        {
          vmid: 'og:title',
          property: 'og:title',
          content: 'Episodes | How To Fix Democracy'
        },
        {
          vmid: 'og:description',
          property: 'og:description',
          content: utils.getDefaultDescription()
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('setHomepageVideoEffect', false)
    this.$store.commit('setNavigation', true)
  }
}
</script>

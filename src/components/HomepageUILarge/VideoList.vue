<template>

  <div class="video-list">
    <div class="video-list__seasons-section">
      <div class="child" v-for="season in seasons" :key="season" @click="selectSeason(season)" :class="{ selected : isSeasonSelected(season) }">
        <h2>Season {{ season }}</h2>
      </div>
    </div>
    <carousel ref="videoList" class="video-list__carousel" :perPage="4" :paginationEnabled="false" :loop="true" :scrollPerPage="false">
      <slide class="video-list__episode" v-for="(video, index) in videoList" :key="index" @slideclick="selectEpisode(index)">
        <div class="video-list__episode-thumbnail" :style="{ backgroundImage: `url('${getVideoThumbnail(video)}')`}" />
        <h4>Episode {{ video.order }} | Season {{ video.season }}</h4>
        <h3>{{ video.title }}</h3>
        <p>{{ video.description }}</p>
      </slide>
    </carousel>
    <div class="video-list__controls video-list__controls--left" @click="previousEpisode" v-show="videoList.length > 4">arrow_back</div>
    <div class="video-list__controls video-list__controls--right" @click="nextEpisode" v-show="videoList.length > 4">arrow_forward</div>
  </div>
</template>

<style lang="scss" scoped>
.video-list {
  position: relative;
  padding: 32px 80px 64px 80px;

  &__carousel {
    // background:blue;
  }

  &__episode {
    cursor: pointer;

    &-thumbnail {
      width: 20vw;
      height: 11.25vw;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
    }

    h4 {
      color: #fc8b00;
      font-size: 0.875em;
      font-weight: 700;
      letter-spacing: 1px;
      line-height: 12px;
      text-transform: uppercase;
      margin: 18px 0 0 0;
    }

    h3 {
      color: #ffffff;
      font-size: 1.5em;
      font-weight: 300;
      letter-spacing: 1.85px;
      line-height: 20px;
      text-transform: uppercase;
      margin: 9px 0 0 0;
      padding-right: 32px;
    }

    p {
      color: #ffffff;
      font-size: 0.875em;
      font-weight: 300;
      line-height: 16px;
      margin: 14px 0 0 0;
      padding-right: 32px;
    }
  }

  &__seasons-section {
    padding-bottom: 32px;
    display: flex;

    .child {
      margin-right: 32px;

      h2 {
        color: #ffffff;
        font-size: 1.5em;
        font-weight: 300;
        letter-spacing: 1.85px;
        line-height: 20px;
        text-transform: uppercase;
      }

      &.selected {
        border-bottom: 1px solid #fc8b00;
        margin-bottom: -2px;

        h2 {
          color: #fc8b00;
          font-weight: 500;
        }
      }
    }
  }

  &__controls {
    @extend .material-icons;
    position: absolute;
    background-color: #08415C;
    padding: 12px;
    font-size: 36px;
    box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }
  }
}
</style>

<script>
import { Carousel, Slide } from 'vue-carousel'
import utils from '../../utils'

export default {
  components: { Carousel, Slide },
  data () {
    return {
      currentEpisode: 0,
      selectedSeason: null
    }
  },
  props: {
    closeAction: {
      type: Function,
      required: false
    }
  },
  computed: {
    videoList () {
      const filter = item => { return this.selectedSeason === null || item.season === this.selectedSeason }

      return this.$store.state.videoList.filter(filter)
    },
    maxPages () {
      return Math.floor(this.videoList.length / 4)
    },
    currentIndex () {
      return this.$store.state.currentVideo
    },
    hasVideos () {
      return this.$store.getters.hasVideos
    },
    currentVideo () {
      return this.hasVideos ? this.videoList[this.currentIndex] : this.$store.getters.emptyEpisode
    },
    seasons () {
      return new Set(this.$store.state.videoList.map(x => x.season))
    }
  },
  methods: {
    getVideoThumbnail (video) {
      const videoId = utils.getVideoIdFromYoutubeUrl(video.videoUrl)
      return videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : ''
    },
    nextEpisode () {
      this.$refs.videoList.handleNavigation('forward')
    },
    previousEpisode () {
      this.$refs.videoList.handleNavigation('backward')
    },
    selectEpisode (index) {
      this.$store.commit('setCurrentVideo', index)
      if (this.closeAction) {
        this.closeAction()
      }
    },
    selectSeason (season) {
      if (this.selectedSeason !== season) {
        this.selectedSeason = season

        this.$refs.videoList.goToPage(0)
      } else if (this.selectedSeason !== null) {
        this.selectedSeason = null
        this.$refs.videoList.goToPage(0)
      }
    },
    isSeasonSelected (season) {
      return this.selectedSeason === season
    }
  }
}
</script>

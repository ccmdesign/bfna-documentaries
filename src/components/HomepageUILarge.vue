<template>
  <div class="homepage">
    <suggested-tweet />
    <carousel class="homepage__slider" :per-page="1" :paginationEnabled="false" @pageChange="onPageChange" :value="currentIndex" :navigateTo="currentIndex">
      <slide v-for="(video, index) in videoList" :key="index" :video="video" />
    </carousel>
    <navigation-bar />
    <div class="homepage__controls homepage__controls--left" @click="previousSlide" :class="{ hidden: videoListMenu }" v-show="videoList.length > 1">arrow_back</div>
    <div class="homepage__controls homepage__controls--right" @click="nextSlide" :class="{ hidden: videoListMenu }" v-show="videoList.length > 1">arrow_forward</div>
    <menu-ui />
    <div class="homepage__list-bar" :class="{ opened: videoListMenu }">
      <div class="homepage__list-bar__section button-section">
        <div class="homepage__list-bar__button" :class="{ opened: videoListMenu }" @click="toggleVideoList">arrow_upward</div>
        <div class="homepage__list-bar__by">by <a href="https://www.ccmdesign.ca" target="_blank" rel="noopener">ccm.design</a></div>
      </div>

      <div class="homepage__list-bar__section videos-section" :style="{ maxHeight: videoListHeight }" :class="{ closed: !videoListMenu }">
        <video-list class="child" ref="videoListWrapper" :closeAction="closeVideoList" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homepage {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &__slider {
    width: 100%;
    height: 100vh;
  }

  &__list-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    transition: background-color 0.13s ease-in-out;
    z-index: 100;

    &.opened {
      background-color: #01121AD9;
    }

    &__section {
      display: block;
      width: 100%;

      &.button-section {
        position: relative;
        text-align: center;
      }

      &.videos-section {
        overflow-y: hidden;
        transition: max-height 0.33s ease-in-out;

        &.closed {
          max-height: 0 !important;

          .child {
            opacity: 0;
          }
        }

        .child {
          opacity: 1;
          transition: opacity 0.33s ease-in-out;
        }
      }
    }

    &__button {
      @extend .material-icons;
      display: inline-block;
      background-color: #08415C;
      padding: 12px;
      cursor: pointer;
      transform: translateY(-50%);
      transition: transform 0.33s ease-in-out;

      &.opened {
        transform: translateY(-50%) rotateZ(179deg);
      }
    }

    &__by {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      font-size: 0.75em;
      opacity: 0.33;
      color: rgba(255, 255, 255, 0.33);

      a:hover {
        text-decoration: none;
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
    top: 66%;
    cursor: pointer;
    user-select: none;
    transition: opacity 0.33s ease-in-out, transform 0.33s ease-in-out;

    &.hidden {
      opacity: 0;
    }

    &--left {
      left: 0;
      margin-left: 28px;

      &.hidden {
        transform: translateX(-50px) translateY(5px);
      }
    }

    &--right {
      right: 0;

      &.hidden {
        transform: translateX(50px) translateY(5px);
      }
    }
  }
}
</style>

<script>
import { Carousel } from 'vue-carousel'
import Slide from '@/components/HomepageUILarge/Slide'
import VideoList from '@/components/HomepageUILarge/VideoList'
import NavigationBar from '@/components/HomepageUILarge/NavigationBar'
import MenuUI from '@/components/HomepageUILarge/Menu'
import SuggestedTweet from '@/components/HomepageUILarge/SuggestedTweet'

export default {
  name: 'HomepageUILargeComponent',
  components: { Carousel, Slide, VideoList, NavigationBar, 'menu-ui': MenuUI, SuggestedTweet },
  data () {
    return {
      videoListMenu: false,
      videoListHeight: 0
    }
  },
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
    onPageChange (newSlide) {
      this.setCurrentVideo(newSlide)
    },
    setCurrentVideo (index) {
      this.$store.commit('setCurrentVideo', index)
    },
    nextSlide () {
      if ((this.currentIndex + 1) >= this.videoList.length) {
        this.setCurrentVideo(0)
      } else {
        this.setCurrentVideo(this.currentIndex + 1)
      }
    },
    previousSlide () {
      if ((this.currentIndex - 1) < 0) {
        this.setCurrentVideo(this.videoList.length - 1)
      } else {
        this.setCurrentVideo(this.currentIndex - 1)
      }
    },
    toggleVideoList () {
      this.videoListMenu = !this.videoListMenu
    },
    closeVideoList () {
      this.videoListMenu = false
    }
  },
  mounted () {
    requestAnimationFrame(() => {
      this.videoListHeight = Math.max(this.$refs.videoListWrapper.$el.getBoundingClientRect().height, 510) + 'px'
    })
  }
}
</script>

<template>
  <div class="homepage">
    <carousel
      ref="carousel"
      class="homepage__slider"
      :per-page="1"
      :paginationEnabled="false"
      @pageChange="onPageChange"
      :value="currentIndex"
      :navigateTo="currentIndex"
    >
      <slide v-for="(video, index) in videoList" :key="index" :video="video" />
    </carousel>
    <div class="homepage__info">
      <div class="homepage__header">
        <div class="homepage__header__logos">
          <div class="homepage__header__logo">
            <img src="../assets/bertelsmann-logo.png" width="80" />
          </div>
          <div class="homepage__header__title">
            <h3>Documentaries</h3>
          </div>
        </div>
      </div>

      <VideoDescription />
      <div class="homepage__footer" v-show="hasVideos">
        <!-- <div class="homepage__description">
          <h2>Episode {{ currentVideo.order }}</h2>
          <h1>{{ currentVideo.title }}</h1>
          <p>{{ currentVideo.description }}</p>
          <div class="homepage__play-video"><span class="homepage__play-video__icon"></span>Play</div>
        </div> -->
      </div>
    </div>
    <div
      class="homepage__controls homepage__controls--left"
      @click="previousSlide"
      v-show="videoList.length > 1"
    >
      arrow_back
    </div>
    <div
      class="homepage__controls homepage__controls--right"
      @click="nextSlide"
      v-show="videoList.length > 1"
    >
      arrow_forward
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

  &__info {
    position: absolute;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 32px 16px 80px 16px;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
    user-select: none;
    background-color: rgba(0, 0, 0, 0.48);
  }

  &__header {
    display: flex;
    justify-content: space-between;

    &__logos {
      display: flex;
      width: 100%;
    }

    &__logo {
      display: block;
      width: 100%;

      & + & {
        margin-top: 10px;
      }
      h2 {
        padding-top: 8px;
        color: #fc8b00;
        font-size: 1em;
        font-weight: 700;
        letter-spacing: 2.75px;
        text-transform: uppercase;
      }
    }

    &__title {
      color: #fc8b00;
      text-transform: uppercase;
      font-size: 1rem;
      font-weight: 500;
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
  }

  &__description {
    flex: 1;
    padding-top: 8px;

    h2 {
      color: #fc8b00;
      font-size: 0.875em;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin: 0;
    }

    h1 {
      color: #ffffff;
      font-size: 1.5em;
      font-weight: 300;
      letter-spacing: 5px;
      line-height: 32px;
      text-transform: uppercase;
      margin: 4px 0;
    }

    p {
      color: #ffffff;
      font-size: 0.875em;
      font-weight: 300;
      margin: 0;
    }
  }

  &__controls {
    @extend .material-icons;
    position: absolute;
    background-color: #08415c;
    padding: 12px;
    font-size: 36px;
    box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
    top: 33%;
    cursor: pointer;
    user-select: none;
    transform: translateY(-50%);
    z-index: 10;

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }
  }

  &__play-video {
    position: relative;
    display: block;
    text-align: center;
    width: 100%;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.25em;
    color: #ffffff;
    margin: 16px 0 0 0;

    &__icon {
      display: inline-block;
      position: relative;
      width: 36px;

      &::before {
        position: absolute;
        content: "";
        background-color: #fc8b00;
        width: 29px;
        height: 29px;
        bottom: -7px;
        left: 0;
        border-radius: 50%;
      }

      &::after {
        @extend .material-icons;
        position: absolute;
        content: "play_arrow";
        bottom: -5px;
        left: 2px;
        font-size: 1.25em;
      }
    }
  }
}
</style>

<script>
import { Carousel } from "vue-carousel";
import Slide from "@/components/HomepageUISmall/Slide";
import VideoDescription from "@/components/HomepageUISmall/VideoDescription";

export default {
  name: "HomepageUILargeComponent",
  components: { Carousel, Slide, VideoDescription },
  computed: {
    videoList() {
      return this.$store.state.videoList;
    },
    currentIndex() {
      return this.$store.state.currentVideo;
    },
    hasVideos() {
      return this.$store.getters.hasVideos;
    },
    currentVideo() {
      return this.hasVideos
        ? this.videoList[this.currentIndex]
        : this.$store.getters.emptyEpisode;
    },
  },
  methods: {
    onPageChange(newSlide) {
      this.setCurrentVideo(newSlide);
    },
    setCurrentVideo(index) {
      this.$store.commit("setCurrentVideo", index);
    },
    nextSlide() {
      if (this.currentIndex + 1 >= this.videoList.length) {
        this.setCurrentVideo(0);
      } else {
        this.setCurrentVideo(this.currentIndex + 1);
      }
    },
    previousSlide() {
      if (this.currentIndex - 1 < 0) {
        this.setCurrentVideo(this.videoList.length - 1);
      } else {
        this.setCurrentVideo(this.currentIndex - 1);
      }
    },
  },
};
</script>

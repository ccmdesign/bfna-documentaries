<template>
  <div class="full_content">
    <HomeHeader />
    <div class="video__description" :class="workstream">
      <span class="video__workstream__tag">
        {{ currentVideo.workstream }}
      </span>
      <div class="video__heading">
        <h2 class="video__title">{{ currentVideo.title }}</h2>
        <p class="video__subtitle">{{ currentVideo.subtitle }}</p>
        <p class="video__subtitle" v-if="currentVideo.by">By {{ currentVideo.by }}</p>
      </div>
      <div class="video__excerpt" v-bind:class="{ opened : isOpened == 'true' || isOpened == true }">
        <p>{{ currentVideo.description }}</p>
      </div>
      <button class="video__play" @click="openVideo(currentVideo)">play</button>
      <button class="video__info video__info--borderless" @click="returnButton"  v-if="isOpened == 'true' || isOpened == true">Return</button>
      <button class="video__info" @click="moreInfo" v-else>More info</button>
    </div>
  </div>
</template>

<style lang="scss">
.full_content {
  z-index: 1;
  //position: absolute;
  width: 100%;
  height: 85vh;
  max-height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: rgba(17, 24, 41, 0.65);
  padding: 35px 170px 0;
}

.video {
  &__description {
    max-width: 70ch;
    height: 40vh;
    margin-top: 5vh;
    position: relative;
  }
  &__heading {
    padding-bottom: 2vh;
  }
  &__title {
    font-size: 6vh;
    font-weight: 700;
    margin-bottom: 0;
    letter-spacing: -0.05em;
  }
  &__subtitle {
    opacity: 1;
    margin-bottom: 8px;
  }
  &__excerpt {
    margin-bottom: 6vh;
    p {
      font-size: 1em;
      line-height: 1.62em;
      max-height: 10vh;
      transition: all 0.8s ease-out;
      overflow: hidden;
      background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%);
      color: transparent;
      background-clip: text;
      /*display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;  
      overflow: hidden;*/
    }
    &.opened {
      p {
        max-height: 50vh;
        background-color: #FFF;
      }
    }
  }
  &__workstream__tag {
    display: inline-block;
    padding: 2px 24px 2px;
    font-weight: 600;
    font-size: 0.65rem;
    text-transform: uppercase;
    background-color: green;
    color: #ffffff;
  }
  &__play,
  &__info {
    font-weight: bold;
    font-size: 1.5em;
    width: 200px;
    height: 57px;
    line-height: 57px;
    color: #ffffff;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    &:hover, &:active, &:visited, &:focus {
      text-decoration: none;
      outline: none;
    }
  }
  &__play {
    border: none;
    user-select: none;
    line-height: 57px;
    border: 1.5px solid #fc8b00;
    &:hover {
      background-color: lighten(#fc8b00, 9);
      border-color: lighten(#fc8b00, 9);
    }

    &:disabled {
      opacity: 0.33;
      pointer-events: none;
    }
  }
  &__info {
    border: 1.5px solid #FFF;
    background-color: transparent;
    user-select: none;
    line-height: 57px;
    transition: all 0.2s ease-out;
    margin-left: 24px;
    &:hover {
      background-color: #FFF;
      color: #000;
    }
    &.video__info--borderless {
      border-color: transparent;
      &:hover {
        background-color: transparent;
        font-size: 1.6em;
        color: #FFF;
      }
    }
  }
}
.video-workstream--democracy {
  & > .video__workstream__tag,
  & > .video__play {
    background-color: #4f8d71;
    border-color: #4f8d71;
  }
  & > .video__play:hover {
    background-color: lighten(#4f8d71, 9);
    border-color: lighten(#4f8d71, 9);;
  }
}

.video-workstream--politics-society {
  & > .video__workstream__tag,
  & > .video__play {
    background-color: #fc8b00;
    border-color: #fc8b00;
  }
  & > .video__play:hover {
    background-color: lighten(#fc8b00, 9);
    border-color: lighten(#fc8b00, 9);
  }
}

.video-workstream--future-of-work {
  & > .video__workstream__tag,
  & > .video__play {
    background-color: #c73540;
    border-color: #c73540;
  }
  & > .video__play:hover {
    background-color: lighten(#c73540, 9);
    border-color: lighten(#c73540, 9);
  }
}

.video-workstream--digital-economy {
  & > .video__workstream__tag,
  & > .video__play {
    background-color: #631764;
    border-color: #631764;
  }
  & > .video__play:hover {
    background-color: lighten(#631764, 9);
    border-color: lighten(#631764, 9);
  }
}
</style>

<script>
import HomeHeader from "@/components/HomepageUILarge/HomeHeader";
import utils from "../../utils";
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  computed: {
    hasVideos() {
      return this.$store.getters.hasVideos;
    },
    currentVideo() {
      return this.hasVideos
        ? this.$store.state.videoList[this.$store.state.currentVideo]
        : this.$store.getters.emptyEpisode;
    },
    workstream() {
      return `video-workstream--${this.currentVideo.workstream}`;
    },
  },
  props: [
    'isOpened',
  ],
  name: "VideoDescription",
  components: { HomeHeader, PerfectScrollbar },
  methods: {
    openVideo(video) {
      let videoId = ''
      const source = video.source
      if(source == 'youtube'){
        videoId = utils.getVideoIdFromYoutubeUrl(video.videoUrl)
      } else if(source == 'vimeo'){
        videoId = utils.getVideoIdFromVimeoUrl(video.videoUrl)
      }
      if (!videoId) {
        alert(
          `Couldn't play video:\nvideo ID not found in "${video.videoUrl}".`
        );
      }
      this.$store.commit("setHomepageVideoEffect", true);
      setTimeout(() => {
        this.$router.push({ name: "watchVideoId", params: { videoId, source } });
      }, 330);
    },
    moreInfo() {
      this.toTop();
      this.isOpened = true;
      setTimeout(() => {
        this.$router.push({ name: "documentaryLarge", params: { id: this.currentVideo.title } });
      }, 800);
    },
    returnButton() {
      this.isOpened = false;
      setTimeout(() => {
        this.$router.go(-1);
      }, 800);
    },
    toTop() {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
    }
  },
};
</script>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>

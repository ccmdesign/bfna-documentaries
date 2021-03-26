<template>
  <div class="video__description" :class="workstream">
    <div class="video__header">
      
      <div class="video__heading">
        <h2 class="video__title">{{ currentVideo.title }}</h2>
        <p class="video__subtitle">{{ currentVideo.subtitle }}</p>
        <p class="video__subtitle" v-if="currentVideo.by">By {{ currentVideo.by }}</p>
        <span class="video__workstream__tag">
        {{ currentVideo.workstream }}
      </span>
      </div>
    </div>

    <div class="video__body">
      <div>
        <button class="video__play" @click="openVideo(currentVideo)">play</button>

        <div class="video__excerpt">
          <p>{{ currentVideo.description }}</p>
        </div>
      </div>
    </div>
    <ul class="dots">
      <li></li>
      <li active></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style lang="scss">
.video__body {
  height: 55vh;
  overflow: scroll;

  > div { height: auto; }
  > div > :first-child { margin-top: 5vh; }
}

.dots {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  li {
    display: inline-block;
    list-style: none;
    background-color: #fff;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    opacity: .5;
  }

  li[active] { opacity: 1; }

  li + li { margin-left: .75rem; }
}

.video {
  &__description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  &__title {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 0;
    line-height: normal;
  }

  &__subtitle {
    opacity: 1;
    line-height: normal;
  }

  &__excerpt {
    margin-top: 2rem;
    height: 20vh;
    overflow: auto;
  }

  &__workstream__tag {
    display: inline-block;
    padding: 1px 8px 1px;
    font-weight: 600;
    font-size: 0.65rem;
    text-transform: uppercase;
    background-color: green;
    color: #ffffff;
  }
  &__play {
    border: none;
    color: #ffffff;
    text-transform: uppercase;
    padding: 10px 32px;
    cursor: pointer;
    user-select: none;
    font-weight: bold;

    &:hover {
      background-color: lighten(#fc8b00, 9);
    }

    &:disabled {
      opacity: 0.33;
      pointer-events: none;
    }
  }
}
.video-workstream--democracy {
  & .video__workstream__tag,
  & .video__play {
    background-color: #4f8d71;
  }
  & .video__play:hover {
    background-color: lighten(#4f8d71, 9);
  }
}

.video-workstream--politics-society {
  & .video__workstream__tag,
  & .video__play {
    background-color: #fc8b00;
  }
  & .video__play:hover {
    background-color: lighten(#fc8b00, 9);
  }
}

.video-workstream--future-of-work {
  & > .video__workstream__tag,
  & > .video__play {
    background-color: #c73540;
  }
  & > .video__play:hover {
    background-color: lighten(#c73540, 9);
  }
}

.video-workstream--digital-economy {
  & > .video__workstream__tag,
  & > .video__play {
    background-color: #631764;
  }
  & > .video__play:hover {
    background-color: lighten(#631764, 9);
  }
}
</style>

<script>
import HomeHeader from "@/components/HomepageUILarge/HomeHeader";
import utils from "../../utils";

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
  name: "VideoDescription",
  components: { HomeHeader },
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
  },
};
</script>

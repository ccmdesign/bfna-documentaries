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
            </div>
            <div class="video__excerpt">
                <p>{{ currentVideo.description }}</p>
            </div>
            <button class="video__play" @click="openVideo(currentVideo)">play</button>
        </div>
    </div>
</template>

<style lang="scss">
.full_content {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    background-color: rgba(17, 24, 41, 0.65);
    padding: 70px 100px;
}

    .video {
        &__description {
            width: 55%;
        }
        &__heading {
            padding-bottom: 60px;
        }
        &__title {
            font-size: 48px;
            font-weight: 500;
            margin-bottom: 0;
        }
        &__subtitle {
            opacity: 1;
        }
        &__excerpt {
            padding-right: 150px;
        }
        &__workstream__tag {
            display: inline-block;
            padding: 1px 8px 1px;
            font-weight: 600;
            font-size: 0.65rem;
            text-transform: uppercase;
            background-color: green;
            color: #FFFFFF;
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
        & > .video__workstream__tag,
        & > .video__play {
            background-color: #4F8D71;
        }
        & > .video__play:hover {
            background-color: lighten(#4F8D71, 9);
        }
    }

    .video-workstream--politics-society {
        & > .video__workstream__tag,
        & > .video__play  {
            background-color: #FC8B00;
        }
        & > .video__play:hover {
            background-color: lighten(#FC8B00, 9);
        }
    }

    .video-workstream--future-of-work {
        & > .video__workstream__tag,
        & > .video__play  {
            background-color: #C73540;
        }
        & > .video__play:hover {
            background-color: lighten(#C73540, 9);
        }
    }

    .video-workstream--digital-economy {
        & > .video__workstream__tag,
        & > .video__play  {
            background-color: #631764;
        }
        & > .video__play:hover {
            background-color: lighten(#631764, 9);
        }
    }
</style>

<script>
import HomeHeader from '@/components/HomepageUILarge/HomeHeader'
import utils from '../../utils'

export default {
  computed: {
    hasVideos () {
      return this.$store.getters.hasVideos
    },
    currentVideo () {
      return this.hasVideos ? this.$store.state.videoList[this.$store.state.currentVideo] : this.$store.getters.emptyEpisode
    },
    workstream () {
        return `video-workstream--${this.currentVideo.workstream}`
    }
  },
  name: 'VideoDescription',
  components: { HomeHeader },
  methods: {
    openVideo (video) {
      const videoId = utils.getVideoIdFromYoutubeUrl(video.videoUrl)
      if (!videoId) {
        alert(`Couldn't play video:\nvideo ID not found in "${video.videoUrl}".`)
      }
      this.$store.commit('setHomepageVideoEffect', true)
      setTimeout(() => {
        this.$router.push({ name: 'watchVideoId', params: { videoId } })
      }, 330)
    }
  }
}
</script>

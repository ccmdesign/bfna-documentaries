<template>
  <div class="app-window app-page__wrapper">
    <div class="app-page__content">
      <ul class="documentaries-view__list">
        <li
          v-for="(video, index) in videoList"
          :key="index"
          @click="setCurrentVideo(video.videoUrl)"
        >
          <div class="documentaries-view__documentary">
            <div class="documentaries-view__thumbnail-wrapper">
              <div class="documentaries-view__thumbnail" :style="{ backgroundImage: `url('${video.backgroundImage}')` }"></div>
              <div class="documentaries-view__main-info">
                <h1>{{ video.title }}</h1>
                <span
                  class="documentaries-view__workstream__tag"
                  :class="video.workstream"
                >
                  {{ video.workstream }}
                </span>
              </div>
            </div>
            <div class="documentaries-view__description">
              <p>{{ video.subtitle }}</p>
              <p class="video-description__text">
                {{ video.description }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.documentaries-view {
  &__list {
    list-style: none;
    padding: 0 35px 64px 35px;

    li {
      display: block;
      padding: 32px 0;
      position: relative;
    }
  }

  &__thumbnail {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    &-wrapper {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      gap: 18px;
      margin-bottom: 11px;
    }
  }

  &__main-info {
    flex: 1;
    h1 {
      font-size: 1em;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 9px;
    }
  }

  &__workstream__tag {
    display: inline-block;
    padding: 1px 8px 1px;
    font-weight: 600;
    font-size: 0.65rem;
    text-transform: uppercase;
    background-color: green;
    color: #ffffff;

    &.democracy {
      background-color: #4f8d71;
    }
    &.politics-society {
      background-color: #fc8b00;
    }
    &.future-of-work {
      background-color: #c73540;
    }
    &.digital-economy {
      background-color: #631764;
    }
  }

  &__description {
    p {
      font-size: 0.75em;
      font-weight: 300;
      line-height: 18px;
    }
  }
}
</style>

<script>
import utils from "../utils";

export default {
  name: "documentariesView",
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
    setCurrentVideo(url) {
      this.$store.commit("setCurrentVideo", url);
      this.$router.replace({ name: "documentaryInternal", params: { id: utils.slugify(this.currentVideo.title) } });
    },
  },
  metaInfo() {
    return {
      title: "BFNA Documentaries",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: utils.getDefaultDescription(),
        },
        {
          vmid: "og:title",
          property: "og:title",
          content: utils.getDefaultTitle(),
        },
        {
          vmid: "og:description",
          property: "og:description",
          content: utils.getDefaultDescription(),
        },
      ],
    };
  },
  mounted() {
    this.$store.commit("setHomepageVideoEffect", false);
    this.$store.commit("setNavigation", true);
  },
};
</script>

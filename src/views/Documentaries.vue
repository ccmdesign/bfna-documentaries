<template>
  <div class="app-window app-page__wrapper">
    <div class="app-page__content">
      <ul class="documentaries-view__list">
        <li
          v-for="(video, index) in videoList"
          :key="index"
          @click="setCurrentVideo(index)"
        >
          <div class="documentaries-view__documentary">
            <div class="documentaries-view__thumbnail-wrapper">
              <div
                class="documentaries-view__thumbnail"
                :style="{ backgroundImage: `url('${video.backgroundImage}')` }"
              ></div>
            </div>
            <div class="documentaries-view__description">
              <span
                class="documentaries-view__workstream__tag"
                :class="video.workstream"
              >
                {{ video.workstream }}
              </span>
              <h3>{{ video.title }}</h3>
              <p>{{ video.subtitle }}</p>
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
    padding: 24px 24px 64px 24px;

    li {
      border-top: 1px solid #3e3e3e;
      display: block;
      padding: 32px 0;
      position: relative;

      &::before {
        position: absolute;
        content: "";
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABfklEQVR4Ae2aJVC1YRBG8fS7K+7OLtYjDolKQyMdesQqDXePuNOHDgV3d9lEepGdnXnO1XqunO81DzcAAAAAAAAAAADA3fzbtsAV73CJh6dlgZsbTSeGmRa4UTihqhg/owIisUzpRgVE4ZIbIt4bFZDbKmdaFZAbdfJv0wISV8MCElfDAhJXuwISV8sCEle7AhJXEwJL8s4lrvoCHt5UScfucdUXuCEumMbc46ovcAcV8bZLXPUFhNif1KIfVzcBgTN51SWu+gJCxHuqpUuXuOoLCJROyy5x1RcQYvySqvnMJa76AgJF0bxTXPUFBK+kCtp3iau+gBD/j0fc4qovICQV8rpLXPUFhJgv3Og+crUgkIefEP7ET+FF5ToZxYUsxo+qbAwlHAZz3M+/zQ6naYUKMKF5LYH4H9SsE0xM6pMCLC+reFMlHxpe2OJF/WA+T0A/mFhe1w8mtpi0g4ltVgmmAfSDicMe+sHEgSfVYOLQn0owAQAAAAAAAAAAcA3AC3ysiOXI9gAAAABJRU5ErkJggg==");
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

  &__documentary {
    display: flex;
  }

  &__thumbnail {
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
    setCurrentVideo(index) {
      this.$store.commit("setCurrentVideo", index);
      this.$router.replace("/");
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
          content: "BFNA Documentaries",
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

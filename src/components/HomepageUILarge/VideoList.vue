<template>
  <div class="video-list">
    <div class="video-list__workstreams-section">
      <div
        class="child workstream--democracy"
        @click="selectWorkstream('democracy')"
        :class="{ selected: isWorkstreamSelected('democracy') }"
      >
        <h2>Democracy</h2>
      </div>
      <div
        class="child workstream--politics-society"
        @click="selectWorkstream('politics-society')"
        :class="{ selected: isWorkstreamSelected('politics-society') }"
      >
        <h2>Politics &amp; Society</h2>
      </div>
      <div
        class="child workstream--future-of-work"
        @click="selectWorkstream('future-of-work')"
        :class="{ selected: isWorkstreamSelected('future-of-work') }"
      >
        <h2>Future of Work</h2>
      </div>
      <div
        class="child workstream--digital-economy"
        @click="selectWorkstream('digital-economy')"
        :class="{ selected: isWorkstreamSelected('digital-economy') }"
      >
        <h2>Digital Economy</h2>
      </div>
    </div>

    <carousel
      ref="videoList"
      class="video-list__carousel"
      :perPage="4"
      :paginationEnabled="false"
      :loop="true"
      :scrollPerPage="false"
    >
      <slide
        class="video-list__episode"
        v-for="(video, index) in videoList"
        :key="index"
        @slideclick="selectEpisode(index)"
      >
        <div
          class="video-list__episode-thumbnail"
          :style="{ backgroundImage: `url('${video.backgroundImage}')` }"
        />

        <div class="video-list__episode-info">
          <h4>{{ video.title }}</h4>
          <h3>{{ video.subtitle }}</h3>
        </div>
      </slide>
    </carousel>

    <div
      class="video-list__controls video-list__controls--left"
      @click="previousEpisode"
      v-show="videoList.length > 4"
    >
      arrow_back
    </div>
    <div
      class="video-list__controls video-list__controls--right"
      @click="nextEpisode"
      v-show="videoList.length > 4"
    >
      arrow_forward
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video-list {
  position: relative;
  padding: 32px 80px 64px 80px;

  &__episode {
    cursor: pointer;
    box-shadow: 0px 8px 32px #00000026;
    border: 1px solid #ffffff33;
    width: 20vw;
    margin-left: 2vw;

    &:first-child {
      margin-left: 0;
    }

    &-thumbnail {
      height: 11.25vw;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
    }

    &-info {
      padding: 16px 30px;
      background-color: #00000059;
    }

    h4 {
      color: #ffffff;
      font-size: 1.25em;
      font-weight: 700;
      letter-spacing: 0.21px;
      line-height: 18px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    h3 {
      color: #ffffff;
      font-size: 0.875em;
      letter-spacing: 0.21px;
      line-height: 16px;
    }
  }

  &__workstreams-section {
    padding-bottom: 32px;
    display: flex;
    justify-content: center;
    .child + .child { margin-left: 2rem;}

    .child {
      --button-color: #ffffff;
      --bg-color: transparent;


      padding: .4rem .8rem .5rem;
      cursor: pointer;
      border: 2px solid var(--button-color);
      background-color: var(--bg-color);

      &.workstream--democracy { --button-color: #4f8d71; }
      &.workstream--politics-society { --button-color: #fc8b00; }
      &.workstream--future-of-work { --button-color: #c73540; }
      &.workstream--digital-economy { --button-color: #631764; }

      h2 {
        margin: 0;
        padding: 2px 5px;
        color: white;
        font-size: 1em;
        letter-spacing: 0.23px;
        line-height: 20px;
        text-transform: uppercase;
      }

      &.selected {
        --bg-color: var(--button-color);
      }
    }
  }

  &__controls {
    @extend .material-icons;
    position: absolute;
    background-color: #08415c;
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
import { Carousel, Slide } from "vue-carousel";
import utils from "../../utils";

export default {
  components: { Carousel, Slide },
  data() {
    return {
      currentEpisode: 0,
      selectedWorkstreams: [],
    };
  },
  props: {
    closeAction: {
      type: Function,
      required: false,
    },
  },
  computed: {
    videoList() {
      const filter = (item) => {
        return (
          this.selectedWorkstreams.length === 0 ||
          this.selectedWorkstreams.includes(item.workstream)
        );
      };

      return this.$store.state.videoList.filter(filter);
    },
    maxPages() {
      return Math.floor(this.videoList.length / 4);
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
    // workstreams () {
    //   return new Set(this.$store.state.videoList.map(x => x.workstream))
    // }
  },
  methods: {
    getVideoThumbnail(video) {
      const videoId = utils.getVideoIdFromYoutubeUrl(video.videoUrl);
      return videoId
        ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
        : "";
    },
    nextEpisode() {
      this.$refs.videoList.handleNavigation("forward");
    },
    previousEpisode() {
      this.$refs.videoList.handleNavigation("backward");
    },
    selectEpisode(index) {
      this.$store.commit("setCurrentVideo", index);
      if (this.closeAction) {
        this.closeAction();
      }
    },
    selectWorkstream(workstream) {
      const index = this.selectedWorkstreams.indexOf(workstream);

      if (index > -1) {
        this.selectedWorkstreams.splice(index, 1);
      } else {
        this.selectedWorkstreams.push(workstream);
      }

      // if (this.selectedWorkstream !== workstream) {
      //   this.selectedWorkstream = workstream

      //   this.$refs.videoList.goToPage(0)
      // } else if (this.selectedWorkstream !== null) {
      //   this.selectedWorkstream = null
      //   this.$refs.videoList.goToPage(0)
      // }
    },
    isWorkstreamSelected(workstream) {
      return this.selectedWorkstreams.includes(workstream);
    },
  },
};
</script>

<template>
  <div class="suggested-tweet-wrapper" :class="{ hidden: !showSuggestedTweet }" @click="closeSuggestedTweet(false, $event)">
    <div class="watch-view__suggested-tweet">
      <p>
        {{ currentVideo.suggestedTweet }}
      </p>
      <div class="watch-view__tweet-this-wrapper">
        <a class="watch-view__tweet-this" :href="`https://twitter.com/intent/tweet?text=${getFormattedSuggestedTweet()}`" target="_blank" rel="noopener">
          <span><img src="/img/icons/twitter.svg" /></span><span style="margin-left:14px;padding-bottom:1px">Tweet this</span>
        </a>
        <b class="watch-view__tweet-this close-this" @click="closeSuggestedTweet(true)">
          <span style="flex:0;"><img src="/img/icons/close.svg" /></span><span style="margin-left:14px;padding-bottom:1px;flex:1;">Close</span>
        </b>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.suggested-tweet {
  &-wrapper {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    transition: opacity 0.13s ease-in-out;

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
}

.watch-view__suggested-tweet {
  margin: 0 32px;
  width: 768px;
  max-width: 100%;
}

.watch-view__tweet-this {
  min-width: 160px;
  background-color: #007dad;
  padding: 10px 20px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.33px;

  &:hover {
    text-decoration: none;
    background-color: lighten(#007dad, 7);
    color: #ffffff;
  }
}

.close-this {
  display: inline-flex;
  flex-direction: row;
  margin-left: 24px;
  background-color: #ad0026;
  cursor: pointer;

  @include media-breakpoint-small {
    margin: 24px 0 0 0;
    display: block;
  }

  &:hover {
    background-color: lighten(#ad0026, 7);
  }
}
</style>

<script>
export default {
  name: 'SuggestedTweetLarge',
  computed: {
    hasVideos () {
      return this.$store.getters.hasVideos
    },
    currentVideo () {
      return this.hasVideos ? this.$store.state.videoList[this.$store.state.currentVideo] : this.$store.getters.emptyEpisode
    },
    showSuggestedTweet () {
      return this.hasVideos && this.$store.state.showSuggestedTweetOnHomepage
    }
  },
  methods: {
    closeSuggestedTweet (force, e) {
      if (!force && e && !e.target.classList.contains('suggested-tweet-wrapper')) {
        return
      }
      this.$store.commit('setSuggestedTweetHomepageVisibility', false)
    },
    getFormattedSuggestedTweet () {
      return encodeURI(this.currentVideo.suggestedTweet).replace(/#/g, '%23').replace(/@/g, '%40')
    }
  }
}
</script>

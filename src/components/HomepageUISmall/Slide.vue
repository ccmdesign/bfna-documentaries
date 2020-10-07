<template>
  <slide class="homepage__slider__slide" @slideclick="openVideo(video)">
    <background :videoUrl="video.videoUrl" />
  </slide>
</template>

<style lang="scss">
.homepage__slider__slide {
  width: 100%;
  height: 100vh;
}
</style>

<script>
import { Slide } from 'vue-carousel'
import Background from '@/components/HomepageUISmall/Background'
import utils from '../../utils'

export default {
  components: { Slide, Background },
  props: {
    video: {
      type: Object,
      required: true
    }
  },
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

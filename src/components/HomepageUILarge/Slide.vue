<template>
  <slide class="homepage__slider__slide">
    <background :videoUrl="video.videoUrl" />
    <VideoDescription />
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
import Background from '@/components/HomepageUILarge/Background'
import VideoDescription from '@/components/HomepageUILarge/VideoDescription'

export default {
  components: { Slide, Background, VideoDescription },
  props: {
    video: {
      type: Object,
      required: true
    }
  }
}
</script>

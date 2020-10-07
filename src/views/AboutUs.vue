<template>
  <div class="app-window app-page__wrapper">
    <div class="app-window__title app-page__wrapper">
      <div class="app-page__content">
        About Us
      </div>
    </div>
    <router-link tag="div" to="/" class="app-window__close-button"></router-link>
    <div class="app-page__content app-page__padding">
      <div class="app-window__logo app-window__logo--center">
        <img alt="How To Fix Democracy's Logo" src="../assets/logo.png" />
      </div>
      <p class="about-us-view__title">
        Since its origins, <span class="highlight">democracy</span> has been a work in progress. <span class="highlight">Today, many question its resilience.</span>
      </p>
      <section class="about-us-view__text flex columns">
        <div class="column">
          <p>
            The Bertelsmann Foundation and Humanity in Action have teamed up with Andrew Keen, author of How to Fix the Future, to launch this video and podcast series exploring practical responses to the threats facing democracies around the world.
          </p>
          <p>
            Host Andrew Keen interviews prominent thinkers, writers, politicians, technologists, and business leaders who enlighten and challenge us as we seek the answers to How to Fix Democracy.
          </p>
          <p>
            Launched in January 2019, this series explores why democracy is not delivering in Europe and North America and how it can be reinvigorated. These interviews bring our audience face to face with the origins, controversies, triumphs, and failures of democracy in the 21st century. Our goal is to analyze what is wrong with democracy and spark conversations
about how to fix it.
          </p>
        </div>
        <div class="column">
          <p>
            <strong>Disclaimer:</strong> How to Fix Democracy is meant to provoke discussion and curiosity. The opinions and views expressed in this series are solely those of the participants and do not necessarily represent those of the Bertelsmann Foundation, Humanity in Action, or their employees.
          </p>
        </div>
      </section>
      <section class="about-us-view__text">
        <p>
          This series is also available as a podcast.
        </p>
        <p>
          <a class="about-us-view__podcast-icon" href="https://itunes.apple.com/us/podcast/how-to-fix-democracy/id1451517552" target="_blank" rel="noopener">
            <img alt="iTunes" src="/img/icons/podcasts.svg" />
          </a>
          <a class="about-us-view__podcast-icon" href="https://open.spotify.com/show/2cR0EWlbC5CZcOXs3F59Yp" target="_blank" rel="noopener">
            <img alt="Spotify" src="/img/icons/spotify.svg" />
          </a>
          <a class="about-us-view__podcast-icon" href="https://play.google.com/music/listen?u=0#/ps/Ihoqpn6tlf3foz3eqhg5s47uxcy" target="_blank" rel="noopener">
            <img alt="Google Podcasts" src="/img/icons/google-podcasts.svg" />
          </a>
        </p>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
.about-us-view {
  &__title {
    font-size: 2em;
    font-weight: 700;
    letter-spacing: 2.92px;
    line-height: 50px;
    text-transform: uppercase;
    padding: 32px 0;

    .highlight {
      color: $colors-orange;
      letter-spacing: 3px;
    }
  }

  &__text {
    font-weight: 500;
    line-height: 30px;
  }

  &__podcast-icon {
    display: inline-block;

    & + & {
      margin-left: 16px;
    }
  }
}
</style>

<script>
import utils from '../utils'

export default {
  name: 'aboutUsView',
  metaInfo () {
    return {
      title: 'About Us | How To Fix Democracy',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: utils.getDefaultDescription()
        },
        {
          vmid: 'og:title',
          property: 'og:title',
          content: 'About Us | How To Fix Democracy'
        },
        {
          vmid: 'og:description',
          property: 'og:description',
          content: utils.getDefaultDescription()
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('setHomepageVideoEffect', false)
    this.$store.commit('setNavigation', true)
  }
}
</script>

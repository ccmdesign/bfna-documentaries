<template>
  <div class="app-window app-page__wrapper">
    <div class="app-window__title app-page__wrapper">
      <div class="app-page__content">
        Host
      </div>
    </div>
    <router-link tag="div" to="/" class="app-window__close-button"></router-link>
    <div class="app-page__content app-page__padding">
      <section class="flex columns">
        <div class="host-view__portrait">
          <img alt="Andrew Keen" src="/img/authors/andrew-keen.png" />
        </div>
        <div class="host-view__description">
          <h2 class="host-view__author">Andrew Keen</h2>
          <p class="host-view__biography">
            How to Fix Democracy is hosted by Andrew Keen, one of the world's best known and controversial commentators on the digital revolution. He is the author of four books: Cult of the Amateur, <a href="http://www.ajkeen.com/digital-vertigo-1/" target="_blank" rel="noopener">Digital Vertigo</a>, <a href="http://www.ajkeen.com/the-internet-is-not-the-answer-1/" target="_blank" rel="noopener">The Internet Is Not The Answer</a>, and <a href="http://www.ajkeen.com/how-to-fix-the-future/" target="_blank" rel="noopener">How To Fix The Future</a>, published in 2018.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
.host-view {
  &__portrait {
    flex: 40%;
    text-align: center;
    padding: 32px 0 96px 0;

    img {
      width: 160px;
      height: auto;
    }

    @include media-breakpoint-large {
      padding: 0;

      img {
        width: 224px;
      }
    }
  }

  &__description {
    flex: 60%;

    a {
      font-weight: 400;
    }
  }

  &__author {
    color: #fc8b00;
    font-size: 1.875em;
    font-weight: 700;
    letter-spacing: 2.5px;
    line-height: 30px;
    text-transform: uppercase;
  }

  &__biography {
    font-size: 1.25em;
    font-weight: 300;
    margin-top: 30px;
  }
}
</style>

<script>
const description = 'How to Fix Democracy is hosted by Andrew Keen, one of the world\'s best known and controversial commentators on the digital revolution. He is the author of four books: Cult of the Amateur, Digital Vertigo, The Internet Is Not The Answer and How To Fix The Future, published in 2018.'
export default {
  name: 'hostView',
  metaInfo () {
    return {
      title: 'The Host | How To Fix Democracy',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: description
        },
        {
          vmid: 'og:title',
          property: 'og:title',
          content: 'The Host | How To Fix Democracy'
        },
        {
          vmid: 'og:description',
          property: 'og:description',
          content: description
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

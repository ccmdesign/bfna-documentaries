<template>
  <div class="watch-view" @mousemove="timeoutNavigation" @click="timeoutNavigation" @mouseover="timeoutNavigation">
    <router-link ref="backButton" tag="div" to="/" class="watch-view__back" :class="{ visible: navigationVisible }" @mousemove="timeoutNavigation" @click="timeoutNavigation" @mouseover="timeoutNavigation">close</router-link>
    <div class="watch-view__panel-wrapper">
      <div class="watch-view__panel" :class="{ visible: navigationVisible && showSuggestedTweet }" @mousemove="keepNavigation" @click="keepNavigation" @mouseover="keepNavigation" @mouseleave="timeoutNavigation">
      <!-- <div class="watch-view__panel" :class="{ visible: true }"> -->
        <div class="watch-view__suggested-tweet" v-show="hasSuggestedTweet()">
          <p>
            {{ getSuggestedTweet() }}
          </p>
          <div class="watch-view__tweet-this-wrapper">
            <a class="watch-view__tweet-this" :href="`https://twitter.com/intent/tweet?text=${getFormattedSuggestedTweet()}`" target="_blank" rel="noopener">
              <span><img src="/img/icons/twitter.svg" /></span><span style="margin-left:14px;padding-bottom:1px">Tweet this</span>
            </a>
          </div>
        </div>
        <div class="watch-view__subscribe">
          <div class="watch-view__subscribe-newsletter">
            <p>Subscribe to our newsletter</p>
            <div id="mc_embed_signup">
              <form action="https://bfna.us20.list-manage.com/subscribe/post?u=53fc7e266c23506906a0a602f&amp;id=4447bf4515"
                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank"
                novalidate>
                <div id="mc_embed_signup_scroll">
                  <div id="mergeRow-gdpr" class="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group" aria-hidden="true">
                    <div class="content__gdpr">
                      <fieldset class="mc_fieldset gdprRequired mc-field-group" name="interestgroup_field">
                        <label class="checkbox subfield" for="gdpr_1657"><input type="checkbox" id="gdpr_1657" name="gdpr[1657]"
                            value="Y" class="av-checkbox" checked><span>Email</span> </label>
                      </fieldset>
                    </div>
                  </div>
                  <div id="mergeRow-interests" class="mc-field-group input-group" aria-hidden="true">
                    <strong>I'm interested in </strong>
                    <ul>
                      <li><input type="checkbox" value="1" name="group[3633][1]" id="mce-group[3633]-3633-0" checked><label
                          for="mce-group[3633]-3633-0">How to Fix Democracy</label></li>
                    </ul>
                  </div>
                  <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                  <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text"
                      name="b_53fc7e266c23506906a0a602f_4447bf4515" tabindex="-1" value=""></div>
                  <div class="mc-field-group watch-view__subscribe-newsletter__inputs-wrapper">
                    <input type="email" value="" name="EMAIL" class="required email watch-view__subscribe-email" id="mce-EMAIL" placeholder="E-mail">
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                      class="button watch-view__subscribe-submit">
                  </div>
                  <div id="mce-responses" class="clear">
                    <div class="response" id="mce-error-response" style="display:none"></div>
                    <div class="response" id="mce-success-response" style="display:none"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="watch-view__subscribe-channel">
            <p>Subscribe to our Youtube channel</p>
            <a href="https://www.youtube.com/channel/UCZZdgI5F7KjUCW0fCKUOAAg?sub_confirmation=1" target="_blank" rel="noopener">Subscribe</a>
          </div>
        </div>
      </div>
    </div>
    <div class="watch-view__wrapper" :class="{ show }" @mousemove="timeoutNavigation" @click="timeoutNavigation" @mouseover="timeoutNavigation">
      <youtube class="watch-view__player" :video-id="videoId" ref="youtube" @playing="showPlayer" @mousemove="timeoutNavigation" @click="timeoutNavigation" @mouseover="timeoutNavigation" @paused="keepNavigation" @ended="endVideo"></youtube>
    </div>
  </div>
</template>

<style lang="scss">
.watch-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  overflow: hidden;

  &__panel-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  &__panel {
    opacity: 0;
    width: 960px;
    max-width: 100%;
    margin: 0 32px;
    padding: 64px 0;
    overflow: auto;
    transition: opacity 0.13s ease-in-out;

    &.visible {
      @include media-breakpoint-large {
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  &__subscribe {
    background-color: rgba(0, 0, 0, 0.93);
    padding: 24px 48px 36px 48px;
    display: flex;
    flex-direction: column;

    @include media-breakpoint-large {
      flex-direction: row;
    }

    #mergeRow-gdpr, #mergeRow-interests {
      display: none;
    }

    p {
      font-size: 1.25em;
      font-weight: 300;
    }

    &-newsletter {
      flex: 1;

      &__inputs-wrapper {
        display: flex;
      }
    }

    &-email {
      flex: 1;
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.5);
      padding: 10px 20px;
      font-size: 1.15em;
      color: #ffffff;
      font-weight: lighter;

      &:active {
        border-color: #ffffff;
        background-color: #ffffff;
        text-decoration: none;
        color: #000000;
      }
    }

    &-submit {
      flex: 0;
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-left: none;
      text-align: center;
      padding: 10px 20px;
      font-size: 1.15em;
      color: #ffffff;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;

      &:hover {
        border-color: #ffffff;
        background-color: #ffffff;
        text-decoration: none;
        color: #000000;
      }

      &:disabled {
        opacity: 0.33;
        pointer-events: none;
      }
    }

    &-channel {
      flex: 1;

      @include media-breakpoint-large {
        margin-left: 48px;
      }

      a {
        display: block;
        border: 1px solid rgba(255, 255, 255, 0.5);
        text-align: center;
        padding: 10px 20px;
        text-transform: uppercase;
        font-size: 1.15em;
        color: #ffffff;
        letter-spacing: 1px;

        &:hover {
          border-color: #ffffff;
          background-color: #ffffff;
          text-decoration: none;
          color: #000000;
        }
      }
    }
  }

  &__suggested-tweet {
    background-color: rgba(#fc8b00, 0.97);
    padding: 32px 64px 0 64px;
    margin: 0 0 64px 0;

    p {
      font-size: 1.5em;
      line-height: 30px;
      font-weight: 300;
    }
  }

  &__tweet-this {
    &-wrapper {
      text-align: center;
      transform: translateY(50%);

      @include media-breakpoint-small {
        transform: none;
        padding: 16px 0 32px 0;
      }
    }

    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #007dad;
    padding: 10px 20px;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.33px;

    @include media-breakpoint-small {
      display: block;
    }

    &:hover {
      text-decoration: none;
      background-color: lighten(#007dad, 7);
      color: #ffffff;
    }
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s ease-in-out;

    &.show {
      opacity: 1;
    }
  }

  &__back {
    @extend .material-icons;
    position: absolute;
    bottom: 48px;
    right: 48px;
    background-color: rgb(8,67,94);
    font-size: 2em;
    padding: 12px;
    box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    opacity: 0;
    // pointer-events: none;
    transition: background-color 0.23s ease-in-out, opacity 0.13s ease-in-out;
    z-index: 100;

    @include media-breakpoint-large {
      bottom: initial;
      top: 48px !important;
    }

    &:hover {
      background-color: #000000;
    }

    &.visible {
      pointer-events: all;
      opacity: 1;
    }
  }

  &__player {
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>

<script>
import utils from '../utils'

export default {
  data () {
    return {
      videoId: '',
      videoObject: null,
      show: false,
      navigationVisible: true,
      showSuggestedTweet: false,
      currentTimeout: null,
      newsletterSubscribed: 0,
      newsletterFeedback: ''
    }
  },
  computed: {
    videoList () {
      return this.$store.state.videoList
    },
    currentVideo () {
      return this.$store.state.currentVideo
    }
  },
  methods: {
    showPlayer () {
      this.show = true
      this.showSuggestedTweet = false
      this.timeoutNavigation()
    },
    timeoutNavigation () {
      if (!this.show) return
      this.navigationVisible = true
      if (this.currentTimeout) {
        clearTimeout(this.currentTimeout)
        this.currentTimeout = null
      }
      this.currentTimeout = setTimeout(() => {
        this.navigationVisible = false
        this.currentTimeout = null
        if (!this.showSuggestedTweet) {
          this.showSuggestedTweet = true
        }
      }, 5000)
    },
    keepNavigation () {
      this.navigationVisible = true
      if (this.currentTimeout) {
        clearTimeout(this.currentTimeout)
        this.currentTimeout = null
      }
    },
    endVideo () {
      this.show = false
      this.keepNavigation()
    },
    hasSuggestedTweet () {
      return this.videoObject && this.videoObject.suggestedTweet
    },
    getSuggestedTweet () {
      return this.videoObject && this.videoObject.suggestedTweet ? this.videoObject.suggestedTweet : ''
    },
    getFormattedSuggestedTweet () {
      return encodeURI(this.getSuggestedTweet()).replace(/#/g, '%23').replace(/@/g, '%40')
    },
    submitNewsletter (event) {
      event.preventDefault()
      utils.registerNewsletter(null, this.$refs.newsletter_email, (pairs) => {
        for (const pair of pairs) {
          this[pair[0]] = pair[1]
        }
      })
    },
    holdLoading (cb) {
      if (this.videoList.length === 0) {
        setTimeout(() => this.holdLoading(cb), 300)
      } else {
        cb()
      }
    }
  },
  mounted () {
    const paramVideoId = this.$route.params.videoId
    this.holdLoading(() => {
      if (paramVideoId) {
        const matchedVideo = this.videoList.find((video) => utils.getVideoIdFromYoutubeUrl(video.videoUrl) === paramVideoId)
        if (matchedVideo) {
          this.videoObject = matchedVideo
          this.videoId = paramVideoId
        } else {
          this.$router.replace('/')
          return
        }
      } else {
        const currentVideo = this.videoList[this.currentVideo]
        if (currentVideo) {
          const videoId = utils.getVideoIdFromYoutubeUrl(currentVideo.videoUrl)
          if (videoId) {
            this.videoObject = currentVideo
            this.videoId = videoId
          } else {
            alert(`Couldn't play video:\nvideo ID not found in "${currentVideo.videoUrl}".`)
            return
          }
        } else {
          alert(`Couldn't play video:\nvideo object not found.`)
          return
        }
        if (!this.videoId) {
          alert(`Couldn't play video:\nvideo ID not found in "${currentVideo.videoUrl}".`)
          return
        }
      }
      this.$store.commit('setHomepageVideoEffect', true)
      this.$store.commit('setNavigation', false)
      setTimeout(() => {
        this.$refs.youtube.player.playVideo()
        setTimeout(() => {
          this.$refs.youtube.player.getPlayerState().then((status) => {
            if (status !== 1) {
              this.show = true
            }
          })
        }, 1000)
      }, 1000)
    })
  },
  metaInfo () {
    return {
      title: this.videoObject ? `${this.videoObject.title} on How To Fix Democracy` : 'Watch | How To Fix Democracy',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.videoObject && this.videoObject.transcript ? this.videoObject.transcript : utils.getDefaultDescription()
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: this.videoObject && this.videoObject.tags && this.videoObject.tags.length > 0 ? this.videoObject.tags.join(',') : ''
        },
        {
          vmid: 'og:title',
          property: 'og:title',
          content: this.videoObject ? `${this.videoObject.title} on How To Fix Democracy` : 'Watch | How To Fix Democracy'
        },
        {
          vmid: 'og:description',
          property: 'og:description',
          content: this.videoObject && this.videoObject.transcript ? this.videoObject.transcript : utils.getDefaultDescription()
        }
      ]
    }
  }
}
</script>

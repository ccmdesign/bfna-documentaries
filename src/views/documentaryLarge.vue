<template>
  <div class="homepage">
    <h1 class="sr-only">{{ currentVideo.title }}</h1>
    <div
      class="homepage__slider__background--large"
      :style="`background-image: url('${currentVideo.backgroundImage}')`"
    ></div>
    <VideoDescription open="true" />
    <navigation-bar />
    <menu-ui />
    <div class="homepage__list-bar" :class="{ animated : animate }">
      <div class="video-list__screenings-section" v-if="currentVideo.screenings && currentVideo.screenings.length > 0">
        <h2 class="section-title">Upcoming Screenings</h2>
        <div class="screenings-list">
          <div class="screening-card" v-for="screen in currentVideo.screenings" :key="screen.id">
            <div class="screening-card__info">
              <div class="screening-card__title">
                <span class="screening-card__badge screening-card__badge--available" v-if="screen.availability">Available</span>
                <span class="screening-card__badge screening-card__badge--soldout" v-else>Sold out</span>
                <p class="screening-card__day">{{ new Date(screen.dateStart).getUTCDate() }}</p>
                <div class="screening-card__datebox">
                  <p class="screening-card__month">
                    {{ monthNames[new Date(screen.dateStart).getUTCMonth()] }}
                  </p>
                  <p class="screening-card__hours">
                    {{ gimmeHours(new Date(screen.dateStart)) }} - {{ gimmeHours(new Date(screen.dateEnd)) }} 
                  </p>
                </div>
              </div>
              <div class="screening-card__description">
                <a :href="screen.estabilishmentURL" target="_blank" class="screening-card__estabilishment" v-if="screen.estabilishmentURL">{{ screen.estabilishment }}</a>
                <p class="screening-card__estabilishment" v-else>{{ screen.estabilishment }}</p>
                <p class="screening-card__place">{{ screen.place }}</p>
              </div>
            </div>
            <div class="screening-card__link">
              <a :href="screen.ticketsURL" target="_blank" class="screening-card__button" v-if="screen.availability">Get tickets</a>
              <a class="screening-card__button screening-card__button--disabled" disabled v-else>Sold out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.video-list__screenings-section {
  padding-bottom: 128px;
}

.screenings-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}

.screening-card {
  background: #0B0D0E;
  box-shadow: 4px 4px 4px 0px rgba(0,0,0,0.2);
  padding: 0;
  color: #EAEBED;
}

  .screening-card__info {
    padding: 24px 24px 40px;
    border-bottom: 2px dashed #282F3A;
  }

  .screening-card__title {
    position: relative;
    padding-bottom: 24px;
    border-bottom: 1px solid #282F3A;
    display: flex;
    p {
      margin: 0;
    }
    .screening-card__day {
      margin-right: 24px;
    }
  }

  .screening-card__badge {
    position: absolute;
    top: 0;
    right: 0;
    color: #FFF;
    font-size: 0.75em;
    font-weight: 700;
    text-transform: uppercase;
    &.screening-card__badge--available {
      color: #3CFF95;
    }
    &.screening-card__badge--soldout {
      color: #FF8979;
    }
  }

  .screening-card__datebox {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }

  .screening-card__day {
    font-weight: 700;
    font-size: 3.5em;
    line-height: 1em;
  }

  .screening-card__month {
    color: #D2D4DA;
    font-weight: 700;
    font-size: 1.125em;
    letter-spacing: 0.02em;
  }

  .screening-card__hours {
    font-weight: 700;
    font-size: 1.125em;
    letter-spacing: 0.02em;
  }

  .screening-card__description {
    padding-top: 24px;
    p {
      margin: 0;
    }
  }

  .screening-card__estabilishment {
    font-weight: bold;
    color: #EAEBED;
    &:hover, &:focus, &:active {
      color: #EAEBED;
    }
  }

  .screening-card__place {
    font-weight: 400;
    color: #D2D4DA;
  }

  .screening-card__link {
    padding: 24px;
    display: flex;
    justify-content: center;
  }

  .screening-card__button {
    display: block;
    width: 180px;
    height: 46px;
    line-height: 46px;
    text-transform: uppercase;
    font-weight: 700;
    border: 3.125px solid #C2C5CD;
    text-align: center;
    box-sizing: content-box;
    &:not(.screening-card__button--disabled) {
      color: #FCFCFC;
      &:hover, &:focus, &:active {
        outline: none;
        text-decoration: none;
        color: #000;
        background: #FCFCFC;
        border-color: #FCFCFC;
      }
    }
    &.screening-card__button--disabled {
      color: #D2D4DA;
      border-color: #676A73;
    }
  }

.section-title {
  color: #FFF;
  size: 2.5em;
  font-weight: bold;
  margin-bottom: 42px;
}

.homepage {
  position: relative;
  width: 100%;
  height: 100vh;

  &__slider {
    width: 100%;
    height: 100vh;
  }

  &__list-bar {
    width: 100%;
    z-index: 100;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    padding: 0 170px;
    position: relative;
    &.animated {
      opacity: 1;
    }

    &.opened {
      background-color: #01121ad9;
    }

    &__section {
      display: block;
      width: 100%;

      &.button-section {
        position: relative;
        text-align: center;
        height: 60px;
      }

      &.videos-section {
        overflow-y: hidden;
        transition: max-height 0.33s ease-in-out;

        &.closed {
          max-height: 0 !important;

          .child {
            opacity: 0;
          }
        }

        .child {
          opacity: 1;
          transition: opacity 0.33s ease-in-out;
        }
      }
    }

    &__button {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      padding: 12px;
      cursor: pointer;
      transition: all 0.33s ease-in-out;
      &:before {
        content: attr(data-text);
        font-size: 1.5rem;
        font-weight: bold;
        text-transform: uppercase;
      }
      &.opened {
        transform: translate(-50%, -50%) rotateZ(179deg) scale(1.2);
        &:before {
          @extend .material-icons;
          width: 24px;
        }
      }
    }

    &__by {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      font-size: 0.75em;
      opacity: 0.33;
      color: rgba(255, 255, 255, 0.33);

      a:hover {
        text-decoration: none;
      }
    }
  }

  &__controls {
    z-index: 2;
    @extend .material-icons;
    position: absolute;
    background-color: #08415c;
    padding: 12px;
    font-size: 36px;
    box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
    top: 66%;
    cursor: pointer;
    user-select: none;
    transition: opacity 0.33s ease-in-out, transform 0.33s ease-in-out;

    &.hidden {
      opacity: 0;
    }

    &--left {
      left: 0;
      margin-left: 28px;

      &.hidden {
        transform: translateX(-50px) translateY(5px);
      }
    }

    &--right {
      right: 0;

      &.hidden {
        transform: translateX(50px) translateY(5px);
      }
    }
  }
}
</style>

<script>
import Slide from "@/components/HomepageUILarge/Slide";
import VideoList from "@/components/HomepageUILarge/VideoList";
import NavigationBar from "@/components/HomepageUILarge/NavigationBar";
import MenuUI from "@/components/HomepageUILarge/Menu";
import VideoDescription from "@/components/HomepageUILarge/VideoDescription";

export default {
  name: "documentaryLarge",
  components: {
    Slide,
    VideoList,
    NavigationBar,
    "menu-ui": MenuUI,
    VideoDescription,
  },
  data() {
    return {
      videoListMenu: false,
      videoListHeight: 0,
      animate: false,
      monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
  },
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
    onPageChange(newSlide) {
      this.setCurrentVideo(newSlide);
    },
    setCurrentVideo(index) {
      this.$store.commit("setCurrentVideo", index);
    },
    toggleVideoList() {
      this.videoListMenu = !this.videoListMenu;
    },
    closeVideoList() {
      this.videoListMenu = false;
    },
    getButtonText() {
      if(this.videoListMenu) {
        return 'keyboard_arrow_upward'
      } else {
        return 'All Films'
      }
    },
    gimmeHours(date) {
      return date.getHours() + ":" + ('0' + date.getMinutes()).slice(-2);
    }
  },
  mounted() {
    this.animate = true;
  },
};
</script>

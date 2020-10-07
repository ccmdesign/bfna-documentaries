<template>
  <div
    class="menu-large"
    :class="{ hidden: !hasMenu }"
    @click="closeMenu(true, $event)"
  >
    <div class="menu-large__content">
      <div class="menu-large__close" @click="closeMenu(false, $event)">
        close
      </div>
      <ul class="menu-large__list">
        <router-link tag="li" to="/about">About</router-link>
        <router-link tag="li" to="/host">Host</router-link>
      </ul>
      <div class="menu-large__section-wrapper">
        <h4 class="menu-large__section-title">Newsletter</h4>
        <p class="menu-large__section-description">
          Subscribe to our newsletter.
        </p>
        <newsletter-subscription />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-large {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;

  &__section {
    &-wrapper {
      color: #ffffff;
      font-size: 1em;
      padding: 20px 24px;
      text-align: right;

      @include media-breakpoint-large {
        padding: 20px 64px 20px 64px;
      }
    }

    &-title {
      color: #fc8b00;
      letter-spacing: 3.7px;
      line-height: 20px;
      text-transform: uppercase;
      user-select: none;
    }

    &-description {
      font-weight: 300;
      letter-spacing: 0.3px;
      user-select: none;
    }
  }

  &.hidden {
    pointer-events: none;

    .menu-large__content {
      transform: translateX(-100%);
    }
  }

  &__close {
    @extend .material-icons;
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background-color: #fc8b00;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.13s ease-in-out;

    &:hover {
      background-color: lighten(#fc8b00, 5);
    }
  }

  &__content {
    position: absolute;
    width: 25%;
    height: 100%;
    left: 0;
    bottom: 0;
    padding: 90px 0;
    text-align: right;
    background-color: rgba(0, 0, 0, 0.9);
    transition: transform 0.33s ease-in-out;
    z-index: 10;

    li {
      color: #ffffff;
      font-size: 1.25em;
      font-weight: 300;
      letter-spacing: 3.7px;
      line-height: 20px;
      padding: 20px 64px 20px 16px;
      cursor: pointer;
      user-select: none;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
  }
}
</style>

<script>
import NewsletterSubscription from "../NewsletterSubscription";
import utils from "../../utils";

export default {
  components: { NewsletterSubscription },
  data() {
    return {
      newsletterSubscribed: 0,
      newsletterFeedback: "",
    };
  },
  computed: {
    hasMenu() {
      return this.$store.state.menuVisibility;
    },
  },
  methods: {
    setMenuVisibility(menuVisibility) {
      if (menuVisibility) {
        this.newsletterFeedback = "";
      }
      this.$store.commit("setMenuVisibility", menuVisibility);
    },
    closeMenu(ifBackground, event) {
      if (ifBackground && !event.target.classList.contains("menu-large")) {
        return;
      }
      this.setMenuVisibility(false);
    },
    submitNewsletter(event) {
      event.preventDefault();
      utils.registerNewsletter(
        this.$refs.newsletter_name,
        this.$refs.newsletter_email,
        (pairs) => {
          for (const pair of pairs) {
            this[pair[0]] = pair[1];
          }
        }
      );
    },
  },
};
</script>

<template>
  <div
    class="menu-small"
    :class="{ hidden: !hasMenu }"
    @click="closeMenu(true, $event)"
  >
    <div class="menu-small__content" ref="menuContent">
      <div class="menu-small__section-wrapper">
        <h4 class="menu-small__section-title">Newsletter</h4>
        <p
          class="menu-small__section-description"
          v-show="newsletterSubscribed === 0"
        >
          Subscribe to our newsletter.
        </p>
        <newsletter-subscription />
      </div>
      <div class="menu-small__section-wrapper">
        <h4 class="menu-small__section-title">Navigation</h4>
      </div>
      <ul class="menu-small__list">
        <router-link tag="li" to="/about">About</router-link>
        <router-link tag="li" to="/host">Host</router-link>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-small {
  position: fixed;
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
      text-align: center;

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

    .menu-small__content {
      transform: translateY(100%);
    }
  }

  &__content {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 64px 0 128px 0;
    background-color: rgba(0, 0, 0, 0.95);
    transition: transform 0.33s ease-in-out;
    overflow: auto;
    max-height: 100%;

    &::after {
      position: fixed;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 96px;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.33) 16.67%,
        rgba(0, 0, 0, 0.75) 100%
      );
    }

    li {
      color: #ffffff;
      font-size: 1.25em;
      font-weight: 300;
      letter-spacing: 3.7px;
      line-height: 20px;
      padding: 20px 64px;
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
  watch: {
    hasMenu(oldValue, newValue) {
      if (newValue) {
        this.scrollToBottom();
      }
    },
  },
  methods: {
    setMenuVisibility(menuVisibility) {
      this.$store.commit("setMenuVisibility", menuVisibility);
    },
    closeMenu(ifBackground, event) {
      if (ifBackground && !event.target.classList.contains("menu-small")) {
        return;
      }
      this.setMenuVisibility(false);
    },
    scrollToBottom() {
      this.$refs.menuContent.scrollTo(0, this.$refs.menuContent.scrollHeight);
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
  mounted() {
    this.scrollToBottom();
  },
};
</script>

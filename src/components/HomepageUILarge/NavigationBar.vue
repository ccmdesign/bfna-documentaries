<template>
  <div class="large-navigation-bar" :class="{ hasMenu }">
    <div class="large-navigation-bar__button-wrapper" @click="toggleMenu">
      <div class="large-navigation-bar__button">menu</div>
    </div>
    <ul class="large-navigation-bar__menu">
      <!-- <router-link tag="li" to="/about">About</router-link>
      <router-link tag="li" to="/host">Host</router-link> -->
      <li><a href="https://www.bfna.org">Visit Our Homepage</a></li>
    </ul>
  </div>
</template>

<style lang="scss">
.large-navigation-bar {
  z-index: 2;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 60px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  transition: transform 0.33s ease-in-out;
  border-right: solid 1px grey;

  &.hasMenu {
    transform: translateX(-100%);
  }

  &__button {
    @extend .material-icons;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.13s ease-in-out;
    border-bottom: solid 1px grey;

    &:hover {
      background-color: lighten(#08415C, 5);
    }

    &-wrapper {
      flex: 0;
    }
  }

  &__menu {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    transform-origin: left top;
    transform: rotate(-90deg);
    margin-top: 60vh;
    width: 450px;

    @media (min-width: 100em) {
      margin-top: 331px;
    }

    li {
      display: inline-block;
      line-height: 60px;
      padding: 0 32px;
      cursor: pointer;
      font-weight: bold;
      letter-spacing: 1.48px;
      text-transform: uppercase;
      transition: background-color 0.13s ease-in-out;

      @media (min-width: 100em) {
        padding: 0 64px;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.4);
      }

      &:first-child {
        margin-right: 16px;
      }

      &:last-child {
        margin-left: 16px;
      }

      & > a {
        color: inherit;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>

<script>
export default {
  computed: {
    hasMenu () {
      return this.$store.state.menuVisibility
    }
  },
  methods: {
    toggleMenu () {
      this.$store.commit('setMenuVisibility', !this.hasMenu)
    }
  }
}
</script>

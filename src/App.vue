<template>
  <div id="app">
    <router-view />
    <menu-ui v-if="getUIType() === 'small'" />
    <mobile-navigation v-if="getUIType() === 'small'" />
    <!-- Mobile navigation -->
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  @import url("https://use.typekit.net/tsd2tcy.css");
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

<script>
import MobileNavigation from "@/components/HomepageUISmall/NavigationBar";
import MenuUI from "@/components/HomepageUISmall/Menu";

export default {
  components: { MobileNavigation, "menu-ui": MenuUI },
  methods: {
    getUIType() {
      return document.documentElement.clientWidth >= 768 ? "large" : "small";
    },
  },
};
</script>

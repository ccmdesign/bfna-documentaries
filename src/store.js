import Vue from 'vue'
import Vuex from 'vuex'
import ContentfulVue from 'contentful-vue'

Vue.use(Vuex)
Vue.use(ContentfulVue, {
  space: 'sskjmxwce76z',
  accessToken: 'dcyMYpzq-OPLZ_OlZMtdVVPGoULhPI9pJ3YacXN-ypo'
})

const store = new Vuex.Store({
  state: {
    currentVideo: 0,
    videoList: [],
    navigation: true,
    homepageVideoEffect: false,
    menuVisibility: false,
    // showSuggestedTweetOnHomepage: false
  },
  mutations: {
    setCurrentVideo (state, index) {
      state.currentVideo = index > state.videoList.length || index < 0 ? 0 : index
    },
    setNavigation (state, navigation) {
      state.navigation = navigation
    },
    setHomepageVideoEffect (state, homepageVideoEffect) {
      state.homepageVideoEffect = homepageVideoEffect
    },
    setMenuVisibility (state, menuVisibility) {
      state.menuVisibility = menuVisibility
    },
    setVideoList (state, videoList) {
      state.videoList = videoList
    },
    // setSuggestedTweetHomepageVisibility (state, suggestedTweetVisibility) {
    //   state.showSuggestedTweetOnHomepage = suggestedTweetVisibility
    // }
  },
  getters: {
    hasVideos (state) {
      return state.videoList && state.videoList.length > 0
    },
    emptyEpisode () {
      return {
        // order: -1,
        // season: -1,
        // videoUrl: '',
        // title: '',
        // description: '',
        // authors: [],
        // googlePodcastsUrl: '',
        // itunesUrl: '',
        // spotifyUrl: '',
        // suggestedTweet: '',
        // transcript: '',
        // tags: []
        title: '',
        subtitle: '',
        description: '',
        videoUrl: '',
        workstream: '',
        backgroundImage: ''
      }
    }
  }
})

export default store

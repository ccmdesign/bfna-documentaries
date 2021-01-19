import axios from "axios";

const defaultDescription = 'Our documentary films provide an intimate portrait of the economic, political, and social challenges facing the United States and Europe today.'
const defaultTitle = 'Bertelsmann Foundation Documentaries | Films for Transatlanticists'

const _default = {
  getVideoIdFromYoutubeUrl: function (videoUrl) {
    const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
    const results = regex.exec(videoUrl);
    return results.length > 1 ? results[1] : null;
  },
  getDefaultDescription: function () {
    return defaultDescription;
  },
  getDefaultTitle: function () {
    return defaultTitle;
  },
};

export default _default;

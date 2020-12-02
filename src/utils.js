import axios from "axios";

const defaultDescription = "[Set default description here.]";

const _default = {
  getVideoIdFromYoutubeUrl: function (videoUrl) {
    const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
    const results = regex.exec(videoUrl);
    return results.length > 1 ? results[1] : null;
  },
  getDefaultDescription: function () {
    return defaultDescription;
  },
};

export default _default;

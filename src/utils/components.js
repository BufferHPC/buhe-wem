import pureImage from "../common-cms-component/pure-image.vue";
import pureText from "../common-cms-component/pure-text.vue";
import imageText from "../common-cms-component/image-text.vue";
const compLists = {
  install: function(Vue) {
    Vue.component("pureImage", pureImage);
    Vue.component("pureText", pureText);
    Vue.component("imageText", imageText);
  }
};
export default compLists;

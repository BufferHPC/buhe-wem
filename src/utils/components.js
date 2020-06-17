import pureImage from "../common-cms-component/pure-image.vue";
import pureText from "../common-cms-component/pure-text.vue";
import imageText from "../common-cms-component/image-text.vue";
import cmsVideo from "../common-cms-component/cms-video.vue";
import linkVideo from "../common-cms-component/link-video.vue";
const components = [pureImage, pureText, imageText, cmsVideo, linkVideo];
const compLists = {
  install: function(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
export default compLists;

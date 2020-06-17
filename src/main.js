import Vue from "vue";
import App from "./App.vue";
// 状态管理器
import store from "./store";
// 饿了么基础UI库
import ElementUI from "element-ui";
// 基于饿了么UI form表单库
import EleForm from "vue-ele-form";
// 基础配置文件，配置项目引用工具集（文件上传、视频图片管理等等）
import "./extend";
// 代码显示面板插件相关配置
import codemirrorConfig from "./extend/codemirror";
// 服务器保存数据相关接口
import "@/helpers/api";
// css样式
import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";

//图片懒加载
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload);

// or with options
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  attempt: 1
});

import components from "@/utils/components.js";
import "video.js/dist/video-js.css";
Vue.use(components);

import VideoPlayer from "vue-video-player";

Vue.use(VideoPlayer);

// 插件
Vue.use(EleForm, {
  upload: {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    responseFn(response) {
      // 因为是 mock 地址, 所以, 总是返回同一张图片的URL, 正常使用的时候不会
      return response.url;
    }
  },
  "upload-file": {
    responseFn(response, file) {
      return {
        name: file.name,
        url: URL.createObjectURL(file.raw),
        size: file.size
      };
    }
  },
  codemirror: codemirrorConfig,
  bmap: {
    ak: "9YLHZRPvUNLhi34Oh2ojqeGSpzCf1rVG"
  }
});
Vue.use(ElementUI);

// 配置
Vue.config.productionTip = false;

// 实例化
const appVueOptions = {
  store,
  render: h => h(App)
};

const isLab = process.env.VUE_APP_IS_LAB;
if (!isLab) {
  new Vue(appVueOptions).$mount("#app");
}

// 支持Vue组件形式导出整个应用
export default appVueOptions;

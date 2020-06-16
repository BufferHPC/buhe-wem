const config = {
  url: "https://baidu.com",
  type: "pureImage",
  _type: "pure-image",
  attrs: {
    width: {
      type: "input",
      label: "图片宽度百分比",
      attrs: {
        type: "number",
        min: 1,
        max: 100,
        step: 1
      },
      tip: "默认值为auto"
    },
    paddingT: {
      type: "input",
      label: "上下内边距",
      attrs: {
        type: "number",
        min: 0,
        step: 1
      },
      tip: "默认值为auto"
    },
    paddingL: {
      type: "input",
      label: "左右内边距",
      attrs: {
        type: "number",
        min: 0,
        step: 1
      },
      tip: "默认值为auto"
    },
    animation: {
      type: "select",
      label: "动画类型",
      options: [{ text: "默认", value: null }, "hover-move"]
    }
  },
  attrsData: {},
  attrsDefaultData: {
    paddingT: "0",
    paddingL: "0",
    width: 100,
    animation: "",
    url: require("@/assets/timg.jpg")
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
};
export default config;

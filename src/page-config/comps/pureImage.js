const config = {
  url: "https://baidu.com",
  type: "pureImage",
  _type: "pure-image",
  attrs: {
    imageWidth: {
      type: "input",
      label: "图片宽度",
      attrs: {
        type: "number",
        min: 0,
        step: 1
      },
      tip: "默认值为auto"
    },
    imageHeight: {
      type: "input",
      label: "图片高度",
      attrs: {
        type: "number",
        min: 0,
        step: 1
      },
      tip: "默认值为auto"
    }
  },
  attrsData: {},
  attrsDefaultData: {
    height: 122,
    width: 184,
    url: require("@/assets/timg.jpg")
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
};
export default config;

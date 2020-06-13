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
    }
  },
  attrsData: {},
  attrsDefaultData: {
    height: 122,
    width: 100,
    url: require("@/assets/timg.jpg")
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
};
export default config;

const config = {
  url: "https://baidu.com",
  type: "linkVideo",
  _type: "link-video",
  attrs: {
    videoDesc: {
      type: "input",
      label: "视频描述"
    },
    height: {
      type: "input",
      label: "文本容器高度",
      attrs: {
        type: "number",
        min: 30,
        step: 1
      }
    },
    lineHeight: {
      type: "input",
      label: "文本行高",
      attrs: {
        type: "number",
        min: 30,
        step: 1
      }
    },
    marginBottom: {
      type: "input",
      label: "下边距",
      attrs: {
        type: "number",
        min: 0,
        step: 1
      }
    },
    fontSize: {
      type: "input",
      label: "文字大小",
      attrs: {
        type: "number",
        min: 1,
        step: 1
      }
    },
    fontWeight: {
      type: "input",
      label: "文字粗细",
      attrs: {
        type: "number",
        min: 100,
        max: 900,
        step: 100
      }
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
    justifyContent: {
      type: "radio",
      default: "flex-start",
      label: "文本位置",
      options: [
        {
          text: "左对齐",
          value: "flex-start"
        },
        {
          text: "居中",
          value: "center"
        },
        {
          text: "右对齐",
          value: "flex-end"
        }
      ]
    },
    src: {
      type: "input",
      label: "视频地址"
    }
  },
  attrsData: {},
  attrsDefaultData: {
    videoDesc: "点击观看视频",
    color: "#000000",
    fontSize: "12",
    height: "30",
    lineHeight: "30",
    paddingT: "30",
    paddingL: "30",
    marginBottom: "0",
    fontWeight: "300",
    justifyContent: "flex-start",
    src: require("@/assets/videos/flexpai_cpys.mp4")
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
};
export default config;

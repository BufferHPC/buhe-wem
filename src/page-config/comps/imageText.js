const config = {
  url: "https://baidu.com",
  type: "pureImage",
  _type: "image-text",
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

    animation: {
      type: "select",
      label: "动画类型",
      options: [
        {
          text: "默认",
          value: null
        },
        "hover-move"
      ]
    },
    warpperHeight: {
      type: "input",
      label: "容器高度",
      attrs: {
        type: "number",
        min: 1,
        step: 1
      },
      tip: "默认值为auto"
    },
    text: {
      type: "input",
      label: "文本内容"
    },
    lineHeight: {
      type: "input",
      label: "文本行高",
      attrs: {
        type: "number",
        min: 12,
        step: 1
      }
    },
    top: {
      type: "input",
      label: "文本上距",
      attrs: {
        type: "number",
        min: 0,
        step: 1
      }
    },
    left: {
      type: "input",
      label: "文本左距",
      attrs: {
        type: "number",
        min: 0,
        step: 1
      }
    },
    textWidth: {
      type: "input",
      label: "文本宽度",
      attrs: {
        type: "number",
        min: 1,
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
    justifyContent: {
      type: "radio",
      default: "flex-start",
      label: "图片左右位置",
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
    alignItem: {
      type: "radio",
      default: "flex-start",
      label: "图片上下位置",
      options: [
        {
          text: "上对齐",
          value: "flex-start"
        },
        {
          text: "居中",
          value: "center"
        },
        {
          text: "下对齐",
          value: "flex-end"
        }
      ]
    },
    textAlign: {
      type: "radio",
      default: false,
      label: "文本位置",
      options: [
        {
          text: "左对齐",
          value: "left"
        },
        {
          text: "居中",
          value: "center"
        },
        {
          text: "右对齐",
          value: "right"
        }
      ]
    }
  },
  attrsData: {},
  attrsDefaultData: {
    width: "100",
    url: require("@/assets/timg.jpg"),
    text: "这是一个图片文本",
    fontSize: "12",
    lineHeight: "12",
    color: "#000000",
    textWidth: "30",
    warpperHeight: "auto",
    textAlign: "left",
    justifyContent: "flex-start",
    alignItem: "flex-start",
    animation: "",
    top: "0",
    left: "0",
    fontWeight: "300"
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
};
export default config;

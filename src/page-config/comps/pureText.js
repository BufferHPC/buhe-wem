const config = {
  url: "https://baidu.com",
  type: "pureText",
  _type: "pure-text",
  attrs: {
    text: {
      type: "input",
      label: "文本内容"
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
    justifyContent: {
      type: "radio",
      default: false,
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
    }
  },
  attrsData: {},
  attrsDefaultData: {
    text: "这是一个纯文本",
    color: "#000000",
    fontSize: "12",
    height: "30",
    marginBottom: "0",
    fontWeight: "300",
    justifyContent: "flex-start"
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
};
export default config;

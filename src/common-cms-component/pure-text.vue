<template>
  <div
    ref="text"
    class="text-warpper"
    :id="id"
    :style="{
      height: computedPix(height),
      lineHeight: computedPix(lineHeight),
      fontSize: computedPix(fontSize),
      fontWeight: fontWeight,
      color: color,
      marginBottom: computedPix(marginBottom),
      justifyContent: justifyContent
    }"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "pureText",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    containerWidth: {
      type: Number,
      default: null
    },
    text: {
      type: String,
      default: "这是一个纯文本"
    },
    id: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#000000"
    },
    fontSize: {
      type: String,
      default: "12"
    },
    height: {
      type: String,
      default: "30"
    },
    lineHeight: {
      type: String,
      default: "30"
    },
    marginBottom: {
      type: String,
      default: "0"
    },
    fontWeight: {
      type: String,
      default: "30"
    },
    justifyContent: {
      type: String,
      default: "flex-start"
    }
  },
  mounted: function() {
    this.reSizeFont();
  },
  methods: {
    computedPix(data) {
      return data + "px";
    },
    reSizeFont() {
      let div = this.$refs.text;
      let fontSize = parseInt(div.style.fontSize);
      let height = parseInt(div.style.height);
      let fullScreenWidth = document.body.clientWidth;
      let containerWidth = this.containerWidth
        ? this.containerWidth
        : fullScreenWidth;
      let scale = containerWidth / fullScreenWidth;
      div.style.fontSize = Math.round(fontSize * scale) + "px";
      div.style.height = Math.round(height * scale) + "px";
      if (containerWidth < 768) {
        div.style.lineHeight = "16px";
        div.style.height = "auto";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.text-warpper {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>

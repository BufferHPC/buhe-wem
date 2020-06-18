<template>
  <div
    ref="image_text"
    class="tex-pictrue-wrapper"
    :class="animation"
    :style="{
      justifyContent: justifyContent,
      alignItems: alignItem,
      height: computedPix(warpperHeight, 'px')
    }"
  >
    <div :style="{ width: computedPix(width, '%') }">
      <img class="picture" v-lazy="url" width="100%" alt="demo" />
    </div>
    <div
      ref="text"
      class="text-warpper"
      v-html="text"
      :style="{
        width: computedPix(textWidth, 'px'),
        lineHeight: computedPix(lineHeight, 'px'),
        color: color,
        top: computedPix(top, '%'),
        left: computedPix(left, '%'),
        fontSize: computedPix(fontSize, 'px'),
        fontWeight: fontWeight,
        textAlign: textAlign
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "imageText",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    containerWidth: {
      type: Number,
      default: null
    },
    url: {
      type: String,
      default: require("@/assets/timg.jpg")
    },
    width: {
      type: String,
      default: "100"
    },
    lineHeight: {
      type: String,
      default: "18"
    },
    justifyContent: {
      type: String,
      default: "flex-start"
    },
    alignItem: {
      type: String,
      default: "flex-start"
    },
    color: {
      type: String,
      default: "#000000"
    },
    warpperHeight: {
      type: String,
      default: "auto"
    },
    text: {
      type: String,
      default: "这是一个图片文本"
    },
    animation: {
      type: String,
      default: ""
    },
    fontSize: {
      type: String,
      default: "12"
    },
    textWidth: {
      type: String,
      default: "200"
    },
    top: {
      type: String,
      default: "0"
    },
    left: {
      type: String,
      default: "0"
    },
    fontWeight: {
      type: String,
      default: "30"
    },
    textAlign: {
      type: String,
      default: "left"
    }
  },
  data() {
    return {};
  },
  watch: {
    fontSize() {
      this.reSizeFont();
    },
    warpperHeight() {
      this.reSizeFont();
    }
  },
  mounted: function() {
    this.reSizeFont();
  },
  methods: {
    computedPix(data, sufix) {
      return data + sufix;
    },
    reSizeFont() {
      // debugger;
      let div = this.$refs.text;
      let image = this.$refs.image_text;
      let fontSize = parseInt(this.fontSize);
      let height = parseInt(this.warpperHeight);
      let fullScreenWidth = document.body.clientWidth;
      let containerWidth = this.containerWidth
        ? this.containerWidth
        : fullScreenWidth;
      let scale = containerWidth / fullScreenWidth;
      setTimeout(function() {}, 50);
      div.style.fontSize = Math.round(fontSize * scale) + "px";
      image.style.height = Math.round(height * scale) + "px";
      if (containerWidth < 768) {
        div.style.lineHeight = "16px";
        image.style.height = "auto";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tex-pictrue-wrapper {
  // background: #fff;
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  // box-shadow: 0px 4px 20px 0px rgba(28, 41, 47, 0.16);
  &.hover-move:hover {
    transition: all 0.2s linear;
    transform: translateY(-4px);
  }
}
.text-warpper {
  width: 15px;
  position: absolute;
  top: 0;
}
.picture-wrapper {
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="tex-pictrue-wrapper">
    <div
      class="picture-wrapper"
      :style="{
        width: computedPix(width, '%'),
        height: computedPix(warpperHeight, 'px')
      }"
    >
      <img
        class="picture"
        :class="animation"
        :src="url"
        width="100%"
        alt="demo"
      />
    </div>
    <div
      class="text-warpper"
      :style="{
        width: computedPix(textWidth, 'px'),
        top: computedPix(top, '%'),
        left: computedPix(left, '%'),
        fontSize: computedPix(fontSize, 'px'),
        fontWeight: fontWeight,
        textAlign: textAlign
      }"
    >
      {{ text }}
    </div>
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
    url: {
      type: String,
      default: require("@/assets/timg.jpg")
    },
    width: {
      type: Number,
      default: 100
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
  methods: {
    computedPix(data, sufix) {
      return data + sufix;
    }
  }
};
</script>
<style lang="scss" scoped>
.tex-pictrue-wrapper {
  background: #fff;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
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
  .picture {
    box-shadow: 0px 4px 20px 0px rgba(28, 41, 47, 0.16);
    &.hover-move:hover {
      transition: all 0.2s linear;
      transform: translateY(-4px);
    }
  }
}
</style>

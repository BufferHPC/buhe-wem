<template>
  <div class="picture-wrapper" :style="{ width: computedPix(width, '%') }">
    <img class="picture" :src="url" width="100%" alt="demo" />
    <div
      class="text-warpper"
      :style="{
        width: computedPix(textWidth, 'px'),
        top: computedPix(top, 'px'),
        left: computedPix(left, 'px'),
        fontSize: computedPix(fontSize, 'px'),
        fontWeight: fontWeight
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
    text: {
      type: String,
      default: "这是一个图片文本"
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
.picture-wrapper {
  overflow: hidden;
  position: relative;
  .text-warpper {
    width: 15px;
    position: absolute;
    top: 0;
  }
}
</style>

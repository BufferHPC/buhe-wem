<template>
  <div
    ref="text"
    class="text-warpper"
    :style="{
      height: computedPix(height),
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
    text: {
      type: String,
      default: "这是一个纯文本"
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
  methods: {
    computedPix(data) {
      // let div = this.$refs.text;
      // let deviceWidth = parseInt(getComputedStyle(div).width);
      // let fullScreenWidth = document.body.clientWidth;
      // return Math.round(data * (deviceWidth / fullScreenWidth)) + "px";
      return data + "px";
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

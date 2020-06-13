<template>
  <div
    class="text-warpper"
    :style="{
      height: computedPix(height),
      fontSize: computedPix(fontSize),
      fontWeight: fontWeight,
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
    fontSize: {
      type: String,
      default: "12"
    },
    height: {
      type: String,
      default: "30"
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

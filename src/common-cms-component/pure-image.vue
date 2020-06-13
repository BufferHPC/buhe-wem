<template>
  <div class="picture-wrapper" :style="{ width: computedPix(width) }">
    <img class="picture" :src="url" width="100%" alt="demo" />
  </div>
</template>

<script>
export default {
  name: "pureImage",
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
    height: {
      type: Number,
      default: 122
    }
  },
  data() {
    return {};
  },
  methods: {
    computedPix(data) {
      return data + "%";
    }
  }
};
</script>
<style lang="scss" scoped>
.picture-wrapper {
  overflow: hidden;
}
</style>

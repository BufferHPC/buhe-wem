<template>
  <div class="picture-wrapper" :style="{ width: computedPix(width) }">
    <img
      class="picture"
      :class="animation"
      :src="url"
      width="100%"
      alt="demo"
    />
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
    animation: {
      type: String,
      default: ""
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
  .picture {
    box-shadow: 0px 4px 20px 0px rgba(28, 41, 47, 0.16);
    &.hover-move:hover {
      transition: all 0.2s linear;
      transform: translateY(-4px);
    }
  }
}
</style>

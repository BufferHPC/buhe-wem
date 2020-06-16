<template>
  <div
    class="picture-wrapper"
    :style="{ width: computedPix(width, '%'), padding: coputedPadding }"
  >
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
    paddingT: {
      type: String,
      default: "0"
    },
    paddingL: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      coputedPaddings: "0"
    };
  },
  computed: {
    coputedPadding() {
      debugger;
      return this.paddingT + "px" + " " + this.paddingL + "px";
    }
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
  .picture {
    box-shadow: 0px 4px 20px 0px rgba(28, 41, 47, 0.16);
    &.hover-move:hover {
      transition: all 0.2s linear;
      transform: translateY(-4px);
    }
  }
}
</style>

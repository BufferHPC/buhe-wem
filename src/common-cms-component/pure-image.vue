<template>
  <div>
    <img
      class="picture"
      :src="url"
      :width="computedPix(width)"
      :height="computedPix(height)"
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
    width: {
      type: Number,
      default: 184
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
      return data + "px";
    }
  }
};
</script>
<style lang="scss"></style>

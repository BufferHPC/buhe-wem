<template>
  <div>
    <img
      class="ad-image"
      src="@/assets/timg.jpg"
      :width="width"
      :height="height"
      alt="demo"
    />
  </div>
</template>

<script>
export default {
  name: "batchDialog",
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
      type: String,
      default: "184px"
    },
    height: {
      type: String,
      default: "122px"
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss"></style>

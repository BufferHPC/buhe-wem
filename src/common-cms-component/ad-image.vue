<template>
  <div>
    <img
      class="ad-image"
      :src="url"
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
      default:
        "https://www.goodfreephotos.com/cache/people/girls-sitting-on-a-rock-ledge_200_w200_h200_cw200_ch200_thumb.jpg?cached=1589851320"
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

<template>
  <div class="page-attr-config">
    <template v-if="isShow">
      <attrs-header :title="currentPageItem.type + '组件'" v-model="keyword" />
      <div>
        <ele-form
          :formData="currentPageItem.attrs"
          :formDesc="filterFormDesc"
          @input="updateFormAttrs"
          :formAttrs="{ size: 'small' }"
          :isShowBackBtn="false"
          :isShowSubmitBtn="false"
          :span="20"
          labelPosition="top"
        />
        <template v-if="hasUrl">
          <div class="el-row is-justify-center el-row--flex">
            <el-form ref="form" label-position="top" label-width="80px">
              <el-form-item label-width="180px" label="选择图片">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </div>
    </template>
    <div class="form-item-placeholder" v-else>从左侧拖拽添加表单项并点选</div>
  </div>
</template>

<script>
import configList from "@/page-config";
import { changeFormLabel } from "@/helpers/tool";
import searchMixin from "./components/searchMixin";
import AttrsHeader from "./components/attrs-header.vue";
import { mapGetters } from "vuex";

export default {
  name: "AppFormItemAttrs",
  mixins: [searchMixin],
  components: { AttrsHeader },
  data() {
    return {
      activeUrl: "",
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["currentPageItem"]),
    formDesc() {
      const formDesc = this.config.attrs || {};
      return changeFormLabel(formDesc);
    },
    config() {
      return configList[this.currentPageItem.type];
    },
    hasUrl() {
      console.log(this.currentPageItem);
      return Object.prototype.hasOwnProperty.call(
        this.currentPageItem.attrs,
        "url"
      );
    },
    isShow() {
      return this.currentPageItem && this.currentPageItem.attrs;
    }
  },
  methods: {
    mergeData(data, url) {
      return url ? Object.assign(data, { url: url }) : data;
    },
    updateFormAttrs(data) {
      debugger;
      let url = this.hasUrl
        ? this.activeUrl
          ? this.activeUrl
          : data.url
        : undefined;
      this.$store.commit(
        "updateCurrentPageItemAttrs",
        this.mergeData(data, url)
      );
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      this.activeUrl = file.url;
      this.$store.commit(
        "updateCurrentPageItemAttrs",
        this.mergeData(this.currentPageItem.attrs, this.activeUrl)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.page-attr-config {
  height: 100%;
  overflow: auto;
}
</style>

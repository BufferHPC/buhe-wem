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
        <template>
          <div class="el-row is-justify-center el-row--flex">
            <el-form
              class="el-20 el-col-20"
              ref="form"
              label-position="top"
              label-width="80px"
            >
              <el-form-item v-if="hasUrl" label-width="180px" label="选择图片">
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
              <el-form-item v-if="hasColor" label-width="100%" label="颜色">
                <el-input
                  v-model="activeColor"
                  @change="updatePageItem"
                  type="color"
                ></el-input>
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
      activeColor: "",
      fileList: [
        {
          name: "summary_1.png",
          url: require("@/assets/summary1.png")
        },
        {
          name: "summary_2.png",
          url: require("@/assets/summary2.jpg")
        },
        {
          name: "summary_3.png",
          url: require("@/assets/summary3.jpg")
        },
        {
          name: "summary_4.png",
          url: require("@/assets/summary4.jpg")
        },
        {
          name: "summary_5.gif",
          url: require("@/assets/summary5.gif")
        },
        {
          name: "summary_6.gif",
          url: require("@/assets/summary6.gif")
        },
        {
          name: "summary_bg001.jpg",
          url: require("@/assets/summarybg001.jpg")
        }
      ]
    };
  },
  created: function() {
    this.currentPageItem.attrs.color
      ? (this.activeColor = this.currentPageItem.attrs.color)
      : undefined;
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
    hasColor() {
      debugger;
      return Object.prototype.hasOwnProperty.call(
        this.currentPageItem.attrs,
        "color"
      );
    },
    isShow() {
      return this.currentPageItem && this.currentPageItem.attrs;
    }
  },
  methods: {
    mergeData(data, obj) {
      return obj ? Object.assign(data, obj) : data;
    },
    updateFormAttrs(data) {
      let url = this.hasUrl
        ? this.activeUrl
          ? this.activeUrl
          : data.url
        : undefined;
      let color = this.hasColor
        ? this.activeColor
          ? this.activeColor
          : data.color
        : undefined;
      if (url) {
        this.$store.commit(
          "updateCurrentPageItemAttrs",
          this.mergeData(data, { url: url })
        );
      }
      if (color) {
        this.$store.commit(
          "updateCurrentPageItemAttrs",
          this.mergeData(data, { color: color })
        );
      }
      if (!url && !color) {
        this.$store.commit("updateCurrentPageItemAttrs", data);
      }
    },
    updatePageItem(data) {
      debugger;
      let color = this.hasColor
        ? this.activeColor
          ? this.activeColor
          : data
        : undefined;
      this.$store.commit(
        "updateCurrentPageItemAttrs",
        this.mergeData(this.currentPageItem.attrs, { color: color })
      );
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      let url = (this.activeUrl = file.url);
      this.$store.commit(
        "updateCurrentPageItemAttrs",
        this.mergeData(this.currentPageItem.attrs, { url: url })
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

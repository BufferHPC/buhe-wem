<template>
  <div>
    <attrs-header
      url="https://www.yuque.com/chaojie-vjiel/vbwzgu/dyw8a7"
      title="页面配置"
      v-model="keyword"
    />
    <!-- <ele-form
      :formData="formAttr"
      @input="updateFormAttr"
      :form-desc="filterFormDesc"
      :formAttrs="{ size: 'small' }"
      :isShowBackBtn="false"
      :isShowSubmitBtn="false"
      :span="20"
      ref="ele-form"
      labelPosition="top"
    ></ele-form>-->
    <div class="el-row is-justify-center el-row--flex">
      <el-form
        class="el-20 el-col-20"
        ref="form"
        :model="form"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label-width="180px" label="SEO-Title">
          <el-input
            v-model="form.seo_title"
            @change="
              data => {
                updatePageDesc(data, 'seo_title');
              }
            "
            maxlength="100"
            :show-word-limit="true"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="SEO-Description">
          <el-input
            v-model="form.seo_desc"
            @change="
              data => {
                updatePageDesc(data, 'seo_desc');
              }
            "
            maxlength="100"
            :show-word-limit="true"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="SEO_Keywords">
          <el-input
            v-model="form.seo_keywords"
            @change="
              data => {
                updatePageDesc(data, 'seo_keywords');
              }
            "
            maxlength="100"
            :show-word-limit="true"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="180px" label="页面背景颜色（默认：白）">
          <el-input
            v-model="form.backgroundColor"
            @change="
              data => {
                updatePageDesc(data, 'backgroundColor');
              }
            "
            type="color"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { changeFormLabel } from "@/helpers/tool";
import searchMixin from "./components/searchMixin";
import AttrsHeader from "./components/attrs-header.vue";
import { mapGetters } from "vuex";

export default {
  name: "AppFormConfig",
  components: { AttrsHeader },
  mixins: [searchMixin],
  computed: {
    ...mapGetters(["currentPageAttr"]),
    pageAttr() {
      return _.cloneDeep(this.currentPageAttr);
    },
    formDesc() {
      return changeFormLabel(this.originDesc);
    }
  },
  methods: {
    updatePageAttr(data) {
      this.$store.commit("updateCurrentPageAttr", data);
    },
    updatePageDesc(data, key) {
      console.log(data);
      let obj = this.form;
      obj[key] = data;
      this.$store.commit("updateCurrentPageAttr", obj);
      // this.$store.commit("updateCurrentFormAttr", data);
    }
  },
  mounted: function() {
    debugger;
    this.form = this.pageAttr;
  },
  data() {
    return {
      form: {
        backgroundColor: "#ffffff",
        radio: 1,
        btnColor: "#000000",
        seo_desc: "柔宇",
        seo_title: "柔宇",
        seo_keywords: "柔宇"
      },
      originDesc: {}
    };
  }
};
</script>

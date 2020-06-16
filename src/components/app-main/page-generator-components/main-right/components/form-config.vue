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
      <el-form ref="form" :model="form" label-width="80px">
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
        <el-form-item label-width="180px" label="删除按钮颜色（默认：黑）">
          <el-input
            v-model="form.btnColor"
            @change="
              data => {
                updatePageDesc(data, 'btnColor');
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
    ...mapGetters(["currerntOriginFormAttr"]),
    formAttr() {
      return _.cloneDeep(this.currerntOriginFormAttr);
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
  data() {
    return {
      form: {
        backgroundColor: "#ffffff",
        btnColor: "#000000"
      },
      originDesc: {}
    };
  }
};
</script>

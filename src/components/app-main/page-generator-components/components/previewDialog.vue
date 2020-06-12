<template>
  <el-dialog
    append-to-body
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :title="currentNodeKey.split('&&&&')[0]"
    width="90%"
  >
    <!-- <h2 class="dtitle">{{currentNodeKey.split("&&&&")[1]}}</h2>
    <ele-form
      :formDesc="computedFormDesc"
      v-model="formData"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      :request-fn="handleRequest"
      @request-success="handleRequestSuccess"
      v-bind="formAttr"
    ></ele-form>-->
    <el-row :gutter="20">
      <template v-for="(item, index) of computedPageList">
        <el-col :key="item.field + index" :span="item.layout">
          <component :is="item._type" />
        </el-col>
      </template>
    </el-row>
  </el-dialog>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "previewDialog",
  props: {
    formDesc: {
      type: Object,
      default: () => ({})
    },
    currentPage: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  computed: {
    ...mapState([
      "pageProjectList",
      "currentPageIndex",
      "currentPageProjectIndex"
    ]),
    // tree key: project 名字 + form 名字
    computedProjectList() {
      return _.cloneDeep(this.pageProjectList).map(project => {
        project.key = project.name;
        project.pageList = project.pageList.map(page => {
          page.key = project.name + "&&&&" + page.name;
          return page;
        });
        return project;
      });
    },
    // 当前激活的 node 的 key
    currentNodeKey() {
      if (
        this.currentPageIndex !== null &&
        this.currentPageProjectIndex !== null
      ) {
        return this.computedProjectList[this.currentPageProjectIndex].pageList[
          this.currentPageIndex
        ].key;
      } else {
        return null;
      }
    },
    computedPageList() {
      return _.cloneDeep(this.currentPage).pageItemList;
    }
  },
  methods: {
    handleRequest(data) {
      // eslint-disable-next-line no-console
      console.log(data);
      return Promise.resolve(data);
    },
    handleRequestSuccess() {
      this.$message.success("发送成功");
    }
  }
};
</script>
<style lang="scss" scoped>
.dtitle {
  text-align: center;
  margin-bottom: 40px;
  color: #888;
}
</style>

<template>
  <el-dialog
    ref="dialog"
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
    <div
      :style="{ background: computedPageAttr.backgroundColor, padding: '20px' }"
    >
      <el-row :gutter="20">
        <template v-for="(item, index) of computedPageList">
          <el-col
            class="ad-image-container"
            :key="item.field + index"
            :span="item.layout"
          >
            <component
              :containerWidth="containerWidth"
              :is="item._type"
              v-bind="item.attrs"
            />
          </el-col>
        </template>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters } from "vuex";

export default {
  name: "previewDialog",
  props: {
    formDesc: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.computedWidth();
      }
    }
  },
  data() {
    return {
      containerWidth: null,
      formData: {}
    };
  },
  computed: {
    ...mapState([
      "pageProjectList",
      "currentPageIndex",
      "currentPageProjectIndex"
    ]),
    ...mapGetters(["currentPage"]),
    computedPageAttr() {
      return this.currentPage.pageAttr;
    },
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
    computedWidth() {
      let fullScreenWidth = document.body.clientWidth;
      let dialogWidth = this.$refs.dialog.width;
      if (dialogWidth.indexOf("%") > 0) {
        this.containerWidth = fullScreenWidth * (parseInt(dialogWidth) / 100);
      } else {
        this.containerWidth = parseInt(dialogWidth);
      }
    },
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
.ad-image-container {
  user-drag: element;
  display: flex;
  justify-content: center;
}
.dtitle {
  text-align: center;
  margin-bottom: 40px;
  color: #888;
}
</style>

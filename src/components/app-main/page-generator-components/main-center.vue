<template>
  <div
    class="app-main-center"
    :style="{ background: computedPageAttr.backgroundColor }"
  >
    <draggable
      :animation="200"
      v-if="isRenderFinish"
      :disabled="false"
      :list="currentPageItemList"
      @add="handleAdd"
      @end="handleMoveEnd"
      @start="handleMoveStart"
      group="web"
      tag="el-row"
      style="padding-bottom: 80px;"
    >
      <!-- 当为空时 -->
      <div
        class="form-area-placeholder"
        v-if="currentPageItemList.length === 0"
      >
        从左侧拖拽来添加表单项
      </div>
      <template v-else>
        <template v-for="(pageItem, index) of currentPageItemList">
          <el-col
            :gutter="20"
            :key="pageItem.field"
            :span="pageItem.layout"
            @click.native="handlePageItemClick(index)"
            class="ad-image-container"
            :class="{ 'form-item-active': currentPageItemIndex === index }"
          >
            <component :is="pageItem._type" v-bind="pageItem.attrs" />
            <!-- 删除按钮 -->
            <i
              @click.stop="handleDelete(index)"
              class="el-icon-delete form-item-delete-btn"
              v-if="currentPageItemIndex === index"
            ></i>
          </el-col>
        </template>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import _ from "lodash";
import { mapState, mapGetters } from "vuex";

export default {
  name: "AppMainCenter",
  components: {
    draggable
  },
  /*  watch:{
    currentPageItemList(val){
      console.log(val);
      debugger
    }
  }, */
  computed: {
    ...mapState([
      "currentPageItemIndex",
      "projectList",
      "currentFormIndex",
      "currentProjectIndex"
    ]),
    ...mapGetters([
      "currentPageItemAttrs",
      "currentFormDesc",
      "currentPage",
      "currentPageItemList"
    ]),
    computedPageAttr() {
      return this.currentPage.pageAttr;
    },
    // tree key: project 名字 + form 名字
    computedProjectList() {
      return _.cloneDeep(this.projectList).map(project => {
        project.key = project.name;
        project.formList = project.formList.map(form => {
          form.key = project.name + "&&&&" + form.name;
          return form;
        });
        return project;
      });
    },
    // 当前激活的 node 的 key
    currentNodeKey() {
      if (this.currentFormIndex !== null && this.currentProjectIndex !== null) {
        return this.computedProjectList[this.currentProjectIndex].formList[
          this.currentFormIndex
        ].key;
      } else {
        return null;
      }
    }
  },
  data() {
    return {
      isRenderFinish: false
    };
  },
  mounted() {
    // 确保渲染结束
    this.$nextTick(() => {
      this.isRenderFinish = true;
    });
    console.log("--------------");
    console.log(this.currentPageItemList);
  },
  methods: {
    // 通过index删除
    deleteItemByIndex(index) {
      this.$store.commit("deletePageItemByIndex", index);
    },

    // 通过index更新
    updateSelectIndex(index) {
      this.$store.commit("updatePageItemIndex", index);
    },
    // 删除
    handleDelete(index) {
      this.deleteItemByIndex(index);

      // 因为如果删除最后一个, 界面则无选中效果
      // 所以这里删除最后一个后, 重新选择最后一个
      if (index >= this.currentPageItemList.length) {
        this.updateSelectIndex(this.currentPageItemList.length - 1);
      }
    },
    // 新增
    handleAdd(res) {
      this.updateSelectIndex(res.newIndex);
      this.$store.commit(
        "updatePageCompCount",
        this.currentPageItemList[res.newIndex].type
      );
    },
    // 移动开始
    handleMoveStart(res) {
      this.updateSelectIndex(res.oldIndex);
    },
    // 移动结束
    handleMoveEnd(res) {
      this.updateSelectIndex(res.newIndex);
    },
    // 点击选中
    handlePageItemClick(index) {
      this.updateSelectIndex(index);
    }
  }
};
</script>

<style lang="scss">
.app-main-center {
  padding: 20px;
  .ad-image-container {
    /* position: absolute; */
    cursor: move;
    user-drag: element;
    display: flex;
    justify-content: center;
  }
  /* 当无表单时的占位 */
  .form-area-placeholder {
    width: 100%;
    height: 300px;
    line-height: 300px;
    background-color: white;
    color: #909399;
    text-align: center;
  }

  h3 {
    margin-bottom: 20px;
    font-size: 16px;
    color: #888;
  }
  h2 {
    text-align: center;
    margin-bottom: 40px;
    color: #666;
  }
  /* 表单项 */
  .form-item {
    background: white;
    cursor: move;
    position: relative;
    z-index: 1;
    padding: 0 20px;
    border: 1px dashed rgba(0, 0, 0, 0);

    &-active {
      border: 1px dashed #409eff;
    }

    /* 遮挡区(遮挡住) */
    &::after {
      content: " ";
      display: block;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      z-index: 2;
    }

    .form-item-delete-btn {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 3;
      cursor: pointer;
      padding: 7px 15px;
      color: white;
      background: #409eff;
    }
  }
}
</style>

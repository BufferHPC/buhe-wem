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
        <title>{{ computedPageAttr.seo_title }}</title>
        <meta name="description" :content="computedPageAttr.seo_desc" />
        <meta name="Keywords" :content="computedPageAttr.seo_keywords" />
        <template v-for="(pageItem, index) of currentPageItemList">
          <el-col
            :gutter="20"
            :key="pageItem.field"
            :span="pageItem.layout"
            @click.native="
              e => {
                handlePageItemClick(e, index);
              }
            "
            class="ad-image-container page-item"
            :class="{ 'form-item-active': currentPageItemIndex === index }"
          >
            <component
              :containerWidth="containerWidth"
              :id="pageItem.field"
              :is="pageItem._type"
              v-bind="pageItem.attrs"
            />
            <!-- 删除按钮 -->
            <i
              :style="{ color: computedPageAttr.btnColor }"
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
    containerWidth() {
      return parseInt(
        getComputedStyle(document.getElementsByClassName("app-main-center")[0])
          .width
      );
    },
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
    handlePageItemClick(e, index) {
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

  /* 表单项 */
  .page-item {
    cursor: move;
    position: relative;
    z-index: 1;
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

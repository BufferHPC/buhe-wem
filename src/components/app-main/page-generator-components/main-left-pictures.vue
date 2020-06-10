<template>
  <div class="app-main-left-components">
    <div class="search-comps">
      请拖拽组件到右侧配置页面
    </div>
    <div class="app-main-content">
      <draggable>
        <template v-for="item of filteredComps">
          <div :key="item.type" class="comp-item">
            <div class="comp-item-title">
              <i :class="item.icon" />
            </div>
            <div>{{ item.label }}</div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "AppMainLeftComponents",
  components: {
    draggable
  },
  data() {
    return {
      searchValue: "",
      filteredComps: [
        {
          type: "Text",
          icon:"el-icon-document",
          label: "纯文本组件"
        },{
          type: "Picture",
          icon:"el-icon-camera-solid",
          label: "纯图片组件"
        },{
          type: "Video",
          icon:"el-icon-video-camera-solid",
          label: "单视频组件"
        },{
          type: "TextPicture",
          icon:"el-icon-picture-outline-round",
          label: "图文组合组件"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.app-main-left-components {
  line-height: 1.2em;
  height: 100%;
  text-align: center;

  .search-comps {
    padding: 22px 0 20px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #888;
  }
  .app-main-content {
    padding-top: 10px;
  }

  .comp-item {
    width: 150px;
    color: #888;
    cursor: move;
    border: 1px solid #ebeef5;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
    border-radius: 3px;
    padding: 10px 5px;
    box-sizing: border-box;
    margin: 10px 5px;
    font-size: 12px;
    text-align: center;
    background: rgba(12, 105, 187, 0.1);

    .comp-item-title {
      font-weight: bold;
      font-size: 28px;
      color: #666;
      margin-bottom: 5px;
    }
  }
}
</style>

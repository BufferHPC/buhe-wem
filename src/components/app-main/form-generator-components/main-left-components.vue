<template>
  <div class="app-main-left-components">
    <div class="search-comps">
      <el-input clearable placeholder="请输入关键字查找组件" v-model.trim="searchValue"></el-input>
    </div>
    <div class="app-main-content">
      <draggable
        :clone="handleAddFormItem"
        :group="{ name: 'form', pull: 'clone', put: false }"
        :list="filteredComps"
        :sort="false"
      >
        <template v-for="item of filteredComps">
          <div :key="item.type" class="comp-item">
            <div class="comp-item-title">{{ item.type }}</div>
            <div>{{ item.label }}</div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { addFormItem } from "@/helpers/tool";
import { fuzzySearch } from "@/helpers/utils";
import { mapGetters } from "vuex";

export default {
  name: "AppMainLeftComponents",
  components: {
    draggable
  },
  computed: {
    ...mapGetters(["sortedComps"]),
    // 根据搜索词过滤组件
    filteredComps() {
      const comps = this.sortedComps;
      const keyword = this.searchValue.toLowerCase();
      if (!keyword) {
        return comps;
      } else {
        // 匹配，标签 和 type 其一即可
        return comps.filter(
          item =>
            fuzzySearch(item.type, keyword) || fuzzySearch(item.label, keyword)
        );
      }
    }
  },
  data() {
    return {
      searchValue: ""
    };
  },
  methods: {
    // 拖拽后新增表单项
    handleAddFormItem({ label, type }) {
      return addFormItem(type, { label });
    }
  }
};
</script>

<style lang="scss">
.app-main-left-components {
  line-height: 1.2em;
  height: 100%;

  .search-comps {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .app-main-content {
    padding-top: 10px;
  }

  .comp-item {
    width: 115px;
    color: #888;
    cursor: move;
    border: 1px solid #ebeef5;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
    border-radius: 3px;
    padding: 4px;
    box-sizing: border-box;
    margin: 3px 5px;
    font-size: 12px;
    text-align: center;
    background: rgba(12, 105, 187, 0.1);

    .comp-item-title {
      font-weight: bold;
      color: #666;
    }
  }
}
</style>

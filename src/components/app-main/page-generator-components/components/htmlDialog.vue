<template>
  <el-dialog
    :visible="visible"
    append-to-body
    title="代码"
    v-if="visible"
    @update:visible="$emit('update:visible', $event)"
    width="600px"
  >
    <codemirror :value="codeHtml"></codemirror>
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="handleCopyHtml" type="primary">复制代码</el-button>
      <el-button type="primary"
        ><el-link
          :href="fileURL"
          style="color: white;"
          :underline="false"
          :download="currentPage.name + '.vue'"
          >下载文件</el-link
        ></el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import tpl from "./tpl.ejs";
import copy from "clipboard-copy";
import _ from "lodash";
import serialize from "serialize-javascript";
import { mapGetters } from "vuex";
const ejs = require("ejs");

export default {
  name: "htmlDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    pageDesc: {
      type: Array,
      default: () => ({})
    },
    pageAttr: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(["currentPage"]),
    // 渲染模板
    codeHtml() {
      // 将  formDesc 转为 字符串
      const getObjDescStr = formDesc => {
        if (_.isEmpty(formDesc)) return "{}";

        return (
          serialize(formDesc, { space: 2 })
            // 增加空格, {\n   'name': 'zhang'} -> {\n\t  'name': 'zhang'} 保持缩进好看
            .replace(/\n/g, "\n\t  ")
            // 将 key 的引号去掉: '{"name": "zhang"}' -> '{name: "zhang"}'
            .replace(/"(\w+)":/g, "$1:")
        );
      };
      return ejs.render(tpl, {
        pageAttr: getObjDescStr(this.pageAttr),
        pageDesc: getObjDescStr(this.pageDesc)
      });
    },
    fileURL() {
      const blob = new Blob([this.codeHtml]);
      return URL.createObjectURL(blob);
    }
  },
  methods: {
    handleCopyHtml() {
      copy(this.codeHtml);
      this.$message.success("复制成功!");
    }
  }
};
</script>

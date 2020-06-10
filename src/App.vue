<template>
  <div class="app">
    <app-header />
    <app-main />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// Layout 顶部相关组件
import AppHeader from "./components/app-header.vue";
// Layout 主体相关组件
import AppMain from "./components/app-main/index.vue";
// 防止页面刷新丢失当前相关数据
import BlockRefresh from "@/mixins/block-refresh";

export default {
  name: "App",
  mixins: [BlockRefresh],
  components: {
    AppHeader,
    AppMain
  },
  data() {
    return {
      appName: "表单生成器"
    };
  },
  computed: {
    ...mapGetters(["currentForm"])
  },
  watch: {
    currentForm(currentForm) {
      const appName = "表单生成器";
      if (currentForm && currentForm.name) {
        document.title = currentForm.name + " | " + appName;
      } else {
        document.title = appName;
      }
    }
  }
};
</script>

<style>
/* vscode 需要重置背景和样式 */
body {
  background: white;
  padding: 0;
}

.app {
  min-width: 1350px;
}
</style>

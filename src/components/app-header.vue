<template>
  <div class="app-header">
    <div class="app-header-left">
      <img src="@/assets/logo.png" alt="LOGO" class="rlogo" />
      <h1 class="app-header-title">柔宇科技 数字物料 综合管理系统</h1>
    </div>

    <div class="app-header-right">
      <p>您好，超级管理员 贺鹏程 </p>
      <el-link
        :href="item.url"
        target="_blank"
        type="primary"
        v-for="item of links"
        :key="item.title"
      >{{item.title}}</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      links: [
        {
          url: "https://www.yuque.com/chaojie-vjiel/vbwzgu",
          title: "帮助中心"
        },
        {
          url: "https://www.yuque.com/chaojie-vjiel/vbwzgu",
          title: "退出系统"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.app-header {
  background: rgba(14, 35, 54, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  .app-header-left {
    display: flex;
    align-items: center;
    opacity: 0.8;
    .rlogo {
      height: 22px;
      width: 120px;
      margin-left: 20px;
      margin-right: 10px;
    }
    .app-header-title {
      font-size: 18px; 
      color: #007cba;
    }
  }

  .app-header-right {
    display: flex;
    align-items: center;
    opacity: 0.8;
    p{
      color: #666;
      font-size: 14px;
      margin-right: 20px;
      
    }
    .el-link {
      color: #007cba;
      margin-right: 20px;
    }
  }
}
</style>

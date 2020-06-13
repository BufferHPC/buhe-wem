<template>
  <div class="send-channel">
    <div class="cleft">
      <div class="header">
        <el-button class="actived" icon="el-icon-s-data" type="text"
          >表单项目管理</el-button
        >
        <el-button icon="el-icon-s-platform" type="text"
          >页面项目管理</el-button
        >
        <el-button icon="el-icon-s-opportunity" type="text"
          >第三方项目管理</el-button
        >
      </div>
    </div>
    <multipane-resizer class="cline" />
    <div class="cright">
      <div class="header">
        <el-button type="text">发布渠道配置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.send-channel {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
  .header {
    width: 100%;
    line-height: 32px;
    border-bottom: 1px solid #eee;
    background: rgba(190, 211, 230, 0.08);
    .el-button {
      color: #007cba;
      opacity: 0.8;
      padding: 20px;
      &.actived {
        color: #333;
      }
    }
  }
  .cleft {
    flex-grow: 10;
    border-right: 1px solid #eee;
  }
  .cline {
    width: 5px;
  }
  .cright {
    flex-grow: 2;
    border-left: 1px solid #eee;
  }
}
</style>

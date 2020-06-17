<template>
  <multipane @paneResizeStop="handlePaneresize" class="app-main">
    <!-- 左侧导航tab选项卡 -->
    <el-menu
      @select="handleChangeMenu"
      :default-active="activeMenu"
      class="app-menus"
    >
      <div v-for="item of menus" :key="item.componentName" :title="item.title">
        <el-tooltip :content="item.title" placement="right">
          <el-menu-item :index="item.componentName">
            <i :class="item.icon"></i>
          </el-menu-item>
        </el-tooltip>
      </div>
    </el-menu>

    <!-- 表单设计器相关调用 -->
    <template v-if="activeMenu == 'projects' || activeMenu == 'components'">
      <!-- 表单二级栏目选项内容 -->
      <transition name="el-fade-in-linear">
        <component
          :is="'form-main-left-' + activeMenu"
          :style="{ width: leftWidth }"
          key="menu"
          v-show="isShowMenu"
        />
      </transition>
      <!-- 拖拽线的使用 -->
      <transition name="el-fade-in-linear">
        <multipane-resizer
          v-show="isShowMenu"
          key="resizer"
        ></multipane-resizer>
      </transition>
      <template v-if="isSelectedForm">
        <!-- 表单详细内容展示部分 -->
        <div class="app-main-container">
          <form-main-header />
          <form-main-center class="app-main-content" />
        </div>
        <multipane-resizer />
        <!-- 表单右侧配置相关部分 -->
        <form-main-right />
      </template>
      <template v-else>
        <div class="app-main-container not-selected">请先选择一个表单项目</div>
      </template>
    </template>

    <!-- 页面设计器相关调用 -->
    <template v-if="activeMenu == 'pages' || activeMenu == 'pictures'">
      <!-- 页面二级选择栏目 -->
      <transition name="el-fade-in-linear">
        <component
          :is="'page-main-left-' + activeMenu"
          :style="{ width: leftWidth }"
          key="menu"
          v-show="isShowMenu"
        />
      </transition>
      <!-- 拖拽线的使用 -->
      <transition name="el-fade-in-linear">
        <multipane-resizer
          v-show="isShowMenu"
          key="resizer"
        ></multipane-resizer>
      </transition>
      <!-- 页面设计详细内容 -->
      <div class="app-main-container">
        <page-main-header />
        <page-main-center class="app-main-content" />
      </div>
      <multipane-resizer />
      <!-- 页面配置相关右侧部分 -->
      <page-main-right />
    </template>

    <!-- 发布相关设计使用 -->
    <template v-if="activeMenu == 'sends'">
      <dl>
        <dt>发布相关设置相关（两层栏目设置）</dt>
        <dd>
          第一层栏目树形结构展示，并选择现有系统中需要发布的表单、页面对应的工程或者页面进行发布
        </dd>
        <dd>
          第二层栏目，根据第一层选择的项目，可以选择发布到PC页面、H5页面、公众号或者其他发布渠道，同时可以配置相关的url链接配置等相关
        </dd>
      </dl>
    </template>

    <!-- 系统及用户设置相关 -->
    <template v-if="activeMenu == 'settings'">
      <dl>
        <dt>系统及用户设置相关（两层栏目设置）</dt>
        <dd>第一层栏目，tab选择管理员用户管理或者系统相关配置管理</dd>
        <dd>
          第二层栏目，系统管理员相关用户管理，可以进行基础的增删改查常规操作
        </dd>
        <dd>
          第二层栏目，系统配置相关，比如：系统缓存相关配置，可以全域更新相关缓存地址信息，比如多语言支持的程度配置等
        </dd>
      </dl>
    </template>
  </multipane>
</template>

<script>
import { mapState } from "vuex";
// 栏目拖拽缩放插件
import { Multipane, MultipaneResizer } from "vue-multipane";
// 表单设计器相关组件
import FormMainLeftProjects from "./form-generator-components/main-left-projects.vue";
import FormMainLeftComponents from "./form-generator-components/main-left-components.vue";
import FormMainHeader from "./form-generator-components/main-header.vue";
import FormMainCenter from "./form-generator-components/main-center.vue";
import FormMainRight from "./form-generator-components/main-right/index.vue";

// 页面设计器相关组件
import PageMainLeftPages from "./page-generator-components/main-left-pages.vue";
import PageMainLeftPictures from "./page-generator-components/main-left-pictures.vue";
import PageMainHeader from "./page-generator-components/main-header.vue";
import PageMainCenter from "./page-generator-components/main-center.vue";
import PageMainRight from "./page-generator-components/main-right/index.vue";

export default {
  name: "AppMain",
  components: {
    Multipane,
    MultipaneResizer,
    // 表单设计器相关组件
    FormMainCenter,
    FormMainHeader,
    FormMainRight,
    FormMainLeftComponents,
    FormMainLeftProjects,
    // 页面设计器相关组件
    PageMainCenter,
    PageMainHeader,
    PageMainRight,
    PageMainLeftPages,
    PageMainLeftPictures
  },
  data() {
    return {
      leftWidth: "260px",
      activeMenu: "projects",
      isShowMenu: true,
      menus: [
        {
          icon: "el-icon-s-data",
          componentName: "projects",
          title: "表单工程项目管理"
        },
        {
          icon: "el-icon-s-grid",
          componentName: "components",
          title: "表单资源仓库管理"
        },

        {
          icon: "el-icon-s-platform",
          componentName: "pages",
          title: "页面工程项目管理"
        },
        {
          icon: "el-icon-picture",
          componentName: "pictures",
          title: "图片资源仓库管理"
        },
        {
          icon: "el-icon-s-promotion",
          componentName: "sends",
          title: "统一发布渠道管理"
        },
        {
          icon: "el-icon-user-solid",
          componentName: "customers",
          title: "全渠道用户信息管理"
        },
        {
          icon: "el-icon-s-marketing",
          componentName: "cdmp",
          title: "全渠道用户行为管理"
        },
        {
          icon: "el-icon-s-tools",
          componentName: "settings",
          title: "系统相关设置管理"
        }
      ]
    };
  },
  computed: {
    ...mapState(["currentProjectIndex", "currentFormIndex"]),
    // 是否有选中的表单
    isSelectedForm() {
      // 如果当前工程索引和表单索引不为空，则表示当前选中某个表单
      return (
        this.currentProjectIndex !== null && this.currentFormIndex !== null
      );
    }
  },
  methods: {
    // panel 拖拉变化
    handlePaneresize(el) {
      // 因为中间部分也可以拖拽，所以需要判断是否为左侧拖拽产生的变化
      if (el.className.startsWith("form-main-left")) {
        localStorage.setItem("menu-width", el.style.width);
      }
    },
    // 改变菜单
    handleChangeMenu(menuName) {
      // 点击菜单和当前菜单相同，且当前为显示模式，则隐藏
      // 否则则显示
      if (menuName === this.activeMenu && this.isShowMenu) {
        this.isShowMenu = false;
      } else {
        this.activeMenu = menuName;
        this.isShowMenu = true;
      }
      // 将当前激活的菜单，存储到 localStorage
      localStorage.setItem("active-menu", menuName);
    },
    // 初始化左侧带单宽度
    initMenuWidth() {
      if (localStorage.getItem("menu-width")) {
        this.leftWidth = localStorage.getItem("menu-width");
      }
    },
    // 初始化当前激活的 menu
    initActiveMenu() {
      // 如果没有任何选择的表单，则菜单选择 projects
      if (!this.isSelectedForm) {
        this.activeMenu = "projects";
        // 否则从 localStorage 获取
      } else if (localStorage.getItem("active-menu")) {
        this.activeMenu = localStorage.getItem("active-menu");
      }
    }
  },
  mounted() {
    this.initMenuWidth();
    this.initActiveMenu();
  }
};
</script>
<style lang="scss">
.multipane {
  .multipane-resizer,
  .app-main-right {
    // z-index: -1;
  }
}
</style>
<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 60px);
  overflow: hidden;
  .app-menus {
    background: rgba(14, 35, 54, 0.1);
  }
  .el-menu-item {
    padding: 0 10px;
  }
  .app-main-content {
    height: calc(100% - 60px);
    overflow: scroll;
    padding-bottom: 20px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 0;
    }
  }

  .app-main-container {
    flex-grow: 1;
    flex: 1;
    &.not-selected {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-top: 15%;
    }
  }

  & > .multipane-resizer {
    margin: 0;
    left: 0;
    position: relative;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    width: 7px;
    &::before {
      display: block;
      content: "";
      width: 1px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -20px;
      margin-left: -1.5px;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      &::before {
        border-color: #999;
      }
    }
  }
  dl {
    color: #666;
    margin: 50px;
    dt {
      font-size: 21px;
      margin-bottom: 20px;
    }
    dd {
      font-size: 16px;
      margin-bottom: 10px;
      &.red {
        color: red;
        margin: 20px 70px;
      }
      &.blue {
        color: #007cba;
        margin: 20px 70px;
      }
    }
  }
}
</style>

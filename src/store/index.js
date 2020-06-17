import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import comps from "@/helpers/comps";
import pageComps from "@/helpers/pageComps";
import { Message } from "element-ui";
import { keyBy } from "@/helpers/utils";
import listDefault from "./listDefault.js";
import pageDefault from "./pageDefault.js";
import formAttrDefault from "./formAttrDefault";
import pageAttrDefault from "./pageAttrDefault";
import { getFormFromServer } from "@/helpers/api";
import { getRemoteConfig } from "@/helpers/remoteConfig";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const remoteConfig = getRemoteConfig();

const store = new Vuex.Store({
  state: {
    // 工程列表
    projectList: [
      {
        // 工程名称
        name: "柔派2问卷调查",
        // 表单列表
        formList: [
          {
            // 表单名称
            name: "柔派2用户满意度调查",
            // 表单属性
            formAttr: _.cloneDeep(formAttrDefault),
            // 表单项列表
            formItemList: listDefault
          }
        ]
      },
      {
        // 工程名称
        name: "柔记2用户调研",
        // 表单列表
        formList: [
          {
            // 表单名称
            name: "柔记2的客户情况反馈",
            // 表单属性
            formAttr: _.cloneDeep(formAttrDefault),
            // 表单项列表
            formItemList: listDefault
          }
        ]
      }
    ],
    // 当前工程索引
    currentProjectIndex: 0,
    // 当前表单索引
    currentFormIndex: 0,
    // 当前表单项索引
    currentFormItemIndex: null,

    //页面工程列表
    pageProjectList: [
      {
        // 工程名称
        name: "柔派",
        // 表单列表
        pageList: [
          {
            // 表单名称
            name: "柔派首页",
            // 表单属性
            pageAttr: _.cloneDeep(pageAttrDefault),
            // 表单项列表
            pageItemList: pageDefault
          }
        ]
      }
    ],

    // 当前页面工程索引
    currentPageProjectIndex: 0,
    // 当前页面索引
    currentPageIndex: 0,
    // 当前页面元素索引
    currentPageItemIndex: null,
    // 保存数据方式
    saveType: "local",
    // 右侧组件列表
    comps: comps,
    pageComps: pageComps
  },
  getters: {
    // 根据使用的次数排序
    sortedComps(state) {
      return _.cloneDeep(_.sortBy(state.comps, "count")).reverse();
    },
    // 根据pageitem使用的次数排序
    sortedPageComps(state) {
      debugger;
      return _.cloneDeep(_.sortBy(state.pageComps, "count")).reverse();
    },
    // 当前 project
    currentProject(state) {
      return state.currentProjectIndex !== null
        ? state.projectList[state.currentProjectIndex]
        : null;
    },
    // 当前表单
    currentForm(state, getters) {
      return getters.currentProject && state.currentFormIndex !== null
        ? getters.currentProject.formList[state.currentFormIndex]
        : null;
    },
    // 当前表单项
    currentFormItem(state, getters) {
      return getters.currentForm && state.currentFormItemIndex !== null
        ? getters.currentForm.formItemList[state.currentFormItemIndex]
        : null;
    },
    // 当前 pageproject
    currentPageProject(state) {
      return state.currentPageProjectIndex !== null
        ? state.pageProjectList[state.currentPageProjectIndex]
        : null;
    },
    // 当前页面
    currentPage(state, getters) {
      return getters.currentPageProject && state.currentPageIndex !== null
        ? getters.currentPageProject.pageList[state.currentPageIndex]
        : null;
    },
    // 当前页面元素
    currentPageItem(state, getters) {
      return getters.currentPage && state.currentPageItemIndex !== null
        ? getters.currentPage.pageItemList[state.currentPageItemIndex]
        : null;
    },
    // 未经过过滤的 formAttr
    currerntOriginFormAttr(state, getters) {
      if (getters.currentForm) {
        return getters.currentForm.formAttr;
      } else {
        return {};
      }
    },
    // 过滤掉空值和默认值后的 formAttr
    currentFormAttr(state, getters) {
      if (getters.currentForm) {
        // 判断是否为空或者是否和默认值相同
        const isEmptyOrDefaultValue = (val, key) =>
          _.isNil(val) || val === formAttrDefault[key];
        return _.omitBy(getters.currentForm.formAttr, isEmptyOrDefaultValue);
      } else {
        return null;
      }
    },
    // 过滤掉空值和默认值后的 pageAttr
    currentPageAttr(state, getters) {
      if (getters.currentPage) {
        // 判断是否为空或者是否和默认值相同
        const isEmptyOrDefaultValue = (val, key) =>
          _.isNil(val) || val === formAttrDefault[key];
        return _.omitBy(getters.currentPage.pageAttr, isEmptyOrDefaultValue);
      } else {
        return null;
      }
    },
    // 获取页面单项数据
    currentPageItemAttrs(state) {
      const {
        currentPageIndex,
        currentPageItemIndex,
        currentPageProjectIndex
      } = state;
      if (
        currentPageIndex !== null &&
        currentPageItemIndex !== null &&
        currentPageProjectIndex !== null
      ) {
        return state.pageProjectList[currentPageProjectIndex].pageList[
          currentPageIndex
        ].pageItemList[currentPageItemIndex].attrs;
      }
    },
    // 当前 formItemList
    currentFormItemList(state, getters) {
      return getters.currentForm ? getters.currentForm.formItemList : null;
    },
    // 当前 pageItemList
    currentPageItemList(state, getters) {
      return getters.currentPage ? getters.currentPage.pageItemList : null;
    },
    // 将数组转为对象
    currentFormDesc(state, getters) {
      return getters.currentFormItemList
        ? keyBy(getters.currentFormItemList, "field")
        : null;
    },
    // 将数组转为对象
    currentPageDesc(state, getters) {
      return getters.currentPageItemList
        ? keyBy(getters.currentPageItemList, "field")
        : null;
    }
  },
  mutations: {
    // 更新组件使用次数
    updateCompCount(state, compType) {
      const compIndex = state.comps.findIndex(item => item.type === compType);
      if (compIndex > -1) {
        Vue.set(
          state.comps[compIndex],
          "count",
          state.comps[compIndex].count + 1
        );
      }
    },
    // 更新page组件使用次数
    updatePageCompCount(state, compType) {
      const compIndex = state.pageComps.findIndex(
        item => item.type === compType
      );
      if (compIndex > -1) {
        Vue.set(
          state.pageComps[compIndex],
          "count",
          state.pageComps[compIndex].count + 1
        );
      }
    },
    // 更新所有
    updateAll(state, data) {
      Object.assign(state, data);
    },
    // 更新 project 索引
    updateProjectIndex(state, index) {
      state.currentProjectIndex = index;
    },
    // 更新 form 索引
    updateFormIndex(state, index) {
      state.currentFormIndex = index;
    },
    // 更新 formItem 索引
    updateFormItemIndex(state, index) {
      state.currentFormItemIndex = index;
    },
    // 更新 pageproject 索引
    updatePageProjectIndex(state, index) {
      state.currentPageProjectIndex = index;
    },
    // 更新 page 索引
    updatePageIndex(state, index) {
      state.currentPageIndex = index;
    },
    // 更新 pageItem 索引
    updatePageItemIndex(state, index) {
      state.currentPageItemIndex = index;
    },
    // 新增 project
    createProject(state, project) {
      project.formList = [];
      state.projectList.push(project);
    },
    // 新增 pageProject
    createPageProject(state, project) {
      project.pageList = [];
      state.pageProjectList.push(project);
    },
    // 新增 form
    createForm(state, { projectIndex, form }) {
      form.formItemList = [];
      form.formAttr = _.cloneDeep(formAttrDefault);
      state.projectList[projectIndex].formList.push(form);
    },
    // 新增 page
    createPage(state, { projectIndex, form }) {
      form.pageItemList = [];
      form.pageAttr = _.cloneDeep(pageAttrDefault);
      state.pageProjectList[projectIndex].pageList.push(form);
    },
    // 新增 formItem
    createFormItem(state, formItem) {
      const formItemList = _.cloneDeep(store.getters.formItemList);
      formItemList.push(formItem);
      store.commit("updateCurrentForm", { formItemList });
    },
    // 通过索引删除 project
    deleteProjectByIndex(state, index) {
      // 置空索引
      if (state.currentProjectIndex === index) {
        state.currentProjectIndex = null;
        state.currentFormIndex = null;
        state.currentFormItemIndex = null;
      }

      // 删除
      state.projectList.splice(index, 1);
    },
    // 通过索引删除 pageProject
    deletePageProjectByIndex(state, index) {
      // 置空索引
      if (state.currentPageProjectIndex === index) {
        state.currentPageProjectIndex = null;
        state.currentPageIndex = null;
        state.currentPageItemIndex = null;
      }

      // 删除
      state.pageProjectList.splice(index, 1);
    },
    // 通过索引删除 form
    deleteFormByIndex(state, { projectIndex, formIndex }) {
      // 置空索引
      if (state.currentFormIndex == formIndex) {
        state.currentFormIndex = null;
        state.currentFormItemIndex = null;
      }

      // 删除
      state.projectList[projectIndex].formList.splice(formIndex, 1);
    },
    // 通过索引删除 form
    deletePageByIndex(state, { projectIndex, formIndex }) {
      // 置空索引
      if (state.currentPageIndex == formIndex) {
        state.currentPageIndex = null;
        state.currentPageItemIndex = null;
      }

      // 删除
      state.pageProjectList[projectIndex].pageList.splice(formIndex, 1);
    },
    // 通过索引删除 formItem
    deleteFormItemByIndex(state, index) {
      const formItemList = _.cloneDeep(store.getters.currentFormItemList);
      formItemList.splice(index, 1);
      store.commit("updateCurrentForm", { formItemList });
    },
    // 通过索引删除 pageItem
    deletePageItemByIndex(state, index) {
      const pageItemList = _.cloneDeep(store.getters.currentPageItemList);
      pageItemList.splice(index, 1);
      store.commit("updateCurrentPage", { pageItemList });
    },
    // 更新 project
    updateProject(state, { projectIndex, project }) {
      Object.assign(state.projectList[projectIndex], project);
    },
    // 更新 pageProject
    updatePageProject(state, { projectIndex, project }) {
      Object.assign(state.pageProjectList[projectIndex], project);
    },
    // 更新 form
    updateForm(state, { projectIndex, formIndex, form }) {
      Object.assign(state.projectList[projectIndex].formList[formIndex], form);
    },
    // 更新 page
    updatePage(state, { projectIndex, formIndex, form }) {
      Object.assign(
        state.pageProjectList[projectIndex].pageList[formIndex],
        form
      );
    },
    // 更新表单项
    updateCurrentItem(state, item) {
      const { currentFormItemIndex } = state;
      if (currentFormItemIndex !== null) {
        const formItemList = _.cloneDeep(store.getters.currentFormItemList);
        formItemList.splice(currentFormItemIndex, 1, item);
        store.commit("updateCurrentForm", { formItemList });
      }
    },
    // 更新页面单项
    updateCurrentPageItem(state, item) {
      const { currentPageItemIndex } = state;
      if (currentPageItemIndex !== null) {
        const pageItemList = _.cloneDeep(store.getters.currentPageItemList);
        pageItemList.splice(currentPageItemIndex, 1, item);
        store.commit("updateCurrentPage", { pageItemList });
      }
    },
    // 更新表单项数据
    updateCurrentItemAttrs(state, attrs) {
      const {
        currentFormIndex,
        currentFormItemIndex,
        currentProjectIndex
      } = state;
      if (
        currentFormIndex !== null &&
        currentFormItemIndex !== null &&
        currentProjectIndex !== null
      ) {
        state.projectList[currentProjectIndex].formList[
          currentFormIndex
        ].formItemList[currentFormItemIndex].attrs = attrs;
      }
    },
    // 更新页面单项数据
    updateCurrentPageItemAttrs(state, attrs) {
      const {
        currentPageIndex,
        currentPageItemIndex,
        currentPageProjectIndex
      } = state;
      if (
        currentPageIndex !== null &&
        currentPageItemIndex !== null &&
        currentPageProjectIndex !== null
      ) {
        state.pageProjectList[currentPageProjectIndex].pageList[
          currentPageIndex
        ].pageItemList[currentPageItemIndex].attrs = attrs;
      }
    },

    // 更新当前表单
    updateCurrentForm(state, form) {
      if (
        state.currentProjectIndex !== null &&
        state.currentFormIndex !== null
      ) {
        Object.assign(
          state.projectList[state.currentProjectIndex].formList[
            state.currentFormIndex
          ],
          form
        );
      }
    },
    // 更新当前页面
    updateCurrentPage(state, page) {
      if (
        state.currentPageProjectIndex !== null &&
        state.currentPageIndex !== null
      ) {
        Object.assign(
          state.pageProjectList[state.currentPageProjectIndex].pageList[
            state.currentPageIndex
          ],
          page
        );
      }
    },
    // 清空列表
    clearCurrentForm(state) {
      store.commit("updateCurrentForm", {
        formItemList: [],
        formAttr: _.cloneDeep(formAttrDefault)
      });
      state.currentFormItemIndex = null;
    },
    // 清空页面
    clearCurrentPage(state) {
      store.commit("updateCurrentPage", {
        pageItemList: [],
        pageAttr: _.cloneDeep(pageAttrDefault)
      });
      state.currentPageItemIndex = null;
    },
    // 更新表单属性
    updateCurrentFormAttr(state, formAttr) {
      store.commit("updateCurrentForm", { formAttr });
    },
    // 更新表单属性
    updateCurrentPageAttr(state, pageAttr) {
      store.commit("updateCurrentPage", { pageAttr });
    },
    // 修改列表
    updateCurrentFormItemList(state, formItemList) {
      store.commit("updateCurrentForm", { formItemList });
    },
    // 修改列表
    updateCurrentPageItemList(state, pageItemList) {
      store.commit("updateCurrentPage", { pageItemList });
    },
    // 更新 saveType
    updateSaveType(state, type) {
      state.saveType = type;
    }
  },
  actions: {
    async updateStateFromRemote({ commit }) {
      const res = await getFormFromServer();
      if (res) {
        if (res.code === 0) {
          commit("updateAll", res.data);
        } else {
          Message.error("获取数据失败, 失败原因: " + res.msg);
        }
      }
    }
  },
  plugins: [createPersistedState({ key: "vue-ele-form-generator" })]
});

if (remoteConfig) {
  store.dispatch("updateStateFromRemote");
}

export default store;

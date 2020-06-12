<template>
  <div>
    <template v-if="currentPageItem">
      <attrs-header
        url="https://www.yuque.com/chaojie-vjiel/vbwzgu/iw5dzf"
        title="通用配置"
        v-model="keyword"
      />
      <ele-form
        :formData="currentPageItem"
        @input="updateCurrentPageItem"
        :formDesc="filterFormDesc"
        :formAttrs="{ size: 'small' }"
        :isShowBackBtn="false"
        :isShowSubmitBtn="false"
        :rules="rules"
        :span="20"
        labelPosition="top"
      >
        <template v-slot:rules="{ data, desc, field, type }">
          <div style="margin-bottom: 20px">
            <el-button @click="isShowRuleDialog = true" type="danger"
              >新增校检规则</el-button
            >
          </div>
          <component
            :desc="desc"
            :is="type"
            :field="field"
            :value="currentFormItem[field]"
            @input="handleChangeRules"
          />
          <form-item-rules :visible.sync="isShowRuleDialog" />
        </template>
      </ele-form>
    </template>
    <div class="form-item-placeholder" v-else>从左侧拖拽添加表单项并点选</div>
  </div>
</template>

<script>
import configList from "@/page-config";
import { changeFormLabel } from "@/helpers/tool";
import searchMixin from "./components/searchMixin";
import AttrsHeader from "./components/attrs-header.vue";
import { mapGetters } from "vuex";

export default {
  name: "AppFormItemConfig",
  mixins: [searchMixin],
  components: {
    AttrsHeader
  },
  computed: {
    ...mapGetters(["currentFormItemList", "currentPageItem"]),
    config() {
      return {
        layout: {
          type: "slider",
          label: "宽度",
          attrs: {
            min: 1,
            max: 24,
            "format-tooltip"(val) {
              return `${val} / 24`;
            }
          },
          on: {
            input: val => {
              // slider组件, 如果传递的value为null或者undefined, 会赋值为 1, 无法利用到默认值, 所以去掉
              if (val !== 1) {
                this.updateCurrentPageItem({
                  ...this.currentPageItem,
                  layout: val
                });
              }
            }
          }
        }
      };
    },
    formDesc() {
      const customConfig = configList[this.currentPageItem.type].common || {};
      const formDesc = Object.assign({}, this.config, customConfig);
      return changeFormLabel(formDesc);
    }
  },
  data() {
    return {
      rules: {
        field: {
          required: true,
          message: "字段必填"
        },
        label: {
          required: true,
          message: "标签不能为空"
        }
      },
      isShowRuleDialog: false
    };
  },
  methods: {
    updateCurrentPageItem(data) {
      this.$store.commit("updateCurrentPageItem", data);
    },
    handleChangeRules(rules) {
      try {
        if (rules) {
          rules = eval("(" + rules + ")");
          if (typeof rules !== "object") return;
        } else {
          rules = [];
        }
        const data = Object.assign({}, this.currentFormItem, { rules: rules });
        this.updateCurrentItem(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }
};
</script>

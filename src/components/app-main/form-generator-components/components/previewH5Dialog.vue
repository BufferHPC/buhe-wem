<template>
  <el-dialog
    append-to-body
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :title="currentNodeKey.split('&&&&')[0]"
    width="375px"
  >
    <h2 class="dtitle">{{currentNodeKey.split("&&&&")[1]}}</h2>
    <ele-form
      :formDesc="computedFormDesc"
      v-model="formData"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      :request-fn="handleRequest"
      @request-success="handleRequestSuccess"
      v-bind="formAttr"
    ></ele-form>
  </el-dialog>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "previewDialog",
  props: {
    formDesc: {
      type: Object,
      default: () => ({})
    },
    formAttr: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  computed: {
    ...mapState(["projectList", "currentFormIndex", "currentProjectIndex"]),
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
    },
    // 需要加一层 clone, 因为 ele-form会修改内部属性
    computedFormDesc() {
      return _.cloneDeep(this.formDesc);
    }
  },
  methods: {
    handleRequest(data) {
      // eslint-disable-next-line no-console
      console.log(data);
      return Promise.resolve(data);
    },
    handleRequestSuccess() {
      this.$message.success("发送成功");
    }
  }
};
</script>
<style lang="scss">
.dtitle {
  text-align: center;
  margin-top: -10px;
  color: #888;
}
</style>

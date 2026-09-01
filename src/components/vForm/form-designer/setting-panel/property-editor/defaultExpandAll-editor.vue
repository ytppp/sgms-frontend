<template>
  <el-form-item :label="i18nt('designer.setting.defaultExpandAll')">
    <el-switch v-model="optionModel.defaultExpandAll"></el-switch>
  </el-form-item>
</template>

<script>
  import i18n from '@vForm/utils/i18n'

  export default {
    name: "defaultExpandAll-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>

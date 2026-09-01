<template>
  <el-form-item :label="i18nt('designer.setting.checkAllable')">
    <el-switch v-model="optionModel.checkAllable"></el-switch>
  </el-form-item>
</template>

<script>
  import i18n from '@vForm/utils/i18n'

  export default {
    name: "checkAllable-editor",
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

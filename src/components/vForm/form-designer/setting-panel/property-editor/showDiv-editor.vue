<template>
  <el-form-item :label="i18nt('designer.setting.showDiv')">
    <el-switch v-model="optionModel.showDiv"></el-switch>
  </el-form-item>
</template>

<script>
  import i18n from '@vForm/utils/i18n'

  export default {
    name: "showDiv-editor",
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

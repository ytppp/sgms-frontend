<template>
  <el-form-item label="onValidate" label-width="150px">
    <el-button type="info" icon="Edit" plain round :class="[eventHandled ? 'button-text-highlight' : '']"
               @click="editEventHandler('onValidate', eventParams)">
      {{i18nt('designer.setting.addEventHandler')}}</el-button>
  </el-form-item>
</template>

<script>
  import i18n from '@vForm/utils/i18n'
  import eventMixin from '@vForm/form-designer/setting-panel/property-editor/event-handler/eventMixin'

  export default {
    name: "onValidate-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
      eventHandled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        eventParams: ['rule', 'value', 'callback'],
      }
    }
  }
</script>

<style scoped>

</style>

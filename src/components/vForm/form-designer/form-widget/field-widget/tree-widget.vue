<template>
  <form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
                     :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                     :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
          <el-input v-if="field.options.filterable" v-model="filterText" :placeholder="i18nt('render.hint.filterKeyword')" />
          <el-button-group class="ml-4">
            <el-button type="primary" v-if="field.options.expandAllable" @click="expandAllNodes(0)">{{i18nt('render.hint.expandOrCollapse')}}</el-button>
            <el-button type="default" v-if="field.options.checkAllable" @click="checkAllNodes(0)">{{i18nt('render.hint.selectAllOrCancel')}}</el-button> 
           <!-- <el-button type="default"  @click="getCheckedNodes()">get node</el-button>
            <el-button type="default"  @click="getCheckedKeys()">get key</el-button>-->
          </el-button-group>
    <el-tree ref="fieldEditor" v-model="fieldModel" v-show="!isReadMode" class="full-width-input"
               :disabled="field.options.disabled"
               :size="widgetSize"
               :clearable="field.options.clearable"

               :show-checkbox="field.options.showCheckBox"
               :props="defaultProps"
               :node-key="field.options.valueKey"
               :filterable="field.options.filterable"
               :filter-node-method="filterNode"
               :default-expand-all = "field.options.defaultExpandAll"
               :expand-on-click-node = "field.options.expandOnClickNode"
               :allow-create="field.options.allowCreate"
               :default-first-option="allowDefaultFirstOption"                            
               :multiple="field.options.multiple" :multiple-limit="field.options.multipleLimit"
               :placeholder="field.options.placeholder || i18nt('render.hint.selectPlaceholder')"
			         :data="field.options.optionItems"
               
			         :check-strictly="field.options.checkStrictly"
               @check="handleCheckChange"             

               @focus="handleFocusCustomEvent" @blur="handleBlurCustomEvent"
               @change="handleChange">
      
    </el-tree>
    <template v-if="isReadMode">
      <span class="readonly-mode-field">{{getTreeOptionLabel}}</span>
    </template>
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from './form-item-wrapper'
  import emitter from '@vForm/utils/emitter'
  import i18n, {translate} from '@vForm/utils/i18n'
  import fieldMixin from '@vForm/form-designer/form-widget/field-widget/fieldMixin'

  export default {
    name: "tree-widget",
    componentName: 'FieldWidget',  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    props: {
      field: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,
      designState: {
        type: Boolean,
        default: false
      },

      subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
        type: String,
        default: ''
      },

    },
    components: {
      FormItemWrapper,
    },
    data() {
      return {
        oldFieldValue: null, //field组件change之前的值
        fieldModel: null,
        rules: [],

        isExpanded: !0,
        isChecked: !1,
        currentKey: "",
        filterText: "",
        defaultProps: {
          children: "children",
          label: "label"
        }
      }
    },
    watch: {
			filterText(e) {
       this.$refs.fieldEditor.filter(e);
			}
		},
    computed: {
      allowDefaultFirstOption() {
        return (!!this.field.options.filterable && !!this.field.options.allowCreate)
      },

    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      this.registerToRefList()
      this.initOptionItems()
      this.initFieldModel()
      this.initEventHandler()
      this.buildFieldRules()
     // console.log(translate)
      this.handleOnCreated()
    },

    mounted() {
      this.handleOnMounted()
    },

    beforeUnmount() {
      this.unregisterFromRefList()
    },

    methods: {
      filterNode(e, o) {
        return e ? o.label.indexOf(e) !== -1 : !0
      },
      setNodeExpanded(e, o) {
        e.expanded = o;
        for (let t = 0; t < e.childNodes.length; t++) e.childNodes[t].expanded = o, e.childNodes[t].childNodes.length > 0 && this.setNodeExpanded(e.childNodes[t], o)
      },
      setNodeChecked(e, o) {
        e.checked = o;
        for (let t = 0; t < e.childNodes.length; t++) e.childNodes[t].checked = o, e.childNodes[t].childNodes.length > 0 && this.setNodeChecked(e.childNodes[t], o)
      },
      getNativeTree() {
        return this.$refs.fieldEditor
      },
      setTreeData(e) {
        this.widget.options.optionItems = e, this.currentKey = e[0].id
      },
      getTreeData() {
        return this.widget.options.optionItems
      },
      expandAllNodes(e) {
        this.isExpanded = e || !this.isExpanded,this.setNodeExpanded(this.$refs.fieldEditor.store.root, this.isExpanded)
      }, 
      checkAllNodes(e) {
        this.isChecked = e || !this.isChecked, this.setNodeChecked(this.$refs.fieldEditor.store.root, this.isChecked)
      },
      getCheckedNodes(){
        return this.$refs.fieldEditor.getCheckedNodes(false, false)
      },
      getCheckedKeys(){
        return this.$refs.fieldEditor.getCheckedKeys(false, false)
      },
      handleCheckChange(value, data) {
        let checkedNodes = data.checkedNodes;
        let checkedKeys = data.checkedKeys;
        let myTree = this.$refs.fieldEditor.$el;
        let multiple = myTree.getAttribute('multiple');
        let multipleLimit = myTree.getAttribute('multiple-limit');

        if(this.$refs.fieldEditor.checkStrictly && multiple && multipleLimit>'0'){
          if (checkedNodes.length > multipleLimit) {
            const extraCheckedNodes = checkedNodes.slice(multipleLimit)
            const extraCheckedKeys = extraCheckedNodes.map(node => node[this.$refs.fieldEditor.nodeKey])
            this.$refs.fieldEditor.setCheckedKeys(checkedKeys.filter(key => !extraCheckedKeys.includes(key)))
            extraCheckedNodes.forEach(node => {
              this.$refs.fieldEditor.setChecked(node.data, false)
            })
          }
        }
        this.fieldModel = this.getCheckedKeys() //|| this.getCheckedNodes;
        this.handleChangeEvent(this.fieldModel)    // 更新表单数据                
      },
      handleChange(data) {        
        this.fieldModel = this.getCheckedKeys() //|| this.getCheckedNodes;
        this.handleChangeEvent(this.fieldModel)   // 更新表单数据         
      },
    }
  }
</script>

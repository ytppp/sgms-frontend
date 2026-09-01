/*
 * @Author: ujjldn ujjldn0515@163.com
 * @Date: 2023-03-07 08:20:56
 * @LastEditors: ujjldn ujjldn0515@163.com
 * @LastEditTime: 2023-03-25 18:49:20
 * @FilePath: \vform\src\extension\samples\extension-schema.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const cardSchema = {
  type: 'card',
  category: 'container',
  icon: 'card',
  widgetList: [],
  options: {
    name: '',
    label: 'card',
    hidden: false,
    folded: false,
    showFold: true,
    cardWidth: '100%',
    shadow: 'never',
    customClass: '',
  }
}

export const alertSchema = {
  type: 'alert',
  icon: 'alert',
  formItemFlag: false,
  options: {
    name: '',
    title: 'Good things are coming...',
    type: 'info',
    description: '',
    closable: true,
    closeText: '',
    center: true,
    showIcon: false,
    effect: 'light',
    hidden: false,
    onClose: '',
    customClass: '',
  }
}

export const transferSchema =  {
 type: 'transfer',
 icon: 'select-field',
 formItemFlag: true,
 options: {
   name: '',
   label: '',
   labelAlign: '',
   leftTitle: 'List1',
   rightTitle: 'List2',
   defaultValue: [],
   placeholder: '',
   columnWidth: '300px',
   size: '',
   labelWidth: null,
   labelHidden: false,
   clearable: true,
   filterable: true,
   allowCreate: false,
   remote: false,
   dsEnabled: false, // 是否使用数据源数据
   dsName: '', // 数据源名称
   dataSetName: '',  //数据集名称
   labelKey: 'label',
   valueKey: 'key',
   optionItems: [
     {'key':1,"label":"Option 1","disabled":false},
     {"key":2,"label":"Option 2","disabled":false},
     {"key":3,"label":"Option 3","disabled":false},
     {"key":4,"label":"Option 4","disabled":true},
     {"key":5,"label":"Option 5","disabled":false},
     {"key":6,"label":"Option 6","disabled":false},
     {"key":7,"label":"Option 7","disabled":false},
     {"key":8,"label":"Option 8","disabled":true},
     {"key":9,"label":"Option 9","disabled":false},
     {"key":10,"label":"Option 10","disabled":false},
     {"key":11,"label":"Option 11","disabled":false},
     {"key":12,"label":"Option 12","disabled":true},
     {"key":13,"label":"Option 13","disabled":false},
     {"key":14,"label":"Option 14","disabled":false},
     {"key":15,"label":"Option 15","disabled":false}
   ],
   required: false,
   requiredHint: '',
   validation: '',
   validationHint: '',
   //-------------------
   customClass: '',  //自定义css类名
   labelIconClass: null,
   labelIconPosition: 'rear',
   labelTooltip: null,
   //-------------------
   onCreated: '',
   onMounted: '',
   onRemoteQuery: '',
   onChange: '',
   onFocus: '',
   onBlur: '',
   onValidate: '',
    },
}
// // 20230325 FYCDC-Germ  add end
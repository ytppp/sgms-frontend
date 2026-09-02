import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'

import '@/assets/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive

// 注册指令
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

// svg图标
import '@vForm/styles/iconfont/iconfont.css'
import 'virtual:svg-icons-register'
import elementIcons from '@/components/SvgIcon/svgicon'

import './permission' // permission control

import { useDict } from '@/utils/dict'
import { getConfigKey } from "@/api/system/config"
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/sgms'
import modelerStore from '@/components/Process/common/global'

import SvgIcon from '@/components/SvgIcon'
// 分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 字典标签组件
import DictTag from '@/components/DictTag'
// 表单渲染组件
import VFormRender from '@vForm/form-render'
// 表单设计器组件
import VFormDesigner from '@vForm/form-designer'
import ContainerWidgets from '@vForm/form-designer/form-widget/container-widget/index'
import ContainerItems from '@vForm/form-render/container-item/index'
import Draggable from '@/../lib/vuedraggable/dist/vuedraggable.umd.js'
import { installI18n } from '@vForm/utils/i18n'
import { loadExtension } from '@vForm/extension/extension-loader'


const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.modelerStore = modelerStore
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.getConfigKey = getConfigKey
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
app.component('RightToolbar', RightToolbar)
app.component('Editor', Editor)
app.component('svg-icon', SvgIcon)
app.component('ContainerWidgets', ContainerWidgets)
app.component('ContainerItems', ContainerItems)
app.component('VFormRender', VFormRender)
app.component('VFormDesigner', VFormDesigner)
// 拖拽组件全局注册（vForm 设计器/渲染器模板中使用）
app.component('draggable', Draggable)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.use(ContainerWidgets)
app.use(ContainerItems)
installI18n(app)
loadExtension(app)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default'
})

app.mount('#app')

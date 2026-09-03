<template>
  <div
    :class="classObj"
    class="app-wrapper"
    :style="{
      '--current-color': theme,
      '--current-color-light': theme + '1a',
      '--current-color-dark-bg': theme + '33',
    }"
  >
    <div :class="{ 'fixed-header': fixedHeader }">
      <navbar @setLayout="setLayout" />
    </div>
    <div
      :class="{ sidebarHide: sidebar.hide }"
      class="main-container"
      :style="{
        marginTop: fixedHeader ? '64px' : 0,
      }"
    >
      <div class="sidebar-wrap">
        <div
          v-if="device === 'mobile' && sidebar.opened"
          class="drawer-bg"
          @click="handleClickOutside"
        />
        <sidebar v-if="!sidebar.hide" class="sidebar-container" />
      </div>
      <div class="app-main-container" style="padding: 0 16px; width: 100%">
        <div class="app-main-container__tools">
          <hamburger
            id="hamburger-container"
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
          />
          <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        </div>
        <app-main />
        <settings ref="settingRef" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import Sidebar from './components/Sidebar/index.vue'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import { AppMain, Navbar, Settings } from './components'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()
const theme = computed(() => settingsStore.theme)
const sidebar = computed(() => useAppStore().sidebar)
const device = computed(() => useAppStore().device)
const fixedHeader = computed(() => settingsStore.fixedHeader)

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile',
}))

const { width, height } = useWindowSize()
const WIDTH = 992 // refer to Bootstrap's responsive design

watch(
  () => device.value,
  () => {
    if (device.value === 'mobile' && sidebar.value.opened) {
      useAppStore().closeSideBar({ withoutAnimation: false })
    }
  },
)

watchEffect(() => {
  if (width.value - 1 < WIDTH) {
    useAppStore().toggleDevice('mobile')
    useAppStore().closeSideBar({ withoutAnimation: true })
  } else {
    useAppStore().toggleDevice('desktop')
  }
})

function handleClickOutside() {
  useAppStore().closeSideBar({ withoutAnimation: false })
}

function toggleSideBar() {
  appStore.toggleSideBar()
}

const settingRef = ref(null)
function setLayout() {
  settingRef.value.openSetting()
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixin.scss' as mix;
@use '@/assets/styles/variables.module.scss' as vars;

.app-wrapper {
  @include mix.clearfix;
  overflow: hidden;
  background-color: #f4f6f8;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}

.app-main-container {
  padding: 0 16px;
  width: 100%;
}
.app-main-container__tools {
  display: flex;
  align-items: center;
  height: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
  box-sizing: content-box;
}

.app-main-container__title {
  margin: 0;
  padding: 0;
  margin-bottom: 16px;
  font-size: 48px;
  line-height: 56px;
  font-weight: 400;
}

.hamburger-container {
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
  padding-right: 12px;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.breadcrumb-container {
}
</style>

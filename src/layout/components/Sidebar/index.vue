<template>
  <div :class="['sidebar-theme-wrapper', sideTheme]" class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="getMenuBackground"
        :text-color="getMenuTextColor"
        :unique-opened="true"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
        :class="[sideTheme, 'sgms-menu', `sgms-menu-${size}`]"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.module.scss'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

const route = useRoute()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const sidebarRouters = computed(() => permissionStore.sidebarRouters)
const sideTheme = computed(() => settingsStore.sideTheme)
const theme = computed(() => settingsStore.theme)
const isCollapse = computed(() => !appStore.sidebar.opened)
const size = computed(() => appStore.size)

// 获取菜单背景色
const getMenuBackground = computed(() => {
  if (settingsStore.isDark) {
    return 'var(--sidebar-bg)'
  }
  return sideTheme.value === 'theme-dark' ? variables.menuBg : variables.menuLightBg
})

// 获取菜单文字颜色
const getMenuTextColor = computed(() => {
  if (settingsStore.isDark) {
    return 'var(--sidebar-text)'
  }
  return sideTheme.value === 'theme-dark' ? variables.menuText : variables.menuLightText
})

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<style lang="scss" scoped>
.sidebar-container {
  // background-color: v-bind(getMenuBackground);

  // .scrollbar-wrapper {
  //   background-color: v-bind(getMenuBackground);
  // }

  // .el-menu {
  //   border: none;
  //   height: 100%;
  //   width: 100% !important;

  //   .el-menu-item, .el-sub-menu__title {
  //     &:hover {
  //       background-color: var(--menu-hover, rgba(0, 0, 0, 0.06)) !important;
  //     }
  //   }

  //   .el-menu-item {
  //     color: v-bind(getMenuTextColor);

  //     &.is-active {
  //       color: #154ec1 !important;
  //       background-color: var(--menu-hover, rgba(0, 0, 0, 0.06)) !important;
  //     }
  //   }

  //   .el-sub-menu__title {
  //     color: v-bind(getMenuTextColor);
  //   }
  // }
}
.sgms-menu {
  // large
  &.sgms-menu-large {
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      font-size: 20px;
      line-height: 56px;
    }
    :deep(.el-menu-item-group__title) {
      font-size: 20px;
    }
  }
  // default
  &.sgms-menu-default {
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      font-size: 18px;
      line-height: 48px;
    }
    :deep(.el-menu-item-group__title) {
      font-size: 18px;
    }
  }
  // small
  &.sgms-menu-small {
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      font-size: 16px;
      line-height: 40px;
    }
    :deep(.el-menu-item-group__title) {
      font-size: 16px;
    }
  }
}
</style>

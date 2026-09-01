<template>
  <div class="container">
    <VFormDesigner 
      ref="vfDesignerRef"
      :global-dsv="globalDsv"
	    :designer-config="designerConfig">
    </VFormDesigner>
  </div>
</template>

<script setup>
const designerConfig = ref({
  logoHeader: false,
  // generateSFCButton: false,
  toolbarMaxWidth: 470,
})

//全局数据源变量
const globalDsv = ref({
  testApiHost: 'http://www.test1.com/api',
  isShowLayoutType: false,
})
</script>

<style lang="scss">
</style>
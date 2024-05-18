<template>
    <img 
      :src="props.currentTheme === 'light' ? lightSvg.src : darkSvg.src" 
      :alt="props.altText"
      :height="props.size"
      :width="props.size"
    >
</template>

<script setup>

  const props = defineProps({
    currentTheme: String,
    lightSvg: Object, 
    darkSvg: Object, 
    size: Number,
    altText: String
  })

</script>

<style >

</style>
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String,
    default: '/images/banner-default.webp'
  },
  backgroundColor: {
    type: String,
    default: 'bg-primary'
  }
})
</script>

<template>
  <div 
    class="w-full h-64 relative flex items-center justify-center"
    :class="backgroundColor"
  >
    <!-- Background image with overlay -->
    <div 
      v-if="backgroundImage"
      class="absolute inset-0 bg-cover bg-center opacity-60" 
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>
    
    <!-- Content -->
    <div class="container-custom relative z-10 text-center">
      <h1 class="text-white text-4xl md:text-5xl font-bold">{{ title }}</h1>
    </div>
  </div>
</template> 
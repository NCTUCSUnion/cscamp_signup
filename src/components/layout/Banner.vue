<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String,
    default: '/images/banner-disable.webp'
  },
  backgroundColor: {
    type: String,
    default: 'bg-white'
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
      class="absolute inset-0 bg-cover bg-center"  
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>
    
    <!-- Dark overlay for text readability -->
    <div 
      v-if="backgroundImage"
      class="absolute inset-0 bg-black bg-opacity-30"
    ></div>
    
    <!-- Content -->
    <div class="container-custom relative z-10 text-center">
      <h1 class="text-white text-4xl md:text-5xl font-bold">{{ title }}</h1>
    </div>
  </div>
</template> 
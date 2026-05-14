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
  },
  // 'default' = 原本的圖片 banner；'team' = 各組漸層 + 紋理 hero
  variant: {
    type: String,
    default: 'default'
  }
})
</script>

<template>
  <!-- Team variant: 漸層 + blob 光暈 + dot pattern -->
  <div
    v-if="variant === 'team'"
    class="w-full h-48 md:h-80 relative flex items-center justify-center overflow-hidden"
    :class="backgroundColor"
  >
    <!-- 漸層覆蓋（讓純色多一點層次）-->
    <div class="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/20"></div>

    <!-- 右上光暈 -->
    <div class="absolute -top-20 -right-20 w-72 h-72 bg-white/25 rounded-full blur-[100px]"></div>
    <!-- 左下深色暈 -->
    <div class="absolute -bottom-24 -left-16 w-80 h-80 bg-black/15 rounded-full blur-[120px]"></div>

    <!-- Dot pattern 紋理 -->
    <div
      class="absolute inset-0 opacity-25"
      style="background-image: radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px); background-size: 22px 22px;"
    ></div>

    <!-- 內容 -->
    <div class="container-custom relative z-10 text-center">
      <h1 class="text-white text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">
        {{ title }}
      </h1>
      <div class="mt-5 mx-auto w-16 h-1 bg-white/70 rounded-full"></div>
    </div>
  </div>

  <!-- Default variant: 原本的圖片 banner -->
  <div
    v-else
    class="w-full h-44 md:h-64 relative flex items-center justify-center"
    :class="backgroundColor"
  >
    <!-- Background image with overlay -->
    <div
      v-if="backgroundImage"
      class="absolute inset-0 bg-cover bg-[position:15%_center] md:bg-center"
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

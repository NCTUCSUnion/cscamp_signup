<script setup>
import { ref, onMounted } from 'vue'
import ImageSlider from '../components/ui/ImageSlider.vue'
import campInfo from '../data/camp-info.json'

// Hero section background parallax effect
const heroRef = ref(null)
const handleScroll = () => {
  if (heroRef.value) {
    const scrollPosition = window.scrollY
    heroRef.value.style.backgroundPositionY = `${scrollPosition * 0.5}px`
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div 
      ref="heroRef"
      class="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
      style="background-image: url('/images/hero-bg.webp');"
    >
      <div class="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      <div class="container-custom relative z-10 text-center text-white hero-content">
        <h1 class="text-8xl md:text-8xl font-bold mb-8 tracking-wider">{{ campInfo.campName }}</h1>
        <p class="text-2xl text-gray-300 md:text-2xl mb-2">{{ campInfo.slogan }}</p>
        <p class="text-xl text-gray-300 md:text-2xl mb-10">{{ campInfo.mainInfo.date }}</p>
        <a 
          href="https://forms.gle/XQW8x9MB258HQm5v8" 
          class="btn-primary text-xl py-3 px-8"
        >
          立即報名
        </a>
      </div>
    </div>

    <!-- Main Information Section -->
    <section class="py-16 bg-gray-100">
      <div class="container-custom">
        <h2 class="text-center mb-12">營隊資訊</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left: Slideshow -->
          <div>
            <ImageSlider 
              :images="campInfo.images.slideshow"
              height="h-80 md:h-96"
              :autoplay-delay="3000"
            />
          </div>
          
          <!-- Right: Key Info -->
          <div class="flex flex-col justify-center space-y-6">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="bg-primary text-white p-2 rounded-full mr-4 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg">日期</h3>
                    <p>{{ campInfo.mainInfo.date }}</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="bg-primary text-white p-2 rounded-full mr-4 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg">地點</h3>
                    <p>{{ campInfo.mainInfo.location }}</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="bg-primary text-white p-2 rounded-full mr-4 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg">對象</h3>
                    <p>{{ campInfo.mainInfo.audience }}</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="bg-primary text-white p-2 rounded-full mr-4 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg">費用</h3>
                    <p>{{ campInfo.mainInfo.fee }}</p>
                  </div>
                </li>
              </ul>
              
              <div class="mt-8 text-center">
                <a 
                  href="https://forms.gle/XQW8x9MB258HQm5v8" 
                  class="btn-primary"
                >
                  立即報名
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Navigation Cards -->
    <section class="py-16">
      <div class="container-custom">
        <h2 class="text-center mb-12">探索更多</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Registration Card -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div class="h-48 bg-cover bg-center" style="background-image: url('/images/registration-card.webp');"></div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">報名資訊</h3>
              <p class="text-gray-600 mb-4">了解報名流程、費用說明與重要時程。</p>
              <router-link 
                to="/registration" 
                class="text-primary font-semibold hover:underline inline-flex items-center"
              >
                查看詳情
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
          
          <!-- Teams Card -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div class="h-48 bg-cover bg-center" style="background-image: url('/images/teams-card.webp');"></div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">各組介紹</h3>
              <p class="text-gray-600 mb-4">認識六大組別與他們的職責。</p>
              <router-link 
                to="/team" 
                class="text-primary font-semibold hover:underline inline-flex items-center"
              >
                查看詳情
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
          
          <!-- Courses Card -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div class="h-48 bg-cover bg-center" style="background-image: url('/images/courses-card.webp');"></div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">課程簡介</h3>
              <p class="text-gray-600 mb-4">探索我們精心設計的程式教學課程。</p>
              <router-link 
                to="/courses" 
                class="text-primary font-semibold hover:underline inline-flex items-center"
              >
                查看詳情
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-content {
  transform: translateY(-8vh);
}

@media (max-width: 640px) {
  .hero-content h1 {
    font-size: 3rem;
  }
  
  .hero-content p {
    font-size: 1.25rem;
  }
}
</style> 
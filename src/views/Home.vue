<script setup>
import ImageSlider from '../components/ui/ImageSlider.vue'
import campInfo from '../data/camp-info.json'
</script>

<template>
  <div class="bg-[#f9fafb] selection:bg-primary/30">
    <!-- Hero Section -->
    <div 
      class="w-full h-screen bg-cover bg-bottom flex items-center justify-center relative"
      style="background-image: url('/images/hero-bg.webp');"
    >
      <div class="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      <div class="container-custom relative z-10 text-center text-white hero-content">
        <h1 class="text-8xl md:text-8xl font-bold mb-8 tracking-wider">{{ campInfo.campName }}</h1>
        <h2 class="text-4xl text-gray-300 md:text-5xl mb-10 tracking-wider">{{ campInfo.slogan }}</h2>
        <p class="text-xl text-gray-300 md:text-2xl mb-10">{{ campInfo.mainInfo.date }}</p>
        <a 
          :href="campInfo.registration.formUrl" 
          class="btn-primary text-xl py-3 px-8 inline-block shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          立即報名
        </a>
      </div>
    </div>

    <!-- Main Information Section -->
    <section class="py-20 md:py-32 relative overflow-hidden">
      <!-- Decorational background layers -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#f9fafb] via-primary/5 to-[#f9fafb] pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
      <div class="absolute bottom-0 left-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

      <div class="container-custom relative z-10">
        <div class="text-center mb-16 md:mb-20">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight relative inline-block">
            營隊資訊
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-full"></div>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-6xl mx-auto items-stretch">
          <!-- Left: Slideshow -->
          <div class="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 ring-1 ring-primary/10">
            <ImageSlider 
              :images="campInfo.images.slideshow"
              height="h-80 md:h-full md:min-h-[28rem]"
              :autoplay-delay="3000"
            />
          </div>

          <!-- Right: Key Info -->
          <div class="flex flex-col justify-center">
            <div class="relative bg-gradient-to-br from-white to-gray-50 p-8 md:p-10 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] overflow-hidden">
              <div class="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

              <ul class="space-y-5 relative z-10">
                <li class="group flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg text-gray-900">日期</h3>
                    <p class="text-gray-600">{{ campInfo.mainInfo.date }}</p>
                  </div>
                </li>
                <li class="group flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg text-gray-900">地點</h3>
                    <p class="text-gray-600">{{ campInfo.mainInfo.location }}</p>
                  </div>
                </li>
                <li class="group flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg text-gray-900">對象</h3>
                    <p class="text-gray-600">{{ campInfo.mainInfo.audience }}</p>
                  </div>
                </li>
                <li class="group flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg text-gray-900">費用</h3>
                    <p class="text-gray-600">{{ campInfo.mainInfo.fee }}</p>
                  </div>
                </li>
              </ul>

              <div class="mt-8 text-center relative z-10">
                <a 
                  :href="campInfo.registration.formUrl" 
                  class="btn-primary inline-block shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
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
    <section class="py-20 md:py-32 relative overflow-hidden bg-white">
      <!-- Subtle top border with gradient -->
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/5 via-white to-white pointer-events-none"></div>

      <div class="container-custom relative z-10">
        <div class="text-center mb-16 md:mb-20">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight relative inline-block">
            探索更多
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-full"></div>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          <!-- Registration Card -->
          <router-link 
            to="/registration" 
            class="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.25)] hover:-translate-y-2 transition-all duration-500 overflow-hidden block"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" style="background-image: url('/images/registration-card.webp');"></div>
            </div>
            <div class="p-6 relative z-20">
              <h3 class="text-xl font-bold mb-2 text-gray-900 tracking-tight">報名資訊</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">了解報名流程、費用說明與重要時程。</p>
              <span class="text-primary font-semibold inline-flex items-center">
                查看詳情
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </router-link>

          <!-- Teams Card -->
          <router-link 
            to="/team" 
            class="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.25)] hover:-translate-y-2 transition-all duration-500 overflow-hidden block"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" style="background-image: url('/images/teams-card.webp');"></div>
            </div>
            <div class="p-6 relative z-20">
              <h3 class="text-xl font-bold mb-2 text-gray-900 tracking-tight">各組介紹</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">認識六大組別與他們的職責。</p>
              <span class="text-primary font-semibold inline-flex items-center">
                查看詳情
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </router-link>

          <!-- Courses Card -->
          <router-link 
            to="/courses" 
            class="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.25)] hover:-translate-y-2 transition-all duration-500 overflow-hidden block"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" style="background-image: url('/images/courses-card.webp');"></div>
            </div>
            <div class="p-6 relative z-20">
              <h3 class="text-xl font-bold mb-2 text-gray-900 tracking-tight">課程簡介</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">探索我們精心設計的程式教學課程。</p>
              <span class="text-primary font-semibold inline-flex items-center">
                查看詳情
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </router-link>
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

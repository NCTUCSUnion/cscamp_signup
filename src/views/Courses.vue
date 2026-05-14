<script setup>
import Banner from '../components/layout/Banner.vue'
import campInfo from '../data/camp-info.json'
</script>

<template>
  <div class="bg-[#f9fafb] selection:bg-primary/30">
    <Banner 
      title="課程簡介" 
      backgroundImage="/images/banner-default.webp"
    />

    <div class="py-20 md:py-32 relative overflow-hidden">
      <!-- Decorational background layers -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#f9fafb] via-primary/5 to-[#f9fafb] pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
      <div class="absolute bottom-0 left-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none -translate-x-1/3 translate-y-1/4"></div>
      
      <div class="container-custom relative z-10">
        <div class="text-center mb-20 md:mb-32">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight relative inline-block">
            精心設計的學習體驗
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-full"></div>
          </h2>
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mt-8">
            我們的課程從基礎程式設計概念開始，循序漸進地引導學員學習進階主題，並透過專題實作鞏固所學知識。
            全程由專業講師與助教團隊陪伴，確保每位學員都能獲得充分的指導與協助。
          </p>
          <p class="max-w-2xl mx-auto text-sm md:text-base text-gray-500 mt-4">
            課程會在營期的第二～四天進行，共三天。
          </p>
        </div>

        <!-- Course Timeline -->
        <div class="max-w-6xl mx-auto relative">
          <!-- Timeline Track for Desktop -->
          <div class="hidden md:block absolute left-1/2 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 -translate-x-1/2"></div>
          
          <div class="space-y-24 md:space-y-36">
            <div 
              v-for="(course, index) in campInfo.courses" 
              :key="index"
              class="relative flex flex-col md:flex-row items-center gap-3 md:gap-20 group"
              :class="index % 2 === 1 ? 'md:flex-row-reverse' : ''"
            >
              <!-- Timeline Marker -->
              <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-2xl shadow-xl shadow-primary/20 items-center justify-center z-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-primary/20">
                <span class="text-primary font-black text-2xl">0{{ index + 1 }}</span>
              </div>

              <!-- Image Side -->
              <div class="w-full md:w-1/2 z-10">
                <div 
                  class="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-primary/30 transition-all duration-700"
                  :class="[
                    index % 2 === 1 ? 'md:rounded-tl-[5rem]' : 'md:rounded-tr-[5rem]',
                    index === 0 ? 'bg-[#1e3a5f]' : 'bg-gray-100'
                  ]"
                >
                  <div class="absolute inset-0 bg-primary/10 mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <img 
                    :src="`/images/courses/day${index + 1}.webp`" 
                    :alt="course.time"
                    loading="lazy"
                    class="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    :class="index === 0 ? 'object-contain p-6 md:p-10' : 'object-cover'"
                  />
                  
                  <!-- Mobile Day Badge (Floating on image) -->
                  <div class="md:hidden absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-2 rounded-xl shadow-lg z-20 border border-primary/10">
                    <span class="text-primary font-bold tracking-wider">{{ course.time }}</span>
                  </div>
                </div>
              </div>

              <!-- Content Side -->
              <div class="w-full md:w-1/2 z-10">
                <div class="relative px-2 md:p-10 pt-2 md:pt-10 transition-transform duration-500 group-hover:-translate-y-2">
                  <!-- Decorative subtle number -->
                  <div class="absolute -top-4 md:-top-16 -left-2 md:-left-10 text-7xl md:text-9xl font-black text-primary/10 select-none pointer-events-none transition-transform duration-700 group-hover:-translate-x-4">
                    0{{ index + 1 }}
                  </div>
                  
                  <div class="hidden md:inline-block px-5 py-2 rounded-xl bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-6 shadow-sm">
                    {{ course.time }}
                  </div>
                  
                  <h3 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight relative z-10">{{ course.title }}</h3>
                  
                  <p class="text-gray-600 leading-relaxed text-lg md:text-xl text-justify font-light relative z-10">
                    {{ course.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Highlights -->
    <div class="py-24 relative overflow-hidden bg-white">
      <!-- Subtle top border with gradient -->
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-primary/5 via-white to-white pointer-events-none"></div>
      
      <div class="container-custom relative z-10">
        <div class="text-center mb-20">
          <h3 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">課程特色</h3>
          <div class="w-16 h-1 bg-primary/60 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          <!-- Highlight 1 -->
          <div class="group relative bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.25)] hover:-translate-y-2 transition-all duration-500 border border-primary/15 flex flex-col items-center text-center overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-sm relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 class="text-2xl font-bold mb-4 text-gray-900 relative z-10 tracking-tight">從零開始的學習</h4>
            <p class="text-gray-600 leading-relaxed font-light relative z-10">
              無需任何程式基礎，我們的課程設計讓完全沒有接觸過程式的學員也能輕鬆上手。
            </p>
          </div>
          
          <!-- Highlight 2 -->
          <div class="group relative bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.25)] hover:-translate-y-2 transition-all duration-500 border border-primary/15 flex flex-col items-center text-center overflow-hidden md:translate-y-8">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 transform group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500 shadow-sm relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 class="text-2xl font-bold mb-4 text-gray-900 relative z-10 tracking-tight">小組合作開發</h4>
            <p class="text-gray-600 leading-relaxed font-light relative z-10">
              透過團隊合作完成專案，培養溝通協作能力，並學習如何在團隊中解決問題。
            </p>
          </div>
          
          <!-- Highlight 3 -->
          <div class="group relative bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.25)] hover:-translate-y-2 transition-all duration-500 border border-primary/15 flex flex-col items-center text-center overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-sm relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h4 class="text-2xl font-bold mb-4 text-gray-900 relative z-10 tracking-tight">了解最新科技</h4>
            <p class="text-gray-600 leading-relaxed font-light relative z-10">
              課程精心設計圍繞 Python 程式設計與機器學習技術，引領學員探索 AI 領域最新發展，親身體驗未來科技的無限可能。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
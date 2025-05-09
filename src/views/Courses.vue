<script setup>
import { ref } from 'vue'
import Banner from '../components/layout/Banner.vue'
import campInfo from '../data/camp-info.json'

// For accordion state
const openItems = ref({})

const toggleItem = (index) => {
  openItems.value = {
    ...openItems.value,
    [index]: !openItems.value[index]
  }
}
</script>

<template>
  <div>
    <Banner 
      title="課程簡介" 
      backgroundColor="bg-primary"
    />

    <div class="container-custom py-16">
      <div class="text-center mb-12">
        <h2 class="mb-4">精心設計的學習體驗</h2>
        <p class="max-w-3xl mx-auto text-lg text-gray-600">
          我們的課程從基礎程式設計概念開始，循序漸進地引導學員學習進階主題，並透過專題實作鞏固所學知識。
          全程由專業講師與助教團隊陪伴，確保每位學員都能獲得充分的指導與協助。
        </p>
      </div>

      <!-- Course Schedule Accordion -->
      <div class="mb-16 max-w-4xl mx-auto">
        <h3 class="text-2xl font-bold mb-8 text-center">課程時間表</h3>
        
        <div class="space-y-4">
          <div 
            v-for="(course, index) in campInfo.courses" 
            :key="index"
            class="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <!-- Accordion Header -->
            <div 
              @click="toggleItem(index)"
              class="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50"
            >
              <div>
                <h4 class="text-xl font-semibold">{{ course.title }}</h4>
                <div class="text-gray-500 mt-1">{{ course.time }}</div>
              </div>
              <div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-6 w-6 text-primary transition-transform" 
                  :class="{ 'transform rotate-180': openItems[index] }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <!-- Accordion Content -->
            <div 
              v-show="openItems[index]"
              class="px-6 pb-6 pt-2 border-t border-gray-200"
            >
              <p>{{ course.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Highlights -->
      <div>
        <h3 class="text-2xl font-bold mb-8 text-center">課程特色</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Highlight 1 -->
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-2">從零開始的學習</h4>
            <p class="text-gray-600">
              無需任何程式基礎，我們的課程設計讓完全沒有接觸過程式的學員也能輕鬆上手。
            </p>
          </div>
          
          <!-- Highlight 2 -->
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-2">小組合作開發</h4>
            <p class="text-gray-600">
              透過團隊合作完成專案，培養溝通協作能力，並學習如何在團隊中解決問題。
            </p>
          </div>
          
          <!-- Highlight 3 -->
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-2">了解最新科技</h4>
            <p class="text-gray-600">
              課程精心設計圍繞 Python 程式設計與 Multi-agent LLM 技術，引領學員探索 AI 領域最新發展，親身體驗未來科技的無限可能。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
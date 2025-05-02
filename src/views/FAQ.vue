<script setup>
import { ref, computed } from 'vue'
import Banner from '../components/layout/Banner.vue'
import campInfo from '../data/camp-info.json'

// For filtering and search
const searchTerm = ref('')
const activeTag = ref('全部')

// Predefined tags for categorization
const tags = [
  '全部',
  '報名',
  '課程',
  '住宿',
  '費用',
  '其他'
]

// Tag assignment (in a real app, these would be in the JSON)
const faqTags = {
  0: '課程',
  1: '課程',
  2: '住宿',
  3: '住宿',
  4: '報名',
  5: '報名',
  6: '其他',
  7: '其他',
  8: '其他',
  9: '費用',
  10: '費用',
  11: '其他'
}

// Filtered FAQs
const filteredFaqs = computed(() => {
  return campInfo.faqs.filter((faq, index) => {
    // Tag filter
    if (activeTag.value !== '全部' && faqTags[index] !== activeTag.value) {
      return false
    }
    
    // Search filter
    if (searchTerm.value.trim() !== '') {
      const searchLower = searchTerm.value.toLowerCase()
      return (
        faq.question.toLowerCase().includes(searchLower) ||
        faq.answer.toLowerCase().includes(searchLower)
      )
    }
    
    return true
  })
})

// Accordion functionality
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
      title="常見問答" 
      backgroundColor="bg-primary"
    />

    <div class="container-custom py-16">
      <div class="text-center mb-12">
        <h2 class="mb-4">常見問題</h2>
        <p class="max-w-3xl mx-auto text-lg text-gray-600">
          我們整理了學員最常詢問的問題，如果您有其他疑問，歡迎透過聯絡方式與我們洽詢。
        </p>
      </div>

      <!-- Search and Filter -->
      <div class="mb-10 max-w-2xl mx-auto">
        <div class="relative mb-6">
          <input 
            type="text"
            v-model="searchTerm"
            placeholder="搜尋問題..."
            class="w-full py-3 px-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <!-- Tags -->
        <div class="flex flex-wrap justify-center gap-2">
          <button 
            v-for="tag in tags" 
            :key="tag"
            @click="activeTag = tag"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeTag === tag 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- FAQs -->
      <div class="max-w-3xl mx-auto">
        <div v-if="filteredFaqs.length === 0" class="text-center py-8">
          <p class="text-lg text-gray-500">沒有符合搜尋條件的問題。請嘗試其他關鍵字。</p>
        </div>
        
        <div v-else class="space-y-4">
          <div 
            v-for="(faq, index) in filteredFaqs" 
            :key="index"
            class="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <!-- Question -->
            <div 
              @click="toggleItem(index)"
              class="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50"
            >
              <h3 class="text-lg font-semibold pr-8">{{ faq.question }}</h3>
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
            
            <!-- Answer -->
            <div 
              v-show="openItems[index]"
              class="px-6 pb-6 pt-2 border-t border-gray-200"
            >
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Still Have Questions CTA -->
      <div class="mt-16 bg-gray-100 p-8 rounded-lg text-center max-w-3xl mx-auto">
        <h3 class="text-xl font-semibold mb-4">還有其他問題？</h3>
        <p class="mb-6">如果以上問答沒有解決您的疑問，歡迎透過以下方式聯絡我們：</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="mailto:cscamp@cs.nctu.edu.tw" 
            class="inline-flex items-center justify-center bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            寄送郵件
          </a>
          <a 
            href="https://www.facebook.com/nctucsChaseDream" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center justify-center bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
            Facebook粉專
          </a>
          <a 
            href="https://www.instagram.com/nctucs_chasedream/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center justify-center bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </div>
  </div>
</template> 
<script setup>
import Banner from '../components/layout/Banner.vue'
import campInfo from '../data/camp-info.json'
</script>

<template>
  <div>
    <Banner 
      title="報名資訊" 
      backgroundColor="bg-primary"
      backgroundImage="/images/registration-banner.jpg"
    />

    <div class="container-custom py-16">
      <!-- Registration Timeline -->
      <section class="mb-16">
        <h2 class="text-center mb-12">報名流程</h2>
        
        <div class="timeline-container relative">
          <!-- Desktop Timeline Line -->
          <div class="absolute top-0 left-1/2 w-1 h-full bg-gray-200 -translate-x-1/2 hidden md:block"></div>
          
          <!-- Timeline Items -->
          <div class="timeline-items space-y-12">
            <div 
              v-for="(item, index) in campInfo.registration.timeline" 
              :key="index"
              class="timeline-item relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0"
            >
              <!-- Date Block - alternating sides for desktop -->
              <div 
                :class="[
                  'timeline-content md:flex relative', 
                  index % 2 === 0 ? 'md:justify-end md:pr-8' : 'md:left-1/2 md:translate-x-1/2 md:order-last md:justify-start md:pl-8'
                ]"
              >
                <div class="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                  <h3 class="text-xl font-bold text-primary mb-2">{{ item.label }}</h3>
                  <div class="text-lg font-semibold">{{ item.date }}</div>
                  <p class="text-gray-600 mt-2">{{ item.description }}</p>
                </div>

                <!-- Mobile Only - Timeline Node -->
                <div class="timeline-node-mobile md:hidden absolute top-1/2 -left-6 -translate-y-1/2">
                  <div class="w-5 h-5 bg-primary rounded-full border-4 border-white"></div>
                </div>
              </div>
              
              <!-- Timeline Node - visible on desktop -->
              <div class="timeline-node-desktop absolute top-6 left-1/2 -translate-x-1/2 hidden md:block">
                <div class="w-5 h-5 bg-primary rounded-full border-4 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Fee Information -->
      <section class="mb-16">
        <h2 class="text-center mb-12">費用說明</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left: Fee Details -->
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h3 class="text-2xl font-bold text-primary mb-6">營隊費用</h3>
            <div class="text-xl font-semibold mb-4">{{ campInfo.registration.fee.amount }}</div>
            
            <h4 class="text-lg font-semibold mt-6 mb-4">費用包含項目：</h4>
            <ul class="space-y-2">
              <li v-for="(item, index) in campInfo.registration.fee.includes" :key="index" class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ item }}
              </li>
            </ul>
          </div>
          
          <!-- Right: Refund Policy -->
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h3 class="text-2xl font-bold text-primary mb-6">退費政策</h3>
            
            <div class="space-y-6">
              <div v-for="(policy, index) in campInfo.registration.fee.refundPolicy" :key="index" class="border-b border-gray-200 pb-4 last:border-0">
                <h4 class="font-semibold">
                  <span class="inline-block bg-primary text-white rounded-full w-6 h-6 text-center mr-2">{{ index + 1 }}</span>
                  {{ policy.deadline }}
                </h4>
                <div class="pl-8 mt-2">
                  <div class="mb-1">
                    <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-primary rounded-full" 
                        :style="{ width: `${policy.percentage}%` }"
                      ></div>
                    </div>
                  </div>
                  <p>{{ policy.condition }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Registration CTA -->
      <section class="bg-gray-100 p-8 rounded-lg text-center">
        <h2 class="mb-6">準備好成為營隊的一員了嗎？</h2>
        <p class="mb-8 text-lg">點擊下方按鈕填寫報名表單，開始你的程式學習之旅！</p>
        <a 
          :href="campInfo.registration.formUrl" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-primary text-xl py-3 px-8 font-heading"
        >
          前往報名表單
        </a>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Timeline Styles */
@media (max-width: 768px) {
  .timeline-container {
    padding-left: 30px;
  }

  .timeline-container::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    width: 2px;
    background-color: #e5e7eb;
  }

  .timeline-item {
    position: relative;
    padding-left: 15px;
  }

  .timeline-node-mobile {
    left: -35px !important;
    z-index: 10;
  }
  
  .timeline-content {
    position: relative;
  }
}
</style> 
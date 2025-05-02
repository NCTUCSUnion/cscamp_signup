<script setup>
import Banner from '../components/layout/Banner.vue'
import campInfo from '../data/camp-info.json'

// 獲取團隊背景色的函數
function getTeamColor(teamId) {
  switch (teamId) {
    case 'admin': return 'bg-admin';
    case 'event': return 'bg-event';
    case 'design': return 'bg-design';
    case 'life': return 'bg-life';
    case 'study': return 'bg-study';
    case 'facilities': return 'bg-facilities';
    default: return 'bg-primary';
  }
}
</script>

<template>
  <div>
    <Banner 
      title="各組介紹" 
      backgroundColor="bg-primary"
    />

    <div class="container-custom py-16">
      <div class="text-center mb-12">
        <h2 class="mb-4">營隊六大組別</h2>
        <p class="max-w-3xl mx-auto text-lg text-gray-600">
          交大資訊逐夢營由六大組別共同合作，打造最專業的營隊體驗。每個組別各司其職，齊心協力為學員提供最優質的學習與生活環境。
        </p>
      </div>

      <!-- Team Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="team in campInfo.teams" 
          :key="team.id"
          class="group bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2"
        >
          <!-- Team Header -->
          <div 
            class="h-24 flex items-center justify-center p-4"
            :class="getTeamColor(team.id)"
          >
            <h3 class="text-2xl font-bold text-white">{{ team.name }}</h3>
          </div>
          
          <!-- Team Content -->
          <div class="p-6">
            <p class="text-gray-600 mb-6">{{ team.description }}</p>
            
            <h4 class="font-semibold text-lg mb-4">主要職責：</h4>
            <ul class="space-y-2 mb-8">
              <li v-for="(item, index) in team.responsibilities" :key="index" class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ item }}</span>
              </li>
            </ul>
            
            <!-- Team Link -->
            <div class="text-center">
              <router-link 
                :to="`/team/${team.id}`" 
                class="inline-flex items-center text-primary font-semibold group-hover:underline"
              >
                瞭解更多
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
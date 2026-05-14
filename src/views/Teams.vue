<script setup>
import Banner from '../components/layout/Banner.vue'
import ImageSlider from '../components/ui/ImageSlider.vue'
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

// 獲取團隊文字色，用於 hover 強調與 list icon
function getTeamTextColor(teamId) {
  switch (teamId) {
    case 'admin': return 'text-admin';
    case 'event': return 'text-event';
    case 'design': return 'text-design';
    case 'life': return 'text-life';
    case 'study': return 'text-study';
    case 'facilities': return 'text-facilities';
    default: return 'text-primary';
  }
}
</script>

<template>
  <div class="bg-[#f9fafb] selection:bg-primary/30">
    <Banner 
      title="各組介紹" 
      backgroundImage="/images/banner-default.webp"
    />

    <div class="py-20 md:py-32 relative overflow-hidden">
      <!-- Decorational background layers -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#f9fafb] via-primary/5 to-[#f9fafb] pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
      <div class="absolute bottom-0 left-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

      <div class="container-custom relative z-10">
        <div class="text-center mb-16 md:mb-20">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight relative inline-block">
            營隊六大組別
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-full"></div>
          </h2>
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mt-8">
            交大資訊逐夢營由六大組別共同合作<br>
            打造最專業的營隊體驗<br>
            每個組別各司其職，齊心協力為學員提供最優質的學習與生活環境
          </p>
        </div>

        <!-- Team Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div 
            v-for="team in campInfo.teams" 
            :key="team.id"
            class="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.22)] hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col"
          >
            <!-- Team Header -->
            <div 
              class="h-28 flex items-center justify-center p-4 relative overflow-hidden"
              :class="getTeamColor(team.id)"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
              <div class="absolute -top-8 -right-8 w-32 h-32 bg-white/15 rounded-full blur-2xl pointer-events-none"></div>
              <h3 class="text-2xl font-extrabold text-white tracking-tight relative z-10 drop-shadow-sm">{{ team.name }}</h3>
            </div>

            <!-- Team Image Slider -->
            <div v-if="campInfo.images.teams[team.id]?.length > 0" class="overflow-hidden">
              <ImageSlider
                :images="campInfo.images.teams[team.id]"
                height="h-48"
                :autoplay-delay="4000"
                :rounded="false"
              />
            </div>

            <!-- Team Content -->
            <div class="p-6 md:p-7 flex flex-col flex-1">
              <p class="text-gray-600 mb-6 leading-relaxed">{{ team.description }}</p>

              <h4 class="font-semibold text-base mb-3 text-gray-900 flex items-center gap-2">
                <span class="w-1 h-4 rounded-full" :class="getTeamColor(team.id)"></span>
                主要職責
              </h4>
              <ul class="space-y-2.5 mb-6 flex-1">
                <li v-for="(item, index) in team.responsibilities" :key="index" class="flex items-start gap-2 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 flex-shrink-0" :class="getTeamTextColor(team.id)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="leading-relaxed">{{ item }}</span>
                </li>
              </ul>

              <!-- Team Link -->
              <div class="pt-4 border-t border-primary/10">
                <router-link 
                  :to="`/team/${team.id}`" 
                  class="inline-flex items-center font-semibold transition-all duration-300 group-hover:gap-2"
                  :class="getTeamTextColor(team.id)"
                >
                  瞭解更多
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

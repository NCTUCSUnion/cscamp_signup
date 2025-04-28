<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Banner from '../../components/layout/Banner.vue'
import ImageSlider from '../../components/ui/ImageSlider.vue'
import MemberCard from '../../components/team/MemberCard.vue'
import campInfo from '../../data/camp-info.json'

// Accept teamId as a prop
const props = defineProps({
  teamId: {
    type: String,
    default: 'admin'
  }
})

const route = useRoute()
// Use prop teamId instead of route params
const currentTeamId = computed(() => props.teamId)

const team = computed(() => {
  return campInfo.teams.find(t => t.id === currentTeamId.value) || campInfo.teams[0]
})

const teamImages = computed(() => {
  return campInfo.images.teams[currentTeamId.value] || []
})

// 根據團隊 ID 獲取對應的背景色類
const getBackgroundColor = computed(() => {
  switch (currentTeamId.value) {
    case 'admin': return 'bg-admin';
    case 'event': return 'bg-event';
    case 'design': return 'bg-design';
    case 'life': return 'bg-life';
    case 'study': return 'bg-study';
    case 'facilities': return 'bg-facilities';
    default: return 'bg-primary';
  }
})

// 根據團隊 ID 獲取對應的文字色類
const getTextColor = computed(() => {
  switch (currentTeamId.value) {
    case 'admin': return 'text-admin';
    case 'event': return 'text-event';
    case 'design': return 'text-design';
    case 'life': return 'text-life';
    case 'study': return 'text-study';
    case 'facilities': return 'text-facilities';
    default: return 'text-primary';
  }
})
</script>

<template>
  <div>
    <!-- Team Banner -->
    <Banner 
      :title="team.name" 
      :backgroundColor="getBackgroundColor"
      backgroundImage="/images/teams-banner.jpg"
    />

    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Left: Team Info -->
        <div>
          <h2 class="mb-6">{{ team.name }}簡介</h2>
          <p class="text-lg mb-8">{{ team.description }}</p>
          
          <h3 class="text-xl font-semibold mb-4">主要職責</h3>
          <ul class="space-y-4">
            <li v-for="(item, index) in team.responsibilities" :key="index" class="flex items-start">
              <div :class="[getTextColor, 'mr-3 mt-0.5']">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-lg">{{ item }}</span>
            </li>
          </ul>
        </div>
        
        <!-- Right: Team Photos -->
        <div>
          <div v-if="teamImages.length > 0">
            <h3 class="text-xl font-semibold mb-6">歷屆組員照片</h3>
            <ImageSlider 
              :images="teamImages"
              height="h-80 md:h-96"
              :autoplay-delay="4000"
            />
          </div>
          <div v-else class="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
            <p class="text-gray-500">照片準備中...</p>
          </div>
        </div>
      </div>
      
      <!-- Team Members Section -->
      <section class="mt-16" v-if="team.members && team.members.length > 0">
        <h2 class="text-center mb-8">{{ team.name }}成員</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MemberCard 
            v-for="(member, index) in team.members" 
            :key="index" 
            :member="member"
            :teamColor="team.color"
          />
        </div>
      </section>
      
      <!-- Back to Teams -->
      <div class="mt-16 text-center">
        <router-link 
          to="/team" 
          class="inline-flex items-center text-primary hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          返回組別總覽
        </router-link>
      </div>
    </div>
  </div>
</template> 
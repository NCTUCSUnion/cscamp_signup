<script setup>
import { computed } from 'vue'
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

const currentTeamId = computed(() => props.teamId)

const team = computed(() => {
  return campInfo.teams.find(t => t.id === currentTeamId.value) || campInfo.teams[0]
})

const teamImages = computed(() => {
  return campInfo.images.teams[currentTeamId.value] || []
})

// 各組 Tailwind class 查找表（JIT safe）
const getBackgroundColor = computed(() => {
  switch (currentTeamId.value) {
    case 'admin': return 'bg-admin'
    case 'event': return 'bg-event'
    case 'design': return 'bg-design'
    case 'life': return 'bg-life'
    case 'study': return 'bg-study'
    case 'facilities': return 'bg-facilities'
    default: return 'bg-primary'
  }
})

const getTextColor = computed(() => {
  switch (currentTeamId.value) {
    case 'admin': return 'text-admin'
    case 'event': return 'text-event'
    case 'design': return 'text-design'
    case 'life': return 'text-life'
    case 'study': return 'text-study'
    case 'facilities': return 'text-facilities'
    default: return 'text-primary'
  }
})

const getSoftBg = computed(() => {
  switch (currentTeamId.value) {
    case 'admin': return 'bg-admin-soft'
    case 'event': return 'bg-event-soft'
    case 'design': return 'bg-design-soft'
    case 'life': return 'bg-life-soft'
    case 'study': return 'bg-study-soft'
    case 'facilities': return 'bg-facilities-soft'
    default: return 'bg-primary/10'
  }
})

const getBorderColor = computed(() => {
  switch (currentTeamId.value) {
    case 'admin': return 'border-admin/20'
    case 'event': return 'border-event/20'
    case 'design': return 'border-design/20'
    case 'life': return 'border-life/20'
    case 'study': return 'border-study/20'
    case 'facilities': return 'border-facilities/20'
    default: return 'border-primary/20'
  }
})

const getRingColor = computed(() => {
  switch (currentTeamId.value) {
    case 'admin': return 'bg-admin/10'
    case 'event': return 'bg-event/10'
    case 'design': return 'bg-design/10'
    case 'life': return 'bg-life/10'
    case 'study': return 'bg-study/10'
    case 'facilities': return 'bg-facilities/10'
    default: return 'bg-primary/10'
  }
})
</script>

<template>
  <div>
    <!-- Team Banner -->
    <Banner 
      :title="team.name" 
      :backgroundColor="getBackgroundColor"
      variant="team"
    />

    <!-- Main content with gradient background -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#f9fafb] via-primary/5 to-[#f9fafb] py-16 md:py-20">
      <!-- Decorative blobs -->
      <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px]" :class="getRingColor"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[120px]" :class="getRingColor"></div>

      <div class="container-custom relative z-10">
        <!-- Intro + Photos -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Left: Team Info -->
          <div>
            <div class="flex items-center gap-3 mb-5">
              <div class="w-12 h-1.5 rounded-full" :class="getBackgroundColor"></div>
              <span class="text-sm font-semibold tracking-widest uppercase" :class="getTextColor">
                Team Intro
              </span>
            </div>

            <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight mb-5">
              關於{{ team.name }}
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-8">{{ team.description }}</p>

            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="getTextColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              主要職責
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(item, index) in team.responsibilities"
                :key="index"
                class="flex items-start gap-3 p-3 rounded-xl border transition-all hover:translate-x-1"
                :class="[getSoftBg, getBorderColor]"
              >
                <div class="flex-shrink-0 mt-0.5" :class="getTextColor">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-800">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Right: Team Photos -->
          <div>
            <div
              v-if="teamImages.length > 0"
              class="rounded-3xl overflow-hidden border shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
              :class="getBorderColor"
            >
              <ImageSlider 
                :images="teamImages"
                height="h-80 md:h-96"
                :autoplay-delay="4000"
              />
            </div>
            <div
              v-else
              class="bg-white h-80 rounded-3xl border flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
              :class="getBorderColor"
            >
              <p class="text-gray-400">照片準備中...</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Members Section -->
    <section
      v-if="team.members && team.members.length > 0"
      class="relative bg-white py-16 md:py-20"
    >
      <!-- Top divider -->
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div class="container-custom">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-1.5 rounded-full" :class="getBackgroundColor"></div>
            <span class="text-sm font-semibold tracking-widest uppercase" :class="getTextColor">
              Members
            </span>
            <div class="w-12 h-1.5 rounded-full" :class="getBackgroundColor"></div>
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">
            {{ team.name }}成員
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MemberCard 
            v-for="(member, index) in team.members" 
            :key="index" 
            :member="member"
            :teamColor="team.color"
          />
        </div>
      </div>
    </section>

    <!-- Back to Teams -->
    <section class="bg-gradient-to-br from-[#f9fafb] via-primary/5 to-[#f9fafb] py-12">
      <div class="container-custom text-center">
        <router-link 
          to="/team" 
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 bg-white font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
          :class="[getBorderColor, getTextColor]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          返回組別總覽
        </router-link>
      </div>
    </section>
  </div>
</template>

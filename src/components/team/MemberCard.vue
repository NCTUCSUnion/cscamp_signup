<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  member: {
    type: Object,
    required: true
  },
  teamColor: {
    type: String,
    default: 'primary'
  }
})

const introText = ref(props.member.intro || '')
const imageError = ref(false)

onMounted(async () => {
  // If there's an introFile property, try to load content from it
  if (props.member.introFile) {
    try {
      const response = await fetch(props.member.introFile)
      if (response.ok) {
        introText.value = await response.text()
      }
    } catch (error) {
      console.error(`Failed to load intro text for ${props.member.name}:`, error)
    }
  }
})

const handleImageError = () => {
  imageError.value = true
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
    <div class="grid grid-cols-1 md:grid-cols-5 h-full">
      <!-- Left: Member Photo -->
      <div 
        class="member-photo overflow-hidden md:col-span-2 flex items-center justify-center"
        :class="{ 'bg-gray-100': imageError }"
      >
        <img 
          v-if="!imageError"
          :src="member.photo"
          :alt="member.name" 
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
        <div v-else class="text-center p-4">
          <div class="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-gray-400">{{ member.name.charAt(0) }}</span>
          </div>
          <p class="text-gray-400">照片準備中</p>
        </div>
      </div>
      
      <!-- Right: Member Info -->
      <div class="p-5 md:col-span-3 flex flex-col">
        <div class="flex flex-wrap items-baseline mb-3">
          <h3 class="text-xl font-bold mr-3" :class="`text-${teamColor}`">{{ member.name }}</h3>
          <span class="text-gray-500 text-sm">{{ member.position }}</span>
        </div>
        
        <div class="prose prose-sm max-h-[250px] overflow-y-auto custom-scrollbar">
          <p class="whitespace-pre-line text-gray-700">{{ introText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.member-photo {
  height: 240px;
}

@media (min-width: 768px) {
  .member-photo {
    height: 100%;
    min-height: 240px;
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}
</style> 
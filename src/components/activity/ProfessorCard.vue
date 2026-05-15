<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  professor: {
    type: Object,
    required: true
  }
})

const introText = ref(props.professor.intro || '')
const imageError = ref(false)

const desktopPhotoStyle = computed(() => ({
  objectPosition: props.professor.imagePosition || 'center top'
}))

onMounted(async () => {
  if (props.professor.introFile) {
    try {
      const response = await fetch(props.professor.introFile)
      if (response.ok) {
        introText.value = await response.text()
      }
    } catch (error) {
      console.error(`Failed to load intro text for ${props.professor.name}:`, error)
    }
  }
})

const handleImageError = () => {
  imageError.value = true
}
</script>

<template>
  <article
    class="group relative h-full w-full bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden"
  >
    <div class="grid grid-cols-1 md:grid-cols-12 relative z-10 md:h-full">
      <!-- Left: Photo -->
      <div class="md:col-span-6 lg:col-span-5 relative md:h-full">
        <div class="professor-photo relative overflow-hidden bg-gray-100 flex items-center justify-center md:h-full">
          <!-- Blurred background fill (mobile only, when image is letterboxed) -->
          <img
            v-if="!imageError"
            :src="professor.photo"
            alt=""
            aria-hidden="true"
            class="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-60 md:hidden"
          />
          <img
            v-if="!imageError"
            :src="professor.photo"
            :alt="professor.name"
            class="professor-photo-fg relative w-full h-full object-contain md:object-cover"
            :style="desktopPhotoStyle"
            @error="handleImageError"
          />
          <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-3">
              <span class="text-3xl font-bold">{{ professor.name.charAt(0) }}</span>
            </div>
            <p class="text-sm">照片準備中</p>
          </div>
        </div>
      </div>

      <!-- Right: Info -->
      <div class="md:col-span-6 lg:col-span-7 p-6 md:p-8 flex flex-col">
        <!-- Name + position -->
        <div class="mb-4">
          <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
            <h3 class="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 font-heading">
              {{ professor.name }}
            </h3>
            <a
              v-if="professor.homepage"
              :href="professor.homepage"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              個人網頁
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <p class="text-sm md:text-base text-gray-600 leading-relaxed">{{ professor.position }}</p>
        </div>

        <!-- Research fields -->
        <div v-if="professor.fields && professor.fields.length" class="flex flex-wrap gap-1.5 mb-5">
          <span
            v-for="field in professor.fields"
            :key="field"
            class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] md:text-xs font-medium bg-primary/10 text-primary border border-primary/20"
          >
            {{ field }}
          </span>
        </div>

        <!-- Intro paragraph -->
        <div v-if="introText" class="prose prose-sm max-w-none mb-6">
          <p class="whitespace-pre-line text-gray-700 leading-relaxed text-[15px]">{{ introText }}</p>
        </div>

        <!-- Highlights -->
        <div v-if="professor.highlights && professor.highlights.length" class="mt-auto">
          <h4 class="text-sm font-semibold tracking-widest uppercase text-primary mb-3 flex items-center gap-2">
            <span class="w-8 h-0.5 bg-primary rounded-full"></span>
            Highlights
          </h4>
          <ul class="space-y-2">
            <li
              v-for="(item, idx) in professor.highlights"
              :key="idx"
              class="flex items-start gap-3"
            >
              <div class="flex-shrink-0 mt-1 w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-700 text-sm leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.professor-photo {
  height: 240px;
  width: 100%;
}

.professor-photo-fg {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 15%,
    #000 85%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 15%,
    #000 85%,
    transparent 100%
  );
}

@media (min-width: 768px) {
  .professor-photo {
    height: 100%;
    min-height: 320px;
  }

  .professor-photo-fg {
    -webkit-mask-image: none;
    mask-image: none;
  }
}
</style>

<script setup>
import Banner from '../components/layout/Banner.vue'
import campInfo from '../data/camp-info.json'
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Get current date for timeline highlighting
const currentDate = ref(new Date())

// Parse dates from timeline for comparison
const timelineDates = computed(() => {
  return campInfo.registration.timeline.map((item, index) => {
    // Extract year, month, day from the date string (assuming format like "2025年5月3日")
    const dateMatch = item.date.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
    let date = null
    
    if (dateMatch) {
      const year = parseInt(dateMatch[1])
      const month = parseInt(dateMatch[2]) - 1 // JS months are 0-based
      const day = parseInt(dateMatch[3])
      
      date = new Date(year, month, day)
      // Reset time part to ensure clean comparison
      date.setHours(0, 0, 0, 0)
    }
    
    // Use spread first, then override the date property
    return {
      ...item,
      index,
      date,
      originalDateString: item.date // Keep the original string for display
    }
  })
})

// Find registration deadline date
const registrationDeadline = computed(() => {
  // Fallback: use a future date
  return new Date(2025, 4, 26, 22, 0, 0, 0) // May 25, 2025, 23:59:59.999
})

// Calculate remaining time until registration deadline
const remainingTime = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

// Calculate if deadline has passed
const isDeadlinePassed = computed(() => {
  const now = new Date()
  return now > registrationDeadline.value
})

// Update countdown timer
const updateCountdown = () => {
  const now = new Date()
  const diff = registrationDeadline.value - now
  
  if (diff <= 0) {
    remainingTime.value = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
    return
  }
  
  remainingTime.value = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  }
}

// Timer interval
let countdownInterval = null

onMounted(() => {
  // Initial update
  updateCountdown()
  // Start interval (update every second)
  countdownInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  // Clear interval when component is unmounted
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})

// Determine current stage
const currentStageIndex = computed(() => {
  if (!timelineDates.value.length) return -1
  
  // Sort timeline dates in ascending order
  const sortedTimeline = [...timelineDates.value].sort((a, b) => {
    if (!a.date) return -1
    if (!b.date) return 1
    return a.date - b.date
  })
  
  // Create a new date instead of using the ref value directly
  const today = new Date()
  // Reset time part to ensure clean comparison
  today.setHours(0, 0, 0, 0)
  
  // Find the current stage - the latest stage whose date has passed
  let currentIndex = -1

  for (let i = sortedTimeline.length -1 ; i >= 0; i--) {
    const timelineItem = sortedTimeline[i];
    const timelineDate = timelineItem.date;
    
    if (timelineDate && timelineDate <= today) {
      currentIndex = timelineItem.index;
      return currentIndex;
    } 
  }

  return -1
})

// Function to check if a timeline item is current
const isCurrentStage = (index) => {
  return index === currentStageIndex.value
}
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
                <div 
                  :class="[
                    'p-6 rounded-lg shadow-md max-w-sm w-full', 
                    isCurrentStage(index) ? 'bg-secondary bg-opacity-10' : 'bg-gray-100'
                  ]"
                >
                  <h3 
                    :class="[
                      'text-xl font-bold mb-2', 
                      isCurrentStage(index) ? 'text-secondary' : 'text-primary'
                    ]"
                  >{{ item.label }}</h3>
                  <div class="text-lg font-semibold">{{ item.date }}</div>
                  <p class="text-gray-600 mt-2">{{ item.description }}</p>
                </div>

                <!-- Mobile Only - Timeline Node -->
                <div class="timeline-node-mobile md:hidden absolute top-1/2 -left-6 -translate-y-1/2">
                  <div 
                    :class="[
                      'w-5 h-5 rounded-full border-4 border-white', 
                      isCurrentStage(index) ? 'bg-secondary' : 'bg-primary'
                    ]"
                  ></div>
                </div>
              </div>
              
              <!-- Timeline Node - visible on desktop -->
              <div class="timeline-node-desktop absolute top-6 left-1/2 -translate-x-1/2 hidden md:block">
                <div 
                  :class="[
                    'w-5 h-5 rounded-full border-4 border-white', 
                    isCurrentStage(index) ? 'bg-secondary' : 'bg-primary'
                  ]"
                ></div>
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
          <div class="bg-gray-100 p-8 rounded-lg shadow-md">
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
          
          <!-- Right: Countdown Timer -->
          <div :class="['p-8 rounded-lg shadow-md bg-gray-100']">
            <h3 :class="[
              'text-2xl font-bold mb-6',
              isDeadlinePassed ? 'text-red-600' : 'text-primary'
            ]">{{ isDeadlinePassed ? '報名已截止' : '報名倒數計時' }}</h3>
            
            <div class="space-y-6">
              <div class="text-center">
                <div class="flex justify-center items-center space-x-4 mb-6">
                  <div :class="[
                    'countdown-box',
                    isDeadlinePassed ? 'bg-red-100 border border-red-200' : 'bg-white'
                  ]">
                    <div :class="[
                      'text-3xl font-bold',
                      isDeadlinePassed ? 'text-red-600' : 'text-primary'
                    ]">{{ remainingTime.days }}</div>
                    <div class="text-sm text-gray-600">天</div>
                  </div>
                  <div class="text-2xl font-bold text-gray-400">:</div>
                  <div :class="[
                    'countdown-box',
                    isDeadlinePassed ? 'bg-red-100 border border-red-200' : 'bg-white'
                  ]">
                    <div :class="[
                      'text-3xl font-bold',
                      isDeadlinePassed ? 'text-red-600' : 'text-primary'
                    ]">{{ remainingTime.hours }}</div>
                    <div class="text-sm text-gray-600">時</div>
                  </div>
                  <div class="text-2xl font-bold text-gray-400">:</div>
                  <div :class="[
                    'countdown-box',
                    isDeadlinePassed ? 'bg-red-100 border border-red-200' : 'bg-white'
                  ]">
                    <div :class="[
                      'text-3xl font-bold',
                      isDeadlinePassed ? 'text-red-600' : 'text-primary'
                    ]">{{ remainingTime.minutes }}</div>
                    <div class="text-sm text-gray-600">分</div>
                  </div>
                  <div class="text-2xl font-bold text-gray-400">:</div>
                  <div :class="[
                    'countdown-box',
                    isDeadlinePassed ? 'bg-red-100 border border-red-200' : 'bg-white'
                  ]">
                    <div :class="[
                      'text-3xl font-bold',
                      isDeadlinePassed ? 'text-red-600' : 'text-primary'
                    ]">{{ remainingTime.seconds }}</div>
                    <div class="text-sm text-gray-600">秒</div>
                  </div>
                </div>
                
                <p :class="[
                  'text-lg',
                  isDeadlinePassed ? 'text-red-600' : ''
                ]">{{ isDeadlinePassed ? '本次報名已結束，敬請期待下一屆！' : '距離報名截止還剩' }}</p>
              </div>
              
              <div v-if="!isDeadlinePassed" class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div class="flex items-start space-x-3">
                  <div class="text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium text-blue-900">請注意</div>
                    <p class="text-blue-800">逾期報名將不受理，請把握時間完成報名程序！</p>
                  </div>
                </div>
              </div>
              
              <div v-if="isDeadlinePassed" class="bg-red-50 p-4 rounded-lg border border-red-200">
                <div class="flex items-start space-x-3">
                  <div class="text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium text-red-900">報名已截止</div>
                    <p class="text-red-800">本次營隊報名已經結束，感謝您的關注！</p>
                  </div>
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

/* Countdown timer styles */
.countdown-box {
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  min-width: 4rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (max-width: 640px) {
  .countdown-box {
    min-width: 3rem;
    padding: 0.5rem;
  }
  
  .countdown-box .text-3xl {
    font-size: 1.5rem;
  }
}
</style> 
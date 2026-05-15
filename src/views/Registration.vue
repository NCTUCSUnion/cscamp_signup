<script setup>
import Banner from '../components/layout/Banner.vue'
import campInfo from '../data/camp-info.json'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

/** "YYYY年M月D日" or "YYYY年M月D日 HH:mm" (local time) */
function parseCampTimelineDate(dateStr) {
  const m = dateStr.match(
    /^(\d{4})年(\d{1,2})月(\d{1,2})日(?:\s+(\d{1,2}):(\d{2}))?$/
  )
  if (!m) return null
  const year = parseInt(m[1], 10)
  const month = parseInt(m[2], 10) - 1
  const day = parseInt(m[3], 10)
  const hour = m[4] !== undefined ? parseInt(m[4], 10) : 0
  const minute = m[5] !== undefined ? parseInt(m[5], 10) : 0
  const d = new Date(year, month, day, hour, minute, 0, 0)
  return Number.isNaN(d.getTime()) ? null : d
}

// Get current date for timeline highlighting
const currentDate = ref(new Date())

// Parse dates from timeline for comparison
const timelineDates = computed(() => {
  return campInfo.registration.timeline.map((item, index) => ({
    ...item,
    index,
    date: parseCampTimelineDate(item.date),
    originalDateString: item.date // Keep the original string for display
  }))
})

// Registration countdown deadline: same source as timeline「報名截止」in camp-info.json
const registrationDeadline = computed(() => {
  const item = campInfo.registration.timeline.find((t) => t.label === '報名截止')
  if (item) {
    const d = parseCampTimelineDate(item.date)
    if (d) return d
  }
  return new Date(2026, 4, 30, 22, 0, 0, 0)
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
  return currentDate.value > registrationDeadline.value
})

const refundPolicyGroups = computed(() => {
  const groups = new Map()
  for (const policy of campInfo.registration.fee.refundPolicy) {
    const key = policy.deadline
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(policy)
  }
  return Array.from(groups.entries()).map(([deadline, policies]) => ({
    deadline,
    policies
  }))
})

const openRefundGroups = ref(new Set())
const toggleRefundGroup = (index) => {
  if (openRefundGroups.value.has(index)) {
    openRefundGroups.value.delete(index)
  } else {
    openRefundGroups.value.add(index)
  }
  openRefundGroups.value = new Set(openRefundGroups.value)
}

// === DEV ONLY: time-travel debugger ===
const isDev = import.meta.env.DEV
const DEBUG_TIME_STORAGE_KEY = 'registration-debug-now'
const debugNow = ref(null)
const debugInputValue = ref('')

const persistDebugTime = () => {
  if (!isDev || typeof window === 'undefined') return

  if (debugInputValue.value) {
    window.localStorage.setItem(DEBUG_TIME_STORAGE_KEY, debugInputValue.value)
  } else {
    window.localStorage.removeItem(DEBUG_TIME_STORAGE_KEY)
  }
}

const restoreDebugTime = () => {
  if (!isDev || typeof window === 'undefined') return

  const savedDebugTime = window.localStorage.getItem(DEBUG_TIME_STORAGE_KEY)
  if (!savedDebugTime) return

  debugInputValue.value = savedDebugTime
  const restoredDate = new Date(savedDebugTime)
  if (!Number.isNaN(restoredDate.getTime())) {
    debugNow.value = restoredDate
  }
}

const applyDebugTime = () => {
  if (!debugInputValue.value) {
    debugNow.value = null
  } else {
    const nextDebugDate = new Date(debugInputValue.value)
    debugNow.value = Number.isNaN(nextDebugDate.getTime()) ? null : nextDebugDate
  }
  persistDebugTime()
  updateCountdown()
}
const resetDebugTime = () => {
  debugInputValue.value = ''
  debugNow.value = null
  persistDebugTime()
  updateCountdown()
}

// Update countdown timer
const updateCountdown = () => {
  const now = debugNow.value ?? new Date()
  currentDate.value = now  // keep reactive for time-based progress
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
  restoreDebugTime()
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

// Determine timeline state from the simulated/real current time
const currentStageIndex = computed(() => {
  const items = timelineDates.value
  if (!items.length) return -1

  const now = currentDate.value
  let latestPassedIndex = -1

  for (const item of items) {
    if (item.date && now >= item.date) {
      latestPassedIndex = item.index
    }
  }

  return latestPassedIndex
})

const activeStageIndex = computed(() => {
  const items = timelineDates.value
  if (!items.length) return -1

  const now = currentDate.value
  const firstDate = items[0]?.date
  if (!firstDate || now < firstDate) return -1

  for (let i = 0; i < items.length - 1; i++) {
    const stageStart = items[i]?.date
    const nextStageStart = items[i + 1]?.date

    if (!stageStart || !nextStageStart) continue
    if (now >= stageStart && now < nextStageStart) {
      return items[i].index
    }
  }

  return items[items.length - 1].index
})

const timelineProgressPct = computed(() => {
  const items = timelineDates.value
  if (items.length <= 1) return 0

  const firstDate = items[0]?.date
  const now = currentDate.value
  if (!firstDate || now <= firstDate) return 0

  const lastIndex = items.length - 1
  const lastDate = items[lastIndex]?.date
  if (lastDate && now >= lastDate) return 100

  let completedSegments = 0
  let activeSegmentProgress = 0

  for (let i = 0; i < lastIndex; i++) {
    const segmentStart = items[i]?.date
    const segmentEnd = items[i + 1]?.date
    if (!segmentStart || !segmentEnd || segmentEnd <= segmentStart) continue

    if (now >= segmentEnd) {
      completedSegments += 1
      continue
    }

    if (now > segmentStart) {
      activeSegmentProgress = (now - segmentStart) / (segmentEnd - segmentStart)
    }
    break
  }

  return ((completedSegments + activeSegmentProgress) / lastIndex) * 100
})

// Function to check if a timeline item is current
const isCurrentStage = (index) => {
  return index === activeStageIndex.value
}

const isCompletedStage = (index) => {
  return currentStageIndex.value >= 0 && index <= currentStageIndex.value
}

// Animated progress: ramps from 0 to actual value on mount
const animatedProgressPct = ref(0)
// Pixel offset and length of the progress segment (between first and last node)
const segmentTopPx = ref(24)
const segmentLengthPx = ref(0)
const segmentLeftPx = ref(20)
const timelineContainerRef = ref(null)

const measureSegment = () => {
  const container = timelineContainerRef.value
  if (!container) return

  const desktopNodes = Array.from(container.querySelectorAll('.timeline-node-desktop'))
  const mobileNodes = Array.from(container.querySelectorAll('.timeline-node-mobile'))
  const isMobile = window.innerWidth < 768
  const activeNodes = (isMobile ? mobileNodes : desktopNodes).filter((node) => node.offsetParent !== null)

  if (activeNodes.length < 2) return

  const containerRect = container.getBoundingClientRect()
  const firstRect = activeNodes[0].getBoundingClientRect()
  const lastRect = activeNodes[activeNodes.length - 1].getBoundingClientRect()
  const firstCenterY = firstRect.top - containerRect.top + firstRect.height / 2
  const lastCenterY = lastRect.top - containerRect.top + lastRect.height / 2
  const firstCenterX = firstRect.left - containerRect.left + firstRect.width / 2

  segmentTopPx.value = firstCenterY
  segmentLengthPx.value = Math.max(0, lastCenterY - firstCenterY)
  segmentLeftPx.value = firstCenterX
}

onMounted(() => {
  measureSegment()
  window.addEventListener('resize', measureSegment)
  // Delay one frame so the initial 0 is committed before transitioning
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animatedProgressPct.value = timelineProgressPct.value
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', measureSegment)
})

// Keep animated value synced with real progress as time ticks
watch(timelineProgressPct, (val) => {
  animatedProgressPct.value = val
})
</script>

<template>
  <div>
    <!-- DEV ONLY: time-travel debugger for timeline progress -->
    <div
      v-if="isDev"
      class="fixed bottom-4 right-4 z-50 bg-white border-2 border-primary rounded-lg shadow-xl p-3 text-xs space-y-2"
    >
      <div class="font-bold text-primary">🛠 Debug: 模擬時間</div>
      <div class="text-gray-600">
        現在: {{ currentDate.toLocaleString('zh-TW') }}
      </div>
      <input
        type="datetime-local"
        v-model="debugInputValue"
        class="border border-gray-300 rounded px-2 py-1 w-full"
      />
      <div class="flex gap-2">
        <button
          @click="applyDebugTime"
          class="flex-1 bg-primary text-white px-2 py-1 rounded hover:opacity-80"
        >
          套用
        </button>
        <button
          @click="resetDebugTime"
          class="flex-1 bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
        >
          重置
        </button>
      </div>
    </div>

    <Banner 
      title="報名資訊" 
      backgroundImage="/images/banner-default.webp"
    />

    <!-- Page background wrapper -->
    <div class="relative overflow-hidden bg-gradient-to-br from-[#f9fafb] via-primary/5 to-[#f9fafb]">
      <!-- Decorative blobs -->
      <div class="absolute top-20 -left-32 w-96 h-96 rounded-full blur-[120px] bg-primary/10 pointer-events-none"></div>
      <div class="absolute bottom-40 -right-32 w-96 h-96 rounded-full blur-[120px] bg-primary/10 pointer-events-none"></div>

    <div class="container-custom py-16 relative z-10">
      <!-- Registration Timeline -->
      <section class="mb-16">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-1.5 bg-primary rounded-full"></div>
            <span class="text-sm font-semibold tracking-widest uppercase text-primary">Timeline</span>
            <div class="w-12 h-1.5 bg-primary rounded-full"></div>
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">報名流程</h2>
        </div>
        
        <div class="timeline-container relative" ref="timelineContainerRef">
          <!-- Desktop Timeline Line -->
          <div class="absolute top-0 left-1/2 w-1 h-full bg-gray-200 -translate-x-1/2 hidden md:block z-0"></div>
          <!-- Mobile Timeline Line -->
          <div
            class="md:hidden absolute top-0 w-[2px] h-full bg-gray-200 z-0"
            :style="{ left: `${segmentLeftPx}px` }"
          ></div>
          <!-- Filled segment above the first node (always complete) -->
          <div
            class="absolute top-0 left-1/2 w-1 -translate-x-1/2 hidden md:block timeline-progress z-10"
            :style="{ height: `${segmentTopPx}px` }"
          ></div>
          <!-- Desktop Timeline Progress (between first and last node) -->
          <div
            class="absolute left-1/2 w-1 -translate-x-1/2 hidden md:block timeline-progress z-10"
            :style="{ top: `${segmentTopPx}px`, height: `${(segmentLengthPx * animatedProgressPct) / 100}px` }"
          ></div>

          <!-- Mobile filled segment above the first node -->
          <div
            class="md:hidden absolute left-[20px] top-0 w-[2px] timeline-progress z-10"
            :style="{ left: `${segmentLeftPx}px`, height: `${segmentTopPx}px` }"
          ></div>
          <!-- Mobile Timeline Progress (between first and last node) -->
          <div
            class="md:hidden absolute w-[2px] timeline-progress z-10"
            :style="{ left: `${segmentLeftPx}px`, top: `${segmentTopPx}px`, height: `${(segmentLengthPx * animatedProgressPct) / 100}px` }"
          ></div>
          
          <!-- Timeline Items -->
          <div class="timeline-items space-y-6">
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
                    'p-6 rounded-2xl border max-w-sm w-full transition-all',
                    isCompletedStage(index) || isCurrentStage(index)
                      ? 'bg-gradient-to-br from-white to-primary/5 border-primary/30 shadow-[0_8px_30px_rgba(154,191,128,0.15)]'
                      : 'bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
                  ]"
                >
                  <h3 
                    :class="[
                      'text-xl font-bold mb-2', 
                      isCompletedStage(index) || isCurrentStage(index) ? 'text-primary' : 'text-gray-900'
                    ]"
                  >{{ item.label }}</h3>
                  <div class="text-lg font-semibold text-gray-800">{{ item.date }}</div>
                  <p class="text-gray-600 mt-2">{{ item.description }}</p>
                </div>

                <!-- Mobile Only - Timeline Node -->
                <div class="timeline-node-mobile md:hidden absolute top-1/2 -left-6 -translate-y-1/2">
                  <div class="relative w-5 h-5">
                    <template v-if="isCurrentStage(index)">
                      <span class="timeline-ping timeline-ping-1 absolute inset-0 rounded-full bg-primary/60"></span>
                      <span class="timeline-ping timeline-ping-2 absolute inset-0 rounded-full bg-primary/50"></span>
                      <span class="timeline-ping timeline-ping-3 absolute inset-0 rounded-full bg-primary/40"></span>
                    </template>
                    <div
                      :class="[
                        'relative w-5 h-5 rounded-full',
                        isCompletedStage(index) || isCurrentStage(index)
                          ? 'bg-primary shadow-[0_0_0_3px_white,0_0_0_5px_rgba(154,191,128,0.3)]'
                          : 'bg-white border-4 border-gray-300'
                      ]"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Timeline Node - visible on desktop -->
              <div class="timeline-node-desktop absolute top-6 left-1/2 -translate-x-1/2 hidden md:block">
                <div class="relative w-5 h-5">
                  <template v-if="isCurrentStage(index)">
                    <span class="timeline-ping timeline-ping-1 absolute inset-0 rounded-full bg-primary/60"></span>
                    <span class="timeline-ping timeline-ping-2 absolute inset-0 rounded-full bg-primary/50"></span>
                    <span class="timeline-ping timeline-ping-3 absolute inset-0 rounded-full bg-primary/40"></span>
                  </template>
                  <div
                    :class="[
                      'relative w-5 h-5 rounded-full',
                      isCompletedStage(index) || isCurrentStage(index)
                        ? 'bg-primary shadow-[0_0_0_3px_white,0_0_0_5px_rgba(154,191,128,0.3)]'
                        : 'bg-white border-4 border-gray-300'
                    ]"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Fee Information -->
      <section class="mb-16">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-1.5 bg-primary rounded-full"></div>
            <span class="text-sm font-semibold tracking-widest uppercase text-primary">Fee &amp; Deadline</span>
            <div class="w-12 h-1.5 bg-primary rounded-full"></div>
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">費用說明</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left: Fee Details -->
          <div class="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(154,191,128,0.18)]">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:rotate-6 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-primary">營隊費用</h3>
            </div>
            <div class="grid grid-cols-3 gap-2 md:gap-3 mb-6">
              <div
                v-for="(tier, index) in campInfo.registration.fee.amount"
                :key="index"
                :class="[
                  'rounded-2xl border p-3 md:p-4 text-center transition-all',
                  tier.highlight
                    ? 'bg-gradient-to-br from-primary/15 to-primary/5 border-primary/30'
                    : 'bg-primary/5 border-primary/10'
                ]"
              >
                <div class="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">{{ tier.label }}</div>
                <div
                  :class="[
                    'text-lg md:text-2xl font-extrabold tracking-tight',
                    tier.highlight ? 'text-primary' : 'text-gray-900'
                  ]"
                >
                  {{ tier.price }}
                </div>
              </div>
            </div>
            
            <h4 class="text-lg font-semibold mt-6 mb-4 text-gray-800">費用包含項目：</h4>
            <ul class="space-y-2">
              <li v-for="(item, index) in campInfo.registration.fee.includes" :key="index" class="flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                {{ item }}
              </li>
              <li class="flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
                因應教育部政策不會發放參加證明
              </li>
            </ul>
          </div>
          
          <!-- Right: Countdown Timer -->
          <div class="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(154,191,128,0.18)] flex flex-col">
            <div class="flex items-center gap-3 mb-6">
              <div
                :class="[
                  'w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 group-hover:scale-110',
                  isDeadlinePassed ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 :class="[
                'text-2xl font-bold',
                isDeadlinePassed ? 'text-red-600' : 'text-primary'
              ]">{{ isDeadlinePassed ? '報名已截止' : '報名倒數計時' }}</h3>
            </div>
            
            <div class="space-y-6 flex flex-col flex-1">
              <div class="text-center">
                <div class="flex justify-center items-center space-x-1 md:space-x-4 mb-6">
                  <div :class="[
                    'countdown-box',
                    isDeadlinePassed ? 'bg-red-50 border border-red-200' : 'bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/25'
                  ]">
                    <div :class="[
                      'text-4xl md:text-5xl font-extrabold',
                      isDeadlinePassed ? 'text-red-600' : 'text-primary'
                    ]">{{ remainingTime.days }}</div>
                    <div class="text-sm text-gray-600">天</div>
                  </div>
                  <div class="text-2xl font-bold text-gray-300">:</div>
                  <div :class="[
                    'countdown-box',
                    isDeadlinePassed ? 'bg-red-50 border border-red-200' : 'bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/25'
                  ]">
                    <div :class="[
                      'text-4xl md:text-5xl font-extrabold',
                      isDeadlinePassed ? 'text-red-600' : 'text-primary'
                    ]">{{ remainingTime.hours }}</div>
                    <div class="text-sm text-gray-600">時</div>
                  </div>
                  <div class="text-2xl font-bold text-gray-300">:</div>
                  <div :class="[
                    'countdown-box',
                    isDeadlinePassed ? 'bg-red-50 border border-red-200' : 'bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/25'
                  ]">
                    <div :class="[
                      'text-4xl md:text-5xl font-extrabold',
                      isDeadlinePassed ? 'text-red-600' : 'text-primary'
                    ]">{{ remainingTime.minutes }}</div>
                    <div class="text-sm text-gray-600">分</div>
                  </div>
                  <div class="text-2xl font-bold text-gray-300">:</div>
                  <div :class="[
                    'countdown-box',
                    isDeadlinePassed ? 'bg-red-50 border border-red-200' : 'bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/25'
                  ]">
                    <div :class="[
                      'text-4xl md:text-5xl font-extrabold',
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
              
              <div v-if="!isDeadlinePassed" class="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-auto">
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
              
              <div v-if="isDeadlinePassed" class="bg-red-50 p-4 rounded-lg border border-red-200 mt-auto">
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

        <div class="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] mt-8 transition-all hover:shadow-[0_20px_50px_rgba(154,191,128,0.18)]">
          <div class="mb-6">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:rotate-6 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-primary">退費說明</h3>
            </div>
            <p class="text-sm text-gray-500 mt-2 ml-[3.75rem]">依申請時間與原因計算</p>
          </div>

          <div class="space-y-4">
            <div
              v-for="(group, groupIndex) in refundPolicyGroups"
              :key="groupIndex"
              class="bg-primary/5 rounded-2xl border border-primary/10 overflow-hidden transition-all"
              :class="{ 'border-primary/30 shadow-[0_4px_20px_rgba(154,191,128,0.1)] bg-primary/[0.08]': openRefundGroups.has(groupIndex) }"
            >
              <button
                type="button"
                class="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-primary/5 transition-colors"
                :aria-expanded="openRefundGroups.has(groupIndex)"
                @click="toggleRefundGroup(groupIndex)"
              >
                <span class="font-bold text-gray-900 leading-relaxed">
                  {{ group.deadline }}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-500 shrink-0 transition-transform"
                  :class="{ 'rotate-180 text-primary': openRefundGroups.has(groupIndex) }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <ul
                v-show="openRefundGroups.has(groupIndex)"
                class="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3"
              >
                <li
                  v-for="(policy, index) in group.policies"
                  :key="index"
                  class="flex items-start justify-between gap-3"
                >
                  <div class="text-gray-700 leading-relaxed">
                    {{ policy.condition }}
                  </div>
                  <span
                    :class="[
                      'shrink-0 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold',
                      policy.percentage === 0
                        ? 'bg-red-100 text-red-700'
                        : policy.percentage < 50
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-primary/10 text-primary'
                    ]"
                  >
                    退還 {{ policy.percentage }}%
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-6 text-sm text-gray-500">
            實際退費以主辦單位審核與公告為準。
          </div>
        </div>
      </section>

      <!-- Registration CTA -->
      <section class="cta-hero relative overflow-hidden p-10 md:p-16 rounded-3xl border border-white/20 text-center shadow-[0_20px_60px_rgba(154,191,128,0.25)]">
        <!-- Background image slides (frosted) -->
        <div class="absolute inset-0">
          <div
            class="absolute inset-0 bg-cover bg-center cta-slide cta-slide-1"
            style="background-image: url('/images/hero-bg.webp');"
          ></div>
          <div
            class="absolute inset-0 bg-cover bg-center cta-slide cta-slide-2"
            style="background-image: url('/images/hero-bg2.webp');"
          ></div>
          <div
            class="absolute inset-0 bg-cover bg-center cta-slide cta-slide-3"
            style="background-image: url('/images/hero-bg3.webp');"
          ></div>
        </div>

        <!-- Heavy frost: extra blur + gradient tint + brightening overlay -->
        <div class="absolute inset-0 backdrop-blur-[10px] md:backdrop-blur-[10px]"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-primary/55 via-primary/30 to-[#7DA868]/50"></div>
        <div class="absolute inset-0 bg-white/15"></div>

        <!-- Floating blobs -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div class="cta-blob cta-blob-1 absolute w-[20rem] h-[20rem] md:w-[28rem] md:h-[28rem] rounded-full bg-white/25 blur-[80px] md:blur-[100px]"></div>
          <div class="cta-blob cta-blob-2 absolute w-[18rem] h-[18rem] md:w-[24rem] md:h-[24rem] rounded-full bg-primary/40 blur-[80px] md:blur-[100px]"></div>
        </div>

        <div class="relative z-10">
          <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            準備好成為營隊的一員了嗎？
          </h2>
          <p class="mb-8 text-lg text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
            點擊下方按鈕填寫報名表單，開始你的程式學習之旅！
          </p>
          <a
            :href="campInfo.registration.formUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-fly inline-flex items-center justify-center gap-2 text-xl py-3 px-8 font-heading bg-white text-primary rounded-md font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <span class="btn-fly-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/></svg>
            </span>
            前往報名表單
          </a>
        </div>
      </section>
    </div>
    </div>
  </div>
</template>

<style scoped>
/* Timeline Styles */
@media (max-width: 768px) {
  .timeline-container {
    padding-left: 30px;
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

.timeline-progress {
  background: #9ABF80;
  border-radius: 9999px;
  transition: height 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Countdown timer styles */
.countdown-box {
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  min-width: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (max-width: 640px) {
  .countdown-box {
    min-width: 3.5rem;
    padding: 0.625rem 0.5rem;
  }
}

/* ===== Registration CTA: frosted hero with crossfading backgrounds ===== */
.cta-hero {
  isolation: isolate;
}

.cta-slide {
  opacity: 0;
  will-change: transform, opacity;
  /* Slightly faster cycle than home hero (24s vs 27s) for variety */
  animation: ctaCrossfade 24s ease-in-out infinite,
             ctaKenburns 24s ease-in-out infinite alternate;
  transform: scale(1.1);
}

.cta-slide-1 { animation-delay: 0s, 0s; }
.cta-slide-2 { animation-delay: -16s, -3s; }
.cta-slide-3 { animation-delay: -8s, -6s; }

@keyframes ctaCrossfade {
  0%   { opacity: 0; }
  5%   { opacity: 1; }
  33%  { opacity: 1; }
  38%  { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes ctaKenburns {
  0%   { transform: scale(1.1) translate(0, 0); }
  100% { transform: scale(1.22) translate(-2%, -2%); }
}

.cta-blob {
  will-change: transform;
}

.cta-blob-1 {
  top: -20%;
  left: -10%;
  animation: ctaBlobFloat1 20s ease-in-out infinite alternate;
}

.cta-blob-2 {
  bottom: -25%;
  right: -10%;
  animation: ctaBlobFloat2 24s ease-in-out infinite alternate;
}

@keyframes ctaBlobFloat1 {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(10%, 8%) scale(1.15); }
}

@keyframes ctaBlobFloat2 {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-8%, -6%) scale(1.1); }
}

@media (prefers-reduced-motion: reduce) {
  .cta-slide,
  .cta-blob {
    animation: none;
  }
  .cta-slide-1 { opacity: 1; }
  .cta-slide-2,
  .cta-slide-3 { opacity: 0; }
  .timeline-ping { animation: none; opacity: 0; }
}

/* ===== Timeline current-node ripple ===== */
.timeline-ping {
  transform: scale(1);
  opacity: 0;
  will-change: transform, opacity;
  animation: timelinePing 4s cubic-bezier(0.16, 0.6, 0.3, 1) infinite;
  pointer-events: none;
}

.timeline-ping-1 { animation-delay: 0s; }
.timeline-ping-2 { animation-delay: 1.3s; }
.timeline-ping-3 { animation-delay: 2.6s; }

@keyframes timelinePing {
  0%   { transform: scale(1);   opacity: 0.7; }
  90%  { transform: scale(3);   opacity: 0; }
  100% { transform: scale(3);   opacity: 0; }
}
</style>

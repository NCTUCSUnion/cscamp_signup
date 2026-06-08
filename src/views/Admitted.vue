<script setup>
import { computed, ref, watch } from 'vue'
import Banner from '../components/layout/Banner.vue'
import admittedData from '../data/admitted-list.json'
import waitlistData from '../data/waitlist.json'

const lists = {
  admitted: {
    label: '正取名單',
    shortLabel: '正取',
    description: '恭喜以下入選的同學！您可以在下方搜尋自己的全名找到自己。',
    entries: admittedData.entries || [],
    generatedAt: admittedData.generatedAt ? new Date(admittedData.generatedAt) : null,
  },
  waitlist: {
    label: '備取名單',
    shortLabel: '備取',
    description: '以下為備取同學名單，將依序遞補錄取空缺，敬請耐心等候我們的通知。',
    entries: waitlistData.entries || [],
    generatedAt: waitlistData.generatedAt ? new Date(waitlistData.generatedAt) : null,
  },
}

const listKeys = ['admitted', 'waitlist']
const activeList = ref('admitted')
const searchTerm = ref('')
const activeFilter = ref('全部')

const currentList = computed(() => lists[activeList.value])
const entries = computed(() => currentList.value.entries)
const generatedAt = computed(() => currentList.value.generatedAt)

const filters = [
  { name: '全部', value: 'all' },
  { name: '男', value: 'male' },
  { name: '女', value: 'female' },
]

// Mask the user's query the same way names are stored (2nd char → 'O') so a
// full real name still matches the masked roster.
function maskQuery(q) {
  const trimmed = (q || '').trim()
  if (trimmed.length < 2) return trimmed
  const chars = Array.from(trimmed)
  chars[1] = 'O'
  return chars.join('')
}

const filteredEntries = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()
  const masked = maskQuery(searchTerm.value).toLowerCase()
  return entries.value.filter((e) => {
    if (activeFilter.value === 'male' && e.gender !== 'male') return false
    if (activeFilter.value === 'female' && e.gender !== 'female') return false
    if (q === '') return true
    const nameLower = e.name.toLowerCase()
    const schoolLower = (e.school || '').toLowerCase()
    return (
      nameLower.includes(masked) ||
      nameLower.includes(q) ||
      schoolLower.includes(q)
    )
  })
})

const totalCount = computed(() => entries.value.length)
const maleCount = computed(() => entries.value.filter((e) => e.gender === 'male').length)
const femaleCount = computed(() => entries.value.filter((e) => e.gender === 'female').length)

const formattedDate = computed(() => {
  const d = generatedAt.value
  return d
    ? d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
})

// Reset gender filter when switching lists so the new active filter is
// guaranteed to have results (e.g. waitlist may have no female entries).
watch(activeList, () => {
  activeFilter.value = '全部'
})
</script>

<template>
  <div class="bg-[#f9fafb] selection:bg-primary/30">
    <Banner title="錄取名單" backgroundImage="/images/banner-default.webp" />

    <div class="py-20 md:py-28 relative overflow-hidden">
      <!-- Background layers -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#f9fafb] via-primary/5 to-[#f9fafb] pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
      <div class="absolute bottom-0 left-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

      <div class="container-custom relative z-10">
        <!-- Heading -->
        <div class="text-center mb-10 md:mb-14">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight relative inline-block">
            錄取名單
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-full"></div>
          </h2>
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mt-8">
            {{ currentList.description }}
          </p>
          <p class="text-sm text-gray-400 mt-3">
            共 {{ totalCount }} 位
            <span v-if="formattedDate"> · 公告於 {{ formattedDate }}</span>
          </p>
        </div>

        <!-- List type switcher (正取 / 備取) -->
        <div class="flex justify-center mb-8 md:mb-10">
          <div
            class="inline-flex p-1.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            role="tablist"
            aria-label="名單類別"
          >
            <button
              v-for="key in listKeys"
              :key="key"
              type="button"
              role="tab"
              :aria-selected="activeList === key"
              @click="activeList = key"
              :class="[
                'inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300',
                activeList === key
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'text-gray-600 hover:text-primary',
              ]"
            >
              {{ lists[key].label }}
              <span
                :class="[
                  'inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-xs font-bold',
                  activeList === key
                    ? 'bg-white/25 text-white'
                    : 'bg-primary/10 text-primary',
                ]"
              >
                {{ lists[key].entries.length }}
              </span>
            </button>
          </div>
        </div>

        <!-- Search + filters -->
        <div class="mb-10 max-w-2xl mx-auto">
          <div class="relative mb-5">
            <input
              type="text"
              v-model="searchTerm"
              placeholder="輸入你的姓名或學校..."
              class="w-full py-4 px-5 pl-14 rounded-2xl border border-primary/15 bg-white/80 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-300 text-gray-700 placeholder:text-gray-400"
            />
            <div class="absolute left-5 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              v-if="searchTerm"
              type="button"
              @click="searchTerm = ''"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary p-1 rounded-full"
              aria-label="清除搜尋"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
            <button
              v-for="f in filters"
              :key="f.value"
              @click="activeFilter = f.value === 'all' ? '全部' : f.value"
              :class="[
                'inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                (f.value === 'all' && activeFilter === '全部') || activeFilter === f.value
                  ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                  : 'bg-white/70 backdrop-blur-sm text-gray-700 border border-primary/10 hover:border-primary/30 hover:text-primary hover:-translate-y-0.5',
              ]"
            >
              {{ f.name }}
              <span class="text-xs opacity-70">
                <template v-if="f.value === 'all'">{{ totalCount }}</template>
                <template v-else-if="f.value === 'male'">{{ maleCount }}</template>
                <template v-else>{{ femaleCount }}</template>
              </span>
            </button>
          </div>
        </div>

        <!-- Result count -->
        <p class="text-center text-sm text-gray-500 mb-6">
          顯示 {{ filteredEntries.length }} / {{ totalCount }} 位
        </p>

        <!-- List grid -->
        <div v-if="filteredEntries.length === 0" class="text-center py-16">
          <p class="text-lg text-gray-500">找不到符合條件的同學，請嘗試其他關鍵字。</p>
        </div>

        <div
          v-else
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto"
        >
          <article
            v-for="(person, idx) in filteredEntries"
            :key="`${activeList}-${person.name}-${person.school}-${idx}`"
            :class="[
              'rounded-2xl border px-3 py-3 md:px-4 md:py-4 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-center',
              person.gender === 'female'
                ? 'bg-rose-50/80 border-rose-200/70'
                : person.gender === 'male'
                ? 'bg-sky-50/80 border-sky-200/70'
                : 'bg-gray-50/80 border-gray-200/70',
            ]"
          >
            <h3
              :class="[
                'text-base md:text-lg font-extrabold tracking-wide font-heading mb-1',
                person.gender === 'female'
                  ? 'text-rose-700'
                  : person.gender === 'male'
                  ? 'text-sky-700'
                  : 'text-gray-700',
              ]"
            >
              {{ person.name }}
            </h3>
            <p class="text-xs md:text-sm text-gray-600 leading-snug">{{ person.school }}</p>
          </article>
        </div>

        <!-- Privacy note -->
        <p class="text-center text-xs text-gray-400 mt-12 max-w-xl mx-auto leading-relaxed">
          如果您是錄取者但找不到自己的名字，或對名單有任何疑問，<br class="hidden sm:inline" />
          請透過聯絡方式與我們聯繫，以便進一步確認。
        </p>
      </div>
    </div>
  </div>
</template>

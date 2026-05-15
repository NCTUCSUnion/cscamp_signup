<script setup>
import Banner from '../components/layout/Banner.vue'
import ProfessorCard from '../components/activity/ProfessorCard.vue'
import campInfo from '../data/camp-info.json'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const activity = campInfo.activity
</script>

<template>
  <div class="bg-[#f9fafb] selection:bg-primary/30">
    <Banner
      title="活動介紹"
      backgroundImage="/images/banner-default.webp"
    />

    <!-- Intro -->
    <section class="py-20 md:py-28 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-[#f9fafb] via-primary/5 to-[#f9fafb] pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
      <div class="absolute bottom-0 left-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

      <div class="container-custom relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight relative inline-block">
            特色活動
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-full"></div>
          </h2>
          <p class="mt-10 text-lg md:text-xl text-gray-600 leading-relaxed">
            {{ activity.intro }}
          </p>
        </div>
      </div>
    </section>

    <!-- NCHC Visit -->
    <section class="py-20 md:py-24 relative overflow-hidden bg-white">
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div class="container-custom relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <!-- Left: Text -->
          <div>
            <div class="flex items-center gap-3 mb-5">
              <div class="w-12 h-1.5 bg-primary rounded-full"></div>
              <span class="text-sm font-semibold tracking-widest uppercase text-primary">
                Activity 01
              </span>
            </div>

            <h3 class="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-gray-900 font-heading">
              {{ activity.nchcVisit.title }}
            </h3>
            <p class="text-lg text-gray-500 mb-6">{{ activity.nchcVisit.subtitle }}</p>

            <!-- Mobile-only inline image (between subtitle and description) -->
            <div class="lg:hidden mb-6 rounded-3xl overflow-hidden border border-primary/15 shadow-[0_10px_40px_rgba(0,0,0,0.08)] aspect-[4/3] relative bg-gradient-to-br from-primary/10 via-white to-primary/5">
              <img
                v-if="activity.nchcVisit.image"
                :src="activity.nchcVisit.image"
                alt="新竹國網中心"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="absolute inset-0 flex flex-col items-center justify-center text-primary/60 pointer-events-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5M5 12h14M5 12v5a2 2 0 002 2h10a2 2 0 002-2v-5M9 16h.01M13 16h.01M17 16h.01M9 9h.01M13 9h.01M17 9h.01" />
                </svg>
                <p class="text-sm tracking-wider">NCHC · National Center for High-performance Computing</p>
              </div>
            </div>

            <p class="text-gray-700 leading-relaxed mb-8 text-[15px] md:text-base">
              {{ activity.nchcVisit.description }}
            </p>

            <ul class="space-y-3">
              <li
                v-for="(item, idx) in activity.nchcVisit.highlights"
                :key="idx"
                class="flex items-start gap-3 p-3 rounded-xl border border-primary/15 bg-primary/5 transition-all hover:translate-x-1"
              >
                <div class="flex-shrink-0 mt-0.5 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-800 text-sm md:text-base">{{ item }}</span>
              </li>
            </ul>

            <a
              v-if="activity.nchcVisit.website"
              :href="activity.nchcVisit.website"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full border border-primary/30 bg-white text-primary text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
            >
              造訪國網中心官網
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <!-- Right: Image (desktop only - mobile image rendered inline above) -->
          <div class="hidden lg:block">
            <div class="rounded-3xl overflow-hidden border border-primary/15 shadow-[0_10px_40px_rgba(0,0,0,0.08)] aspect-[4/3] relative bg-gradient-to-br from-primary/10 via-white to-primary/5">
              <img
                v-if="activity.nchcVisit.image"
                :src="activity.nchcVisit.image"
                alt="新竹國網中心"
                class="w-full h-full object-cover"
              />
              <!-- Fallback graphic when image is missing -->
              <div
                v-else
                class="absolute inset-0 flex flex-col items-center justify-center text-primary/60 pointer-events-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5M5 12h14M5 12v5a2 2 0 002 2h10a2 2 0 002-2v-5M9 16h.01M13 16h.01M17 16h.01M9 9h.01M13 9h.01M17 9h.01" />
                </svg>
                <p class="text-sm tracking-wider">NCHC · National Center for High-performance Computing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Professor Talk -->
    <section class="py-20 md:py-28 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-[#f9fafb] via-primary/5 to-[#f9fafb] pointer-events-none"></div>
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div class="container-custom relative z-10">
        <!-- Section header -->
        <div class="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-1.5 bg-primary rounded-full"></div>
            <span class="text-sm font-semibold tracking-widest uppercase text-primary">
              Activity 02
            </span>
            <div class="w-12 h-1.5 bg-primary rounded-full"></div>
          </div>
          <h3 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3 font-heading">
            {{ activity.professorTalk.title }}
          </h3>
          <p class="text-lg text-gray-500 mb-6">{{ activity.professorTalk.subtitle }}</p>
          <p class="text-gray-700 leading-relaxed text-[15px] md:text-base">
            {{ activity.professorTalk.description }}
          </p>
        </div>

        <!-- Professor cards (Slider) -->
        <div class="max-w-5xl mx-auto">
          <div class="relative px-2 md:px-16 lg:px-20">
            <Swiper
              :modules="[Navigation, Pagination, Keyboard]"
              :slides-per-view="1"
              :space-between="24"
              :speed="500"
              :loop="true"
              :keyboard="{ enabled: true }"
              :pagination="{ clickable: true, el: '.prof-swiper-pagination' }"
              :navigation="{
                nextEl: '.prof-swiper-next',
                prevEl: '.prof-swiper-prev',
              }"
              class="professor-swiper py-4"
            >
              <SwiperSlide
                v-for="prof in activity.professors"
                :key="prof.id"
              >
                <ProfessorCard :professor="prof" />
              </SwiperSlide>

              <!-- Stay tuned slide -->
              <SwiperSlide key="stay-tuned">
                <article
                  class="relative bg-gradient-to-br from-white to-primary/5 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] overflow-hidden min-h-[720px] md:min-h-[480px] flex items-center justify-center"
                >
                  <!-- decorative blobs -->
                  <div class="absolute -top-16 -right-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div class="absolute -bottom-20 -left-20 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div class="relative z-10 text-center px-6 md:px-12 py-12 max-w-xl">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-3 font-heading">
                      更多教授，敬請期待！
                    </h3>
                    <p class="text-gray-600 leading-relaxed text-[15px] md:text-base">
                      我們仍在持續邀請更多系上教授參與本次座談會，名單將陸續公布。<br class="hidden md:inline" />
                      請持續關注報名網站與我們的粉絲專頁貼文，掌握第一手消息。
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            </Swiper>

            <!-- Custom navigation arrows (outside the card) -->
            <button
              type="button"
              class="prof-swiper-prev absolute top-1/2 -translate-y-1/2 left-0 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-primary/30 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="上一位教授"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              class="prof-swiper-next absolute top-1/2 -translate-y-1/2 right-0 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-primary/30 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="下一位教授"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Pagination dots (placed outside, below the swiper) -->
          <div class="prof-swiper-pagination flex justify-center gap-2 mt-6"></div>
        </div>

        <!-- Pre-question note -->
        <div
          v-if="activity.professorTalk.preQuestionNote"
          class="max-w-3xl mx-auto mt-16"
        >
          <div class="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] p-6 md:p-8 overflow-hidden">
            <div class="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div class="relative z-10 flex items-start gap-4">
              <div class="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-gray-900 mb-2">事先蒐集問題</h4>
                <p class="text-gray-600 leading-relaxed text-sm md:text-base">
                  {{ activity.professorTalk.preQuestionNote }}
                </p>
                <a
                  v-if="activity.questionFormUrl"
                  :href="activity.questionFormUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-fly inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full border border-primary/30 bg-white text-primary text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <span class="btn-fly-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/></svg>
                  </span>
                  前往問題蒐集表單
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- More to come -->
    <section class="py-16 md:py-20 relative overflow-hidden bg-white">
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-2xl mx-auto text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-3">更多精彩活動，敬請期待</h3>
          <p class="text-gray-600 leading-relaxed">
            營期中還有許多精心規劃的活動尚未公開，最新消息將同步公告於本網站，敬請持續關注。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hide Swiper default arrows (we use custom buttons) */
.professor-swiper :deep(.swiper-button-next),
.professor-swiper :deep(.swiper-button-prev) {
  display: none;
}

/* External pagination dots */
.prof-swiper-pagination :deep(.swiper-pagination-bullet) {
  background-color: #9ABF80;
  opacity: 0.35;
  width: 8px;
  height: 8px;
  margin: 0 !important;
  transition: all 0.3s ease;
  cursor: pointer;
}

.prof-swiper-pagination :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  width: 28px;
  border-radius: 4px;
}
</style>

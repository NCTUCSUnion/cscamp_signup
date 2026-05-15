<script setup>
import { ref } from 'vue'
import ImageSlider from '../components/ui/ImageSlider.vue'
import campInfo from '../data/camp-info.json'

const heroRef = ref(null)

const scrollToInfo = () => {
  if (!heroRef.value) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const heroBottom = heroRef.value.getBoundingClientRect().bottom + window.scrollY
  window.scrollTo({
    top: heroBottom,
    behavior: prefersReduced ? 'auto' : 'smooth',
  })
}
</script>

<template>
  <div class="bg-[#f9fafb] selection:bg-primary/30">
    <!-- Hero Section -->
    <div ref="heroRef" class="w-full h-[calc(100vh-5rem)] relative overflow-hidden flex items-center justify-center">
      <!-- A. 3 圖 crossfade + 各自 Ken Burns -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0 bg-cover bg-bottom hero-slide hero-slide-1"
          style="background-image: url('/images/hero-bg.webp');"
        ></div>
        <div
          class="absolute inset-0 bg-cover bg-center hero-slide hero-slide-2"
          style="background-image: url('/images/hero-bg2.webp');"
        ></div>
        <div
          class="absolute inset-0 bg-cover bg-center hero-slide hero-slide-3"
          style="background-image: url('/images/hero-bg3.webp');"
        ></div>
      </div>

      <!-- 朦朧 overlay：白霧 + 暗化 + blur -->
      <div class="absolute inset-0 bg-white/25 backdrop-blur-[6px] md:bg-white/25 md:backdrop-blur-[6px]"></div>
      <div class="absolute inset-0 bg-black/25 md:bg-black/25"></div>

      <!-- C. 漂浮 blob -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="hero-blob hero-blob-1 absolute w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] rounded-full bg-primary/26 md:bg-primary/30 blur-[100px] md:blur-[120px]"></div>
        <div class="hero-blob hero-blob-2 absolute w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem] rounded-full bg-[#7DA868]/20 md:bg-[#7DA868]/25 blur-[100px] md:blur-[120px]"></div>
        <div class="hero-blob hero-blob-3 absolute w-[22rem] h-[22rem] md:w-[28rem] md:h-[28rem] rounded-full bg-white/9 md:bg-white/10 blur-[90px] md:blur-[100px]"></div>
      </div>

      <!-- B. Stagger fade-in 文字 -->
      <div class="container-custom relative z-10 text-center text-white hero-content">
        <h1 class="text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-wider hero-title-reveal"><span class="hero-shine" :data-text="campInfo.campName">{{ campInfo.campName }}</span></h1>
        <h2 class="text-3xl md:text-5xl text-gray-200 mb-8 md:mb-10 tracking-wider hero-fade hero-fade-2"><span class="hero-shine hero-shine-soft" :data-text="campInfo.slogan">{{ campInfo.slogan }}</span></h2>
        <p class="text-[0.95rem] md:text-2xl text-gray-200 mb-8 md:mb-10 hero-fade hero-fade-3">{{ campInfo.mainInfo.date }}</p>
        <a 
          :href="campInfo.registration.formUrl" 
          class="btn-primary btn-fly text-base md:text-xl py-2.5 md:py-3 px-6 md:px-8 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 hero-fade hero-fade-4"
        >
          <span class="btn-fly-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/></svg>
          </span>
          立即報名
        </a>
      </div>

      <!-- G. 滾動提示 -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          type="button"
          @click="scrollToInfo"
          aria-label="向下捲動到營隊資訊"
          class="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md hero-fade hero-fade-5"
        >
          <span class="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hero-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Main Information Section -->
    <section id="camp-info" class="py-20 md:py-32 relative overflow-hidden">
      <!-- Decorational background layers -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#f9fafb] via-primary/5 to-[#f9fafb] pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
      <div class="absolute bottom-0 left-0 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full opacity-60 pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

      <div class="container-custom relative z-10">
        <div class="text-center mb-16 md:mb-20">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight relative inline-block">
            營隊資訊
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-full"></div>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-6xl mx-auto items-stretch">
          <!-- Left: Slideshow -->
          <div class="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 ring-1 ring-primary/10">
            <ImageSlider 
              :images="campInfo.images.slideshow"
              height="h-80 md:h-full md:min-h-[28rem]"
              :autoplay-delay="3000"
            />
          </div>

          <!-- Right: Key Info -->
          <div class="flex flex-col justify-center">
            <div class="relative bg-gradient-to-br from-white to-gray-50 p-8 md:p-10 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] overflow-hidden">
              <div class="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

              <ul class="space-y-5 relative z-10">
                <li class="group flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg text-gray-900">日期</h3>
                    <p class="text-gray-600">{{ campInfo.mainInfo.date }}</p>
                  </div>
                </li>
                <li class="group flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg text-gray-900">地點</h3>
                    <p class="text-gray-600">{{ campInfo.mainInfo.location }}</p>
                  </div>
                </li>
                <li class="group flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg text-gray-900">對象</h3>
                    <p class="text-gray-600">{{ campInfo.mainInfo.audience }}</p>
                  </div>
                </li>
                <li class="group flex items-start gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg text-gray-900">費用</h3>
                    <p class="text-gray-600">{{ campInfo.mainInfo.fee }}</p>
                  </div>
                </li>
              </ul>

              <div class="mt-8 text-center relative z-10">
                <a 
                  :href="campInfo.registration.formUrl" 
                  class="btn-primary btn-fly shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span class="btn-fly-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/></svg>
                  </span>
                  立即報名
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Navigation Cards -->
    <section class="py-20 md:py-32 relative overflow-hidden bg-white">
      <!-- Subtle top border with gradient -->
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/5 via-white to-white pointer-events-none"></div>

      <div class="container-custom relative z-10">
        <div class="text-center mb-16 md:mb-20">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight relative inline-block">
            探索更多
            <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-full"></div>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 max-w-7xl mx-auto">
          <!-- Registration Card -->
          <router-link 
            to="/registration" 
            class="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.25)] hover:-translate-y-2 transition-all duration-500 overflow-hidden block"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" style="background-image: url('/images/teams-card.webp');"></div>
            </div>
            <div class="p-6 relative z-20">
              <h3 class="text-xl font-bold mb-2 text-gray-900 tracking-tight">報名資訊</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">了解報名流程、費用說明與重要時程。</p>
              <span class="text-primary font-semibold inline-flex items-center">
                查看詳情
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </router-link>

          <!-- Activity Card -->
          <router-link
            to="/activity"
            class="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.25)] hover:-translate-y-2 transition-all duration-500 overflow-hidden block"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" style="background-image: url('/images/activity/nchc.webp');"></div>
            </div>
            <div class="p-6 relative z-20">
              <h3 class="text-xl font-bold mb-2 text-gray-900 tracking-tight">活動介紹</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">國網中心參訪、教授座談與更多精彩活動。</p>
              <span class="text-primary font-semibold inline-flex items-center">
                查看詳情
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </router-link>

          <!-- Courses Card -->
          <router-link 
            to="/courses" 
            class="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.25)] hover:-translate-y-2 transition-all duration-500 overflow-hidden block"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" style="background-image: url('/images/courses-card.webp');"></div>
            </div>
            <div class="p-6 relative z-20">
              <h3 class="text-xl font-bold mb-2 text-gray-900 tracking-tight">課程介紹</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">探索我們精心設計的程式教學課程。</p>
              <span class="text-primary font-semibold inline-flex items-center">
                查看詳情
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </router-link>

          <!-- Teams Card -->
          <router-link
            to="/team"
            class="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_12px_40px_rgba(154,191,128,0.08)] hover:shadow-[0_20px_50px_rgba(154,191,128,0.25)] hover:-translate-y-2 transition-all duration-500 overflow-hidden block"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
            <div class="h-48 overflow-hidden relative">
              <div class="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" style="background-image: url('/images/registration-card.webp');"></div>
            </div>
            <div class="p-6 relative z-20">
              <h3 class="text-xl font-bold mb-2 text-gray-900 tracking-tight">各組介紹</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">認識六大組別與他們的職責。</p>
              <span class="text-primary font-semibold inline-flex items-center">
                查看詳情
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .hero-content h1 {
    font-size: 3rem;
  }
}

/* A. 3 圖 crossfade + 各自 Ken Burns
   每張顯示窗口 9s，前後 1.5s 交疊，total cycle 27s
   時間軸（百分比）：
     slide-1: 0% in → 33.3% out
     slide-2: 33.3% in → 66.6% out
     slide-3: 66.6% in → 100% (loop back to slide-1)
*/
.hero-slide {
  opacity: 0;
  will-change: transform, opacity;
  animation: heroCrossfade 27s ease-in-out infinite, heroKenburns 12s ease-in-out infinite alternate;
}

.hero-slide-1 { animation-delay: 0s, 0s; }
.hero-slide-2 { animation-delay: -18s, -3s; }
.hero-slide-3 { animation-delay: -9s, -6s; }

@keyframes heroCrossfade {
  0%   { opacity: 0; }
  5%   { opacity: 1; }
  33%  { opacity: 1; }
  38%  { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes heroKenburns {
  0%   { transform: scale(1.08) translate(0, 0); }
  100% { transform: scale(1.2) translate(-5%, -4%); }
}

/* B. Stagger fade-in（從下方滑入） */
.hero-fade {
  opacity: 0;
  transform: translateY(24px);
  animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-title-reveal {
  opacity: 0;
  transform: translateY(32px) scale(0.96);
  animation: heroTitleReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
}

.hero-fade-2 { animation-delay: 1s; }
.hero-fade-3 { animation-delay: 1.3s; }
.hero-fade-4 { animation-delay: 1.65s; }
.hero-fade-5 { animation-delay: 2.15s; }

@keyframes heroTitleReveal {
  0% {
    opacity: 0;
    transform: translateY(32px) scale(0.96);
    filter: blur(6px);
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes heroFadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* B-2. 標題高光反射 */
.hero-shine {
  position: relative;
  display: inline-block;
  /* 底色略偏冷白，讓高光帶看得出對比 */
  color: #c1dbb2;
}

.hero-shine-soft {
  color: #c9ced6;
}

/* 上層用 ::after 疊一條高光帶，並用 screen 混色直接加亮底字 */
.hero-shine::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* 微微帶綠的暖光：primary #9ABF80 系，核心保留亮白避免變死綠 */
  background-image: linear-gradient(
    105deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 44%,
    rgba(154, 191, 128, 0.55) 47%,
    rgba(184, 212, 154, 0.95) 49%,
    #f3fce4 50%,
    rgba(184, 212, 154, 0.95) 51%,
    rgba(154, 191, 128, 0.55) 53%,
    rgba(255, 255, 255, 0) 56%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 300% 100%;
  background-position: 160% 0;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  mix-blend-mode: screen;
  animation: heroShineSweep 8s linear 1.0s infinite;
  will-change: background-position;
}

.hero-shine-soft::after {
  animation-duration: 8s;
  animation-delay: 3.0s;
}

@keyframes heroShineSweep {
  0%   { background-position: 160% 0; }
  80%  { background-position: -60% 0; }
  100% { background-position: -60% 0; }
}

/* C. 漂浮 blob */
.hero-blob {
  will-change: transform;
}

.hero-blob-1 {
  top: -10%;
  left: -10%;
  animation: blobFloat1 12s ease-in-out infinite alternate;
}

.hero-blob-2 {
  bottom: -15%;
  right: -10%;
  animation: blobFloat2 22s ease-in-out infinite alternate;
}

.hero-blob-3 {
  top: 30%;
  right: 20%;
  animation: blobFloat3 16s ease-in-out infinite alternate;
}

@keyframes blobFloat1 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(30vw, 26vh) scale(1.3); }
  100% { transform: translate(50vw, 40vh) scale(1.5); }
}

@keyframes blobFloat2 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-12vw, -10vh) scale(1.08); }
  100% { transform: translate(-24vw, -18vh) scale(1.18); }
}

@keyframes blobFloat3 {
  0%   { transform: translate(0, 0) scale(0.9); }
  50%  { transform: translate(-20vw, 8vh) scale(1.12); }
  100% { transform: translate(-38vw, 18vh) scale(1.32); }
}

/* G. 滾動提示 bounce */
.hero-bounce {
  animation: heroBounce 2s ease-in-out infinite;
}

@keyframes heroBounce {
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50%      { transform: translateY(8px); opacity: 1; }
}

/* 尊重 prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .hero-slide,
  .hero-blob,
  .hero-bounce {
    animation: none;
  }
  .hero-slide-1 { opacity: 1; }
  .hero-slide-2,
  .hero-slide-3 { opacity: 0; }
  .hero-fade {
    opacity: 1;
    transform: none;
    animation: none;
  }
  .hero-shine {
    color: #ffffff;
  }
  .hero-shine-soft {
    color: #e5e7eb;
  }
  .hero-shine::after {
    display: none;
  }
}
</style>

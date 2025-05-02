<script setup>
import { ref } from 'vue'
import campInfo from '../../data/camp-info.json'

const isMenuOpen = ref(false)
const isTeamDropdownOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleTeamDropdown = () => {
  isTeamDropdownOpen.value = !isTeamDropdownOpen.value
}

// Navigation links
const navLinks = [
  { name: '首頁', path: '/' },
  { name: '報名資訊', path: '/registration' },
  { name: '各組介紹', path: '/team', hasDropdown: true },
  { name: '課程簡介', path: '/courses' },
  { name: '常見 QA', path: '/faq' },
]

// Get teams from camp-info.json
const teams = campInfo.teams
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="container-custom py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex flex-col items-start" @click="closeMenu">
          <span class="nav-title text-xl font-bold text-primary font-heading relative">
            2025 交大資訊逐夢營
            <span class="hover-line"></span>
          </span>
          <span class="text-sm text-gray-400 font-heading font-bold">{{ campInfo.slogan }}</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <div v-for="link in navLinks" :key="link.name" class="relative group">
            <!-- Regular nav link -->
            <template v-if="!link.hasDropdown">
              <router-link 
                :to="link.path"
                class="text-gray-700 hover:text-primary font-bold transition-colors font-heading flex items-center h-10 nav-link relative"
              >
                {{ link.name }}
                <span class="hover-line"></span>
              </router-link>
            </template>
            
            <!-- Dropdown nav link -->
            <template v-else>
              <div class="relative">
                <router-link 
                  :to="link.path"
                  class="text-gray-700 hover:text-primary font-bold transition-colors font-heading flex items-center h-10 nav-link relative"
                >
                  {{ link.name }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 dropdown-arrow transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span class="hover-line"></span>
                </router-link>
                
                <!-- Dropdown menu -->
                <div class="absolute left-0 mt-0 w-36 bg-white shadow-lg rounded-md overflow-hidden z-50 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-500 ease-in-out">
                  <router-link 
                    v-for="team in teams" 
                    :key="team.id" 
                    :to="`/team/${team.id}`"
                    class="block px-4 py-3 text-gray-500 hover:bg-gray-100 hover:text-primary transition-colors font-heading font-bold border-b border-gray-100 last:border-b-0"
                  >
                    {{ team.name }}
                  </router-link>
                </div>
              </div>
            </template>
          </div>
          
          <a 
            href="https://forms.gle/XQW8x9MB258HQm5v8" 
            class="btn-primary font-heading flex items-center justify-center"
          >
            立即報名
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden text-gray-700 focus:outline-none" 
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <transition name="menu-slide">
        <div 
          v-show="isMenuOpen"
          class="md:hidden mt-4 pb-4 space-y-3"
        >
        <!-- Regular links -->
        <router-link 
          v-for="link in navLinks.filter(l => !l.hasDropdown)" 
          :key="link.name" 
          :to="link.path"
          class="block hover:text-primary py-2 font-bold font-heading flex items-center nav-link relative"
          @click="closeMenu"
        >
          {{ link.name }}
          <span class="hover-line"></span>
        </router-link>
        
        <!-- Team dropdown for mobile -->
        <div class="relative">
          <div 
            class="flex justify-between items-center text-gray-700 hover:text-primary py-2 font-bold font-heading cursor-pointer"
          >
            <div 
              class="flex items-center hover:text-primary font-bold font-heading nav-link relative cursor-pointer"
              @click="toggleTeamDropdown"
            >
              <span>各組介紹</span>
              <span class="hover-line"></span>
            </div>
            <div class="flex">
              <router-link 
                to="/team"
                class="mr-2 text-sm text-gray-500 hover:text-primary"
                @click="closeMenu"
              >
                查看全部
              </router-link>
              <svg xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 transition-transform dropdown-arrow-mobile" 
                :class="{'rotate-180': isTeamDropdownOpen}" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                @click="toggleTeamDropdown"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <!-- Mobile Team Dropdown -->
          <transition name="dropdown-slide">
            <div v-show="isTeamDropdownOpen" class="pl-4 mt-2 border-l-2 border-gray-200 space-y-2">
            <router-link 
              v-for="team in teams" 
              :key="team.id" 
              :to="`/team/${team.id}`"
              class="block text-gray-500 hover:text-primary py-2 font-heading font-bold"
              @click="closeMenu"
            >
              {{ team.name }}
            </router-link>
          </div>
          </transition>
        </div>
        
        <a 
          href="https://forms.gle/XQW8x9MB258HQm5v8" 
          class="block btn-primary text-center mt-4 font-heading flex items-center justify-center py-2"
        >
          立即報名
        </a>
      </div>
      </transition>
    </div>
  </nav>
</template>

<style scoped>
.nav-title, .nav-link {
  position: relative;
  padding-bottom: 2px;
  transition: color 0.3s;
}

.nav-title {
  color: var(--color-primary, theme('colors.primary'));
}

.nav-title:hover {
  color: gray;
}

.nav-link:hover {
  color: var(--color-primary, theme('colors.primary'));
}

.hover-line {
  position: absolute;
  left: 50%;
  bottom: 2px;
  width: 0;
  height: 1.5px;
  background-color: var(--color-primary, theme('colors.primary'));
  transform: translateX(-50%);
  transition: width 0.2s ease;
}

.nav-title:hover .hover-line, .nav-link:hover .hover-line {
  width: 100%;
}

/* Dropdown menu animation */
.group:hover .absolute {
  display: block;
}

/* Mobile menu animations */
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s ease-out;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Team dropdown animations */
.dropdown-slide-enter-active,
.dropdown-slide-leave-active {
  transition: all 0.25s ease-out;
  max-height: 300px;
  overflow: hidden;
}

.dropdown-slide-enter-from,
.dropdown-slide-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

/* Keep parent link in hover state when hovering dropdown */
.group:hover .nav-link {
  color: var(--color-primary, theme('colors.primary'));
}

.group:hover .hover-line {
  width: 100%;
}

/* Dropdown arrow animation */
.dropdown-arrow {
  transform: translateY(0);
  opacity: 1;
}

.group:hover .dropdown-arrow {
  transform: translateY(5px);
  opacity: 0;
}

/* Mobile dropdown arrow animation (when not expanded) */
.dropdown-arrow-mobile {
  transition: all 0.5s ease;
}

div:hover .dropdown-arrow-mobile:not(.rotate-180) {
  transform: translateY(5px);
  opacity: 0;
}
</style> 
<script setup>
import { ref } from 'vue'
import campInfo from '../../data/camp-info.json'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Navigation links
const navLinks = [
  { name: '首頁', path: '/' },
  { name: '報名資訊', path: '/registration' },
  { name: '各組介紹', path: '/team' },
  { name: '課程簡介', path: '/courses' },
  { name: '常見 QA', path: '/faq' },
]
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
          <span class="text-sm text-gray-600 font-heading">{{ campInfo.slogan }}</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.path"
            class="text-gray-700 hover:text-primary font-bold transition-colors font-heading flex items-center h-10 nav-link relative"
          >
            {{ link.name }}
            <span class="hover-line"></span>
          </router-link>
          <a 
            href="#" 
            class="btn-primary font-heading flex items-center justify-center"
            @click.prevent="$router.push('/registration')"
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
      <div 
        v-show="isMenuOpen"
        class="md:hidden mt-4 pb-4 space-y-3"
      >
        <router-link 
          v-for="link in navLinks" 
          :key="link.name" 
          :to="link.path"
          class="block text-gray-700 hover:text-primary py-2 font-bold font-heading flex items-center nav-link relative"
          @click="closeMenu"
        >
          {{ link.name }}
          <span class="hover-line"></span>
        </router-link>
        <a 
          href="#" 
          class="block btn-primary text-center mt-4 font-heading flex items-center justify-center py-2"
          @click.prevent="$router.push('/registration'); closeMenu()"
        >
          立即報名
        </a>
      </div>
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
  color: #F59E0B;

}

.nav-title:hover {
  color: gray;
}

.nav-link:hover {
  color: #F59E0B;
}

.hover-line {
  position: absolute;
  left: 50%;
  bottom: 2px;
  width: 0;
  height: 1.5px;
  background-color: #F59E0B;;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-title:hover .hover-line, .nav-link:hover .hover-line {
  width: 100%;
}
</style> 
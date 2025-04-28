<script setup>
import { onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  height: {
    type: String,
    default: 'h-96'
  },
  autoplayDelay: {
    type: Number,
    default: 5000
  }
})
</script>

<template>
  <div class="w-full">
    <Swiper
      :modules="[Autoplay, Navigation, Pagination]"
      :slides-per-view="1"
      :speed="800"
      :loop="true"
      :autoplay="{
        delay: autoplayDelay,
        disableOnInteraction: false
      }"
      :pagination="{
        clickable: true
      }"
      :navigation="true"
      class="w-full rounded-lg overflow-hidden"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <div 
          :class="[height, 'w-full bg-cover bg-center']"
          :style="{ backgroundImage: `url(${image})` }"
        ></div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 20px;
}

:deep(.swiper-pagination-bullet) {
  background-color: white;
  opacity: 0.6;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: white;
  opacity: 1;
}
</style> 
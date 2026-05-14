<script setup>
import campInfo from '../../data/camp-info.json'

const currentYear = new Date().getFullYear()

const relatedLinks = [
  {
    name: '國立陽明交通大學',
    url: 'https://www.nycu.edu.tw/nycu/ch/index',
    logo: '/images/links/國立陽明交通大學.png',
  },
  {
    name: '國立陽明交通大學資訊工程學系',
    url: 'https://www.cs.nycu.edu.tw/',
    logo: '/images/links/國立陽明交通大學資訊工程學系.png',
  },
  {
    name: '陽明交大資訊人',
    url: 'https://www.cs.nycu.edu.tw/intro/magazine',
    logo: '/images/links/陽明交大資訊人.png',
  },
]
</script>

<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container-custom">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-[auto_auto_auto] gap-x-20 gap-y-8 items-start">
          <!-- Contact -->
          <div>
            <h4 class="text-lg font-bold mb-4">聯絡我們</h4>
            <ul class="space-y-2">
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>
                  官方信箱：<a :href="`mailto:${campInfo.contact.email}`" class="hover:text-primary transition-colors underline">{{ campInfo.contact.email }}</a>
                </span>
              </li>
              <li
                v-for="person in campInfo.contact.people"
                :key="person.role"
                class="flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>
                  {{ person.role }}：{{ person.name }} / {{ person.phone }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Social Media -->
          <div>
            <h4 class="text-lg font-bold mb-4">社群媒體</h4>
            <div class="flex space-x-3">
              <a
                href="https://www.instagram.com/nycucscamp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                class="social-badge social-badge--ig"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/nctucsChaseDream"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                class="social-badge social-badge--fb"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Related Links (marquee) -->
          <div class="min-w-0 w-full">
            <h4 class="text-lg font-bold mb-4">相關連結</h4>
            <div class="footer-marquee" aria-label="相關單位連結">
              <div class="footer-marquee-track">
                <a
                  v-for="(link, i) in [...relatedLinks, ...relatedLinks, ...relatedLinks, ...relatedLinks]"
                  :key="`${link.name}-${i}`"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-marquee-item"
                  :aria-hidden="i >= relatedLinks.length ? 'true' : null"
                  :tabindex="i >= relatedLinks.length ? -1 : null"
                >
                  <img :src="link.logo" :alt="link.name" loading="lazy" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {{ currentYear }} 交大資訊逐夢營. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.social-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  color: #ffffff;
  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.social-badge:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.social-badge--ig {
  background: radial-gradient(
    circle at 30% 110%,
    #fdd667 0%,
    #f56040 25%,
    #d6249f 55%,
    #833ab4 80%,
    #285aeb 100%
  );
}

.social-badge--fb {
  background: #1877f2;
}

.footer-marquee {
  position: relative;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 8%,
    #000 92%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 8%,
    #000 92%,
    transparent 100%
  );
}

.footer-marquee-track {
  display: flex;
  align-items: center;
  gap: 1.0rem;
  width: max-content;
  animation: footerMarquee 12s linear infinite;
}

.footer-marquee:hover .footer-marquee-track {
  animation-play-state: paused;
}

.footer-marquee-item {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.5rem;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.875rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 6px 18px rgba(0, 0, 0, 0.18);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.footer-marquee-item:hover {
  transform: translateY(-2px);
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 10px 24px rgba(0, 0, 0, 0.25);
}

.footer-marquee-item img {
  height: 3.5rem;
  width: auto;
  object-fit: contain;
  display: block;
}

@keyframes footerMarquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer-marquee-track {
    animation: none;
  }
}
</style> 
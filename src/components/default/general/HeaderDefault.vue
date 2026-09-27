<template>
  <header class="sticky top-0 z-30 bg-white shadow-sm">
    <div class="flex justify-between items-center py-4 px-4 md:px-8">
      <!-- Logo -->
      <router-link :to="{ name: 'HomePage' }" class="flex items-center gap-1 shrink-0">
        <span class="text-2xl md:text-3xl font-extrabold text-[#0085db]">LM</span>
        <span class="text-2xl md:text-3xl font-extrabold text-textPrimary">Academy</span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-1 text-base lg:text-lg font-medium">
        <router-link
          :to="{ name: 'HomePage' }"
          class="px-4 py-2 rounded-full text-textPrimary hover:bg-[#0085db]/10 hover:text-[#0085db] transition-colors"
          exact-active-class="!text-[#0085db] bg-[#0085db]/10"
        >
          Home
        </router-link>
        <router-link
          :to="{ name: 'AboutPage' }"
          class="px-4 py-2 rounded-full text-textPrimary hover:bg-[#0085db]/10 hover:text-[#0085db] transition-colors"
          exact-active-class="!text-[#0085db] bg-[#0085db]/10"
        >
          About Us
        </router-link>
        <router-link
          :to="{ name: 'LoginPage' }"
          class="btn ml-2 text-base px-6 py-2 shadow-md hover:shadow-lg hover:bg-[#0071c1] transition-all"
        >
          Login
        </router-link>
      </nav>

      <!-- Mobile Hamburger Button -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
        aria-label="Toggle mobile menu"
      >
        <span
          class="block w-6 h-0.5 bg-textPrimary transition-all duration-300"
          :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen }"
        ></span>
        <span
          class="block w-6 h-0.5 bg-textPrimary transition-all duration-300"
          :class="{ 'opacity-0': isMobileMenuOpen }"
        ></span>
        <span
          class="block w-6 h-0.5 bg-textPrimary transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"
        ></span>
      </button>
    </div>

    <!-- Mobile Navigation Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden fixed inset-0 bg-black/50 z-40"
      @click="closeMobileMenu"
    ></div>

    <!-- Mobile Navigation Menu -->
    <nav
      class="md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-0': isMobileMenuOpen, 'translate-x-full': !isMobileMenuOpen }"
    >
      <div class="flex flex-col h-full">
        <!-- Close button -->
        <div class="flex justify-end p-4">
          <button
            @click="closeMobileMenu"
            class="text-textPrimary hover:text-gray-600"
            aria-label="Close mobile menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Navigation Links -->
        <div class="flex flex-col px-6 py-4 gap-2">
          <router-link
            :to="{ name: 'HomePage' }"
            @click="closeMobileMenu"
            class="text-lg font-medium text-textPrimary px-4 py-2.5 rounded-lg hover:bg-[#0085db]/10 hover:text-[#0085db] transition-colors"
            exact-active-class="!text-[#0085db] bg-[#0085db]/10"
          >
            Home
          </router-link>

          <router-link
            :to="{ name: 'AboutPage' }"
            @click="closeMobileMenu"
            class="text-lg font-medium text-textPrimary px-4 py-2.5 rounded-lg hover:bg-[#0085db]/10 hover:text-[#0085db] transition-colors"
            exact-active-class="!text-[#0085db] bg-[#0085db]/10"
          >
            About Us
          </router-link>

          <router-link
            :to="{ name: 'LoginPage' }"
            @click="closeMobileMenu"
            class="btn text-center text-base mt-2"
          >
            Login
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu on escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Close mobile menu on window resize to desktop size
const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Custom scrollbar for mobile menu */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: #f1f1f1;
}

nav::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

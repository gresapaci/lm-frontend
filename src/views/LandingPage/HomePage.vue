<script setup>
import { onMounted, ref } from 'vue'
import Axios from '@/utils/axios'

const quote = ref('')
const author = ref('')

const fetchZenQuoteApi = async () => {
  try {
    const response = await Axios.get('/zen-quote')
    const data = response.data

    if (data.success) {
      quote.value = data.quote.text
      author.value = data.quote.author
    } else {
      quote.value = "The world would go on even without you. Don't take yourself so seriously."
      author.value = 'Norman Vincent Peale'
    }
  } catch (error) {
    console.log('Error fetching Zen quote', error)
  }
}

const features = [
  {
    icon: 'ti-book',
    title: 'Courses',
    description: 'Enroll in courses, work through modules and sections at your own pace.',
    color: '#0085db',
  },
  {
    icon: 'ti-trophy',
    title: 'Scoreboard',
    description: 'Earn points for every course you complete and climb the leaderboard.',
    color: '#f0b429',
  },
  {
    icon: 'ti-dice',
    title: 'Random Game',
    description: 'A fun way to pick a random winner from your class or a custom list.',
    color: '#4bd08b',
  },
]

onMounted(() => {
  fetchZenQuoteApi()
})
</script>

<template>
  <div class="flex flex-col gap-20 py-10">
    <!-- Hero -->
    <div class="relative overflow-hidden rounded-3xl px-6 py-16 md:py-24">
      <div
        class="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full bg-[#0085db]/10 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-[#4bd08b]/10 blur-3xl"
      ></div>

      <div class="relative flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
        <span
          class="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-[#0085db] bg-[#0085db]/10 rounded-full px-4 py-1.5"
        >
          Student Learning Platform
        </span>

        <h1 class="text-4xl md:text-6xl font-extrabold text-textPrimary leading-tight tracking-tight">
          Welcome to <span class="text-[#0085db]">Learn More Academy</span>
        </h1>
        <p class="text-lg md:text-xl text-[#6b7684] max-w-xl">
          Empowering students with the skills of tomorrow, one course at a time.
        </p>

        <router-link
          :to="{ name: 'LoginPage' }"
          class="btn mt-2 text-base md:text-lg px-10 py-3 shadow-lg hover:shadow-xl hover:bg-[#0071c1] transition-all"
        >
          Get Started
        </router-link>
      </div>
    </div>

    <!-- Features -->
    <div class="flex flex-col gap-10">
      <div class="text-center max-w-xl mx-auto">
        <span
          class="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-[#0085db] bg-[#0085db]/10 rounded-full px-4 py-1.5 mb-4"
        >
          What We Offer
        </span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-textPrimary tracking-tight mb-3">
          Everything You Need to Succeed
        </h2>
        <p class="text-base md:text-lg text-[#6b7684]">
          A simple, focused set of tools to help you learn, track progress, and stay motivated.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="card overflow-hidden"
        >
          <div class="card-body flex flex-col items-center text-center gap-3">
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center"
              :style="{ backgroundColor: feature.color + '1a' }"
            >
              <i :class="['ti', feature.icon, 'text-2xl']" :style="{ color: feature.color }"></i>
            </div>
            <h3 class="text-xl font-bold text-textPrimary">{{ feature.title }}</h3>
            <p class="text-base text-[#6b7684] leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quote -->
    <div class="card max-w-2xl mx-auto">
      <div class="card-body text-center flex flex-col items-center gap-4">
        <i class="ti ti-quote text-4xl text-[#0085db]/40"></i>
        <p class="italic font-gelasio text-xl md:text-2xl text-[#003366] leading-relaxed">
          {{ quote || 'Loading...' }}
        </p>
        <p class="text-sm md:text-base font-medium text-[#8694A9] uppercase tracking-wider">
          {{ author || 'Unknown' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.isAdmin)
const isUser = computed(() => userStore.isUser)

const generalFaqs = [
  {
    question: 'How do I update my profile information?',
    answer:
      'Open your avatar menu (top right) and go to "My Profile". From there you can update your name, gender, academic year, birthday, phone, address, about section, and profile picture.',
  },
  {
    question: 'How do I change my password?',
    answer:
      'Go to "My Profile" and click "Change password" in the top right corner, or navigate there directly from the sidebar. You will need to enter your old password and confirm the new one.',
  },
  {
    question: 'What is the Random Game?',
    answer:
      'Random Game lets you pick a random winner from a list of users or pasted email addresses - useful for giveaways or picking a volunteer. Click "Pick a Random Winner" once your list is ready.',
  },
]

const studentFaqs = [
  {
    question: 'How do I see the courses I am enrolled in?',
    answer:
      'Go to "Courses" in the sidebar to see all courses you have access to, along with your completion status for each one.',
  },
  {
    question: 'How does course progress work?',
    answer:
      'Each course is split into modules, and each module into sections. Open a section and click "Mark as Complete" once you have gone through its materials. A module reaches 100% once all its sections are completed, and the course is complete once all modules are done.',
  },
  {
    question: 'How do I earn Scoreboard points?',
    answer:
      'You earn exactly 1 point the first time you complete a course 100%. Completing the same course again, or repeating a section you already finished, will not grant extra points. Points and rankings are updated on the backend and shown next time the Scoreboard page loads.',
  },
  {
    question: 'Why don\'t my Scoreboard points update immediately?',
    answer:
      'The Scoreboard reflects the latest data whenever the page is loaded or refreshed. If you just completed a course, refresh the Scoreboard page to see your updated points and ranking.',
  },
]

const adminFaqs = [
  {
    question: 'How do I create a new course?',
    answer:
      'Go to "Courses" under the Courses section, then click "Create Course". After creating it, open it to add modules, sections, and materials.',
  },
  {
    question: 'How do I invite new students?',
    answer:
      'Go to "Send User Invite" and paste one or more email addresses separated by commas. Each valid, new email receives an invite link by email to create their account. The results panel shows which invites succeeded, which emails were invalid, which already exist, and which failed to send.',
  },
  {
    question: 'How is a student\'s course completion tracked?',
    answer:
      'Use "Course Stats" to filter by user and/or course and see detailed progress. The Users list also shows each student\'s role and status.',
  },
  {
    question: 'Can I deactivate a course without deleting it?',
    answer:
      'Yes. Open the course from the Courses list and use the Activate/Deactivate toggle. Deactivated courses are hidden from students but not deleted.',
  },
]

const openIndex = ref(null)
const toggle = (key) => {
  openIndex.value = openIndex.value === key ? null : key
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800">Help &amp; FAQ</h2>

    <div class="card">
      <div class="card-body">
        <p class="text-sm text-gray-500 mb-6">
          Answers to common questions about using LM Academy. Can't find what you're looking for?
          Reach out at
          <a href="mailto:learnmore.at.academy@gmail.com" class="text-blue-600 hover:text-blue-700">
            learnmore.at.academy@gmail.com</a
          >.
        </p>

        <template v-for="(section, sIndex) in [
          { title: 'General', items: generalFaqs, show: true },
          { title: 'For Students', items: studentFaqs, show: isUser },
          { title: 'For Admins', items: adminFaqs, show: isAdmin },
        ]" :key="section.title">
          <div v-if="section.show" class="mb-8 last:mb-0">
            <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {{ section.title }}
            </h3>

            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <div
                v-for="(faq, index) in section.items"
                :key="faq.question"
                class="border-b border-gray-200 last:border-b-0"
              >
                <button
                  type="button"
                  class="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                  @click="toggle(`${sIndex}-${index}`)"
                >
                  <span class="font-medium text-gray-800">{{ faq.question }}</span>
                  <svg
                    class="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform"
                    :class="{ 'rotate-180': openIndex === `${sIndex}-${index}` }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div v-if="openIndex === `${sIndex}-${index}`" class="px-4 pb-4">
                  <p class="text-sm text-gray-500 leading-relaxed">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

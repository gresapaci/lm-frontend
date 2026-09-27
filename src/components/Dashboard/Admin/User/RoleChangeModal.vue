<script setup>
import { ref, watch } from 'vue'
import SimpleModal from '@/components/Dashboard/General/SimpleModal.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  currentRole: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['confirm', 'close'])

const roleOptions = ['Admin', 'Instructor', 'User']
const selectedRole = ref(props.currentRole)

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      // Default to a different role than the current one.
      selectedRole.value = roleOptions.find((role) => role !== props.currentRole) || roleOptions[0]
    }
  }
)

const handleConfirm = () => {
  emit('confirm', selectedRole.value)
}
</script>

<template>
  <SimpleModal
    :isOpen="isOpen"
    title="Change role for this user"
    @confirm="handleConfirm"
    @close="$emit('close')"
  >
    <template #body>
      <div class="space-y-4">
        <p class="text-gray-600">
          Current role: <span class="font-semibold">{{ currentRole }}</span>
        </p>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">New role</label>
          <select
            v-model="selectedRole"
            class="w-full py-3 px-4 border border-gray-200 rounded-md bg-white text-sm focus:border-blue-600 focus:ring-0"
          >
            <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>

        <p class="text-gray-600">
          <span class="font-semibold text-orange-600">Warning: </span>Changing the user's role may
          impact their access to certain activities and permissions associated with their current
          role.
        </p>
      </div>
    </template>

    <template #footer>
      <button
        @click="handleConfirm"
        :disabled="selectedRole === currentRole"
        class="px-12 py-3 bg-[#F8C076] text-white rounded-full hover:bg-[#F8C076]/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Change Role
      </button>
    </template>
  </SimpleModal>
</template>

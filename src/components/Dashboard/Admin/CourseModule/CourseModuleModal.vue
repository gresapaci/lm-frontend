<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Axios from '@/utils/axios'
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  courseId: {
    type: [String, Number],
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  moduleId: {
    type: [String, Number],
    default: null,
  },
})

const emit = defineEmits(['close', 'success'])

const toast = useToast()
const loading = ref(false)
const formKey = ref(0)
const fetchingModule = ref(false)
const initialValues = ref({
  title: '',
  description: '',
})

const schema = yup.object({
  title: yup.string().required('Title is required').max(255),
  description: yup.string().required('Description is required'),
})

const isEditMode = computed(() => !!props.moduleId)
const buttonText = computed(() => (isEditMode.value ? 'Update' : 'Create'))

const fetchModule = async () => {
  if (!props.moduleId) {
    initialValues.value = { title: '', description: '' }
    fetchingModule.value = false
    formKey.value++
    return
  }

  try {
    fetchingModule.value = true
    const { data } = await Axios.get(`modules/${props.moduleId}`)

    if (!data.success) throw new Error(data?.message || 'Failed to fetch module')

    initialValues.value = {
      title: data.module.title || '',
      description: data.module.description || '',
    }

    formKey.value++
  } catch (err) {
    toast.error(err.response?.data?.message || err?.message || 'Failed to fetch module')
    emit('close')
  } finally {
    fetchingModule.value = false
  }
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      fetchModule()
    }
  },
)

watch(
  () => props.moduleId,
  () => {
    if (props.isOpen) {
      fetchModule()
    }
  },
)

const handleBackdropClick = () => {
  if (!loading.value) {
    emit('close')
  }
}
const handleClose = () => {
  if (!loading.value) {
    emit('close')
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen && !loading.value) {
    emit('close')
  }
}

const onSubmit = async (values, { resetForm }) => {
  try {
    loading.value = true

    if (isEditMode.value) {
      const { data } = await Axios.put(`/modules/${props.moduleId}`, {
        title: values.title,
        description: values.description,
      })

      if (!data.success) throw new Error(data?.message || 'Failed to update module')
      toast.success(data.message || 'Module updated successfully')
    } else {
      const { data } = await Axios.post(`/modules`, {
        course_id: props.courseId,
        title: values.title,
        description: values.description,
      })

      if (!data.success) throw new Error(data?.message || 'Failed to create module')
      toast.success(data.message || 'Module created successfully')
    }

    resetForm({ values: { ...initialValues.value } })
    emit('success')
    emit('close')
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
        err?.message ||
        `Failed to ${isEditMode.value ? 'update' : 'create'} module`,
    )
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
    @click="handleBackdropClick"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-[80%] max-w-5xl mx-4 transform transition-all"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-center relative p-6">
        <h3 class="text-3xl font-bold text-center pr-10 text-gray-900">{{ courseTitle }}</h3>
        <button
          @click="handleClose"
          :disabled="loading || fetchingModule"
          class="absolute right-6 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Body -->

      <div class="p-6">
        <!-- Loading state -->
        <div v-if="fetchingModule" class="flex items-center justify-center py-12">
          <div class="flex flex-col items-center gap-4">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F8EFA]"></div>
            <p class="text-gray-500 text-sm">Loading module data...</p>
          </div>
        </div>

        <!-- Form -->
        <Form
          v-else
          :key="formKey"
          :initial-values="initialValues"
          :validation-schema="schema"
          v-slot="{ handleSubmit }"
        >
          <form @submit.prevent="handleSubmit(onSubmit)" class="space-y-6">
            <div>
              <label class="block text-sm mb-2 text-gray-400">Title</label>
              <Field
                name="title"
                as="input"
                type="text"
                placeholder="Enter module title"
                class="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-600 focus:ring-0 disabled:opacity-50"
                :disabled="loading"
              />
              <ErrorMessage name="title" class="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label class="block text-sm mb-2 text-gray-400">Description</label>
              <Field
                name="description"
                as="textarea"
                rows="6"
                placeholder="Write a brief description..."
                class="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-600 focus:ring-0 disabled:opacity-50"
                :disabled="loading"
              />
              <ErrorMessage name="description" class="text-red-500 text-xs mt-1" />
            </div>

            <!-- Footer -->
            <div class="flex justify-end gap-3 pt-4">
              <button
                type="submit"
                :disabled="loading"
                class="px-10 py-2 rounded-full bg-[#1F8EFA] text-white text-sm font-semibold shadow hover:bg-[#1979d6] transition disabled:opacity-60"
              >
                {{ loading ? 'Saving...' : buttonText }}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  </div>
</template>

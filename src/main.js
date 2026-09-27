import './assets/main.css'
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Apply saved theme immediately to avoid a flash of light mode on load
if (localStorage.getItem('lm-theme') === 'dark') {
    document.documentElement.classList.add('dark')
}

import App from './App.vue'
import router from './router'
import Toast from "vue-toastification"
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

const app = createApp(App)


if (import.meta.env.VITE_BASE_URL === 'http://127.0.0.1:8000') {
    console.log('%cMade with ❤️ by Gresa Paci', 'color: #0085DB; font-size: 14px; font-weight: bold;')
} else {
    console.log('%cMade with ❤️ by Gresa Paci', 'color: #0085DB; font-size: 14px; font-weight: bold;')

    // Disable console logs in production
    console.log = () => { }
    console.error = () => { }
    console.warn = () => { }
    console.info = () => { }
    console.debug = () => { }
}

app.use(createPinia())
app.use(router)
app.use(Toast, {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
})

app.use(VCalendar, {})
app.use(VueTelInput, {
    mode: 'international',
    autoDefaultCountry: true,
    autoFormat: true,
    inputOptions: {
        showDialCode: true,
        placeholder: 'Enter phone number',
        styleClasses: 'w-full py-3 px-4 border border-gray-200 rounded-md bg-white text-sm focus:border-blue-600 focus:ring-0'
    },
    dropdownOptions: {
        showFlags: true,
        showSearchBox: true,
        showDialCodeInList: true,
        showDialCodeInSelection: true,
        classNames: 'py-3 px-4 border border-gray-200 rounded-l-md bg-white text-sm'
    }
});
app.mount('#app')

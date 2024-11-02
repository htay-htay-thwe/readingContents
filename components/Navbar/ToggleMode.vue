<template>
  <div>
    <button @click="toggleMode"
      class="flex items-center justify-center w-10 h-10 transition-colors rounded-full focus:outline-none"
      aria-label="Toggle light/dark mode">
      <component :is="isDarkMode ? 'SunIcon' : 'MoonIcon'" class="w-6 h-6" />
    </button>
    <div>
    </div>
  </div>
</template>

<script>
import { SunIcon, MoonIcon } from '@heroicons/vue/outline'; // Use outline icons from v1

export default {
  components: {
    SunIcon,
    MoonIcon,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  setup() {
    const themeStore = useThemeStore();
    const isDarkMode = ref(false);
    const toggleMode = () => {
      isDarkMode.value = !isDarkMode.value;
      updateBodyClass();
      localStorage.setItem('darkMode', isDarkMode.value);
      themeStore.getMode(isDarkMode.value);
    };
    const updateBodyClass = () => {
      if (isDarkMode.value) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    };
    onMounted(() => {
      const storedMode = localStorage.getItem('darkMode');
      isDarkMode.value = storedMode === 'true'; // Set isDarkMode based on local storage
      updateBodyClass(); // Update body class on mount
    });
    return {
      themeStore,
      toggleMode
    }
  },
};
</script>

<style>
body {
  transition: background-color 0.3s ease;
}

body.dark {
  background-color: #1a1a1a;
  color: #f5f5f5;
}

body {
  background-color: #ffffff;
  color: #000000;
}

.toggle-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  transition: color 0.3s ease;
}

.toggle-button:hover {
  color: #007bff;
}
</style>
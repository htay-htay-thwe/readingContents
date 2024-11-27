<template>
  <div>
    <!-- Button to toggle between light and dark mode -->
    <button @click="toggleMode"
      class="flex items-center justify-center w-10 h-10 transition-colors rounded-full focus:outline-none"
      aria-label="Toggle light/dark mode">
      
      <!-- Dynamically render SunIcon or MoonIcon based on dark mode state -->
      <component :is="isDarkMode ? SunIcon : MoonIcon" class="w-6 h-6" />
    </button>
  </div>
</template>

<script>
import { SunIcon, MoonIcon } from '@heroicons/vue/outline'; // Import icons

export default {
  components: {
    SunIcon, // Sun Icon component
    MoonIcon, // Moon Icon component
  },
  data() {
    return {
      isDarkMode: false, // Initialize dark mode state
    };
  },
  setup() {
    const themeStore = useThemeStore();
    const isDarkMode = ref(false);

    // Toggle the dark mode on and off
    const toggleMode = () => {
      isDarkMode.value = !isDarkMode.value;
      updateBodyClass();
      localStorage.setItem('darkMode', isDarkMode.value); // Persist dark mode preference
      themeStore.getMode(isDarkMode.value); // Store dark mode in theme store (if needed)
    };

    // Update the body class to apply dark mode styles
    const updateBodyClass = () => {
      if (isDarkMode.value) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    };

    // On mounted, check for saved dark mode preference
    onMounted(() => {
      const storedMode = localStorage.getItem('darkMode');
      isDarkMode.value = storedMode === 'true'; 
      updateBodyClass(); 
    });

    return {
      themeStore,
      isDarkMode,
      toggleMode,
      SunIcon, // Expose icon components to template
      MoonIcon,
    };
  },
};
</script>

<style>
/* Transition effect for background color */
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Dark mode styles */
body.dark {
  background-color: #1a1a1a; /* Dark background */
  color: #f5f5f5; /* Light text */
}

/* Light mode styles */
body {
  background-color: #ffffff; /* Light background */
  color: #000000; /* Dark text */
}
</style>

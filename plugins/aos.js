import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    AOS.init({
      duration: 400, 
      once: false, 
    });
  });
});

<template>
  <div>
    <div class="p-5 shadow-xl ">
      <div class="flex flex-row justify-between max-w-4xl mx-auto text-xl">
        <div>
          POSTS
        </div>

        <div class="flex flex-row gap-8">
          <div><nuxt-link to="/about">Home</nuxt-link></div>
          <div><nuxt-link to="/postCreate">PostCreate</nuxt-link></div>
          <div>
            <div class="relative inline-block text-xl text-left">
              <div>
                <button @click="dropdownToggle()" type="button"
                  class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-xl  font-semibold  shadow-sm "
                  id="menu-button" aria-expanded="true" aria-haspopup="true">
                  Options
                  <svg class="w-5 h-5 -mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                    data-slot="icon">
                    <path fill-rule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div v-show="toggle"
                class="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                  <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                  <nuxt-link :to="`/profile/${userId}`" class="block px-4 py-2 text-sm text-gray-700 hover:text-black"
                    role="menuitem" tabindex="-1" id="menu-item-0">Profile</nuxt-link>
                  <div @click="togglePassword()" class="block px-4 py-2 text-sm text-gray-700 hover:text-black" role="menuitem"
                    tabindex="-1" id="menu-item-1">Change Password</div>
                    <button @click="signOut()" type="button"
                      class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:text-black" role="menuitem"
                      tabindex="-1" id="menu-item-3">Sign out</button>

                </div>
              </div>
            </div>

          </div>
          <div @click="saveDrop()" class="mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00C678" class="size-6">
              <path fill-rule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                clip-rule="evenodd" />
            </svg>
          </div>
 
          <div class="">
            <img v-if="userData.image === 'http://localhost:8000/storage/images/null'" :src="Img" class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg"/>
            <img v-else :src="userData.image" class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg"/>
            </div>
        </div>

        <NavbarChangePw :togglePassword="togglePassword" :showPw="showPw" :userId="userId"/>
      </div>
    </div>


    <!-- //Save Drop -->
    <div v-show="saveToggle" class="relative z-10 max-w-4xl mx-auto" aria-labelledby="modal-title" role="dialog"
      aria-modal="true">
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
      <div class="absolute z-10 w-screen right-10">
        <div class="flex items-end justify-end h-full p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
            <div class="px-4 pt-5 pb-4 mx-auto overflow-y-auto bg-white rounded-lg" style="max-height: 400px;">
              <!-- Set max-height for scrolling -->
              <div class="flex flex-row justify-between mb-5">
                <div class="font-mono text-2xl font-bold">Saved Posts ... </div>
                <div @click="saveDrop()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="size-6">
                    <path fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div v-if="postData.length > 0" class="grid grid-cols-2 mb-5">
                <div class="p-3 scale-100 border-2 w-44 rounded-xl group hover:scale-105"
                  v-for="(post, index) in postData" :key="index">
                  <svg v-if="post.save !== 0" @click.stop="Save(post.id)" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="absolute opacity-0 text-zinc-800 size-6 group-hover:opacity-100">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                  <svg v-else @click.stop="UnSave(post.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="#00DC82" class="absolute text-gray-500 opacity-100 size-6 ">
                    <path fill-rule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                      clip-rule="evenodd" />
                  </svg>

                  <div class="w-36">
                    <img :src="post.images[0].image" class="w-full h-32 rounded-lg" />
                  </div>
                  <div class="mt-2 font-mono text-sm">
                    <div>{{ post.title }}</div>
                    <div>{{ post.genre }}</div>
                    <div class="text-gray-500">{{ post.userName }} </div>
                  </div>
                </div>
              </div>
              <div v-else class="flex items-center justify-center text-gray-400">No Save Post Available!</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Img from "@/assets/img/default.jpg"
import { ref } from 'vue'
import axios from 'axios';
import changePw from './changePw.vue';
export default {
  components: { changePw },
  props: {
    getProfile: {
      type: Function,
      Required: true,
    }
  },
  setup(props) {
    const toggle = ref(false);
    const saveToggle = ref(false);
    const showPw = ref(false);
    const userId = ref(null);
    const token = ref(null);
    const postData = ref([]);
    const userData = ref({});
    const themeStore = useThemeStore();

    const dropdownToggle = () => {
      toggle.value = !toggle.value;
    }

    const saveDrop = () => {
      saveToggle.value = !saveToggle.value;
    }


    onMounted(async () => {
      token.value = localStorage.getItem('token');
      userData.value = JSON.parse(localStorage.getItem('user'));
      userId.value = userData.value.id;
      postData.value = themeStore.save;
    });

    const Save = async (postId) => {
      const userId = Id.value;
      console.log(userId);
      await axios.get(`http://localhost:8000/api/basic-ui/create/save/${postId}/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token.value}` // Add the token to the headers
        }
      });
      await props.getProfile();
    }

    const UnSave = async (postId) => {
      console.log('postId', postId);
      await axios.get(`http://localhost:8000/api/basic-ui/unSave/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token.value}` // Add the token to the headers
        }
      });
      await props.getProfile();
    }

    const togglePassword = () =>{
          showPw.value = !showPw.value;
          console.log('change');
    }

    const signOut = () =>{
      localStorage.clear();
      themeStore.resetStore();
      navigateTo('/loginPage');
    }

    watch(() => themeStore.save, (newPosts) => {
      postData.value = newPosts;
    });

    watch(() => themeStore.user, (newPosts) => {
      userData.value = newPosts;
    });

    return {
      signOut,
      userId,
      token,
      toggle,
      dropdownToggle,
      saveDrop,
      saveToggle,
      postData,
      Save,
      UnSave,
      userData,
      togglePassword,
      showPw,
      Img
    }
  }

}
</script>

<style lang="stylus" scoped>

</style>

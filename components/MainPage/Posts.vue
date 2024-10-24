<template>

  <div>
    <div class="max-w-5xl mx-auto font-serif text-lg mt-7">
      A plugin that provides a basic reset for form styles that makes form elements easy to override with utilities.
      Installation. Install the plugin from npm: npm install -D @tailwindcss/forms. Then add the
      the plugin from npm: npm install
    </div>
    <div class="flex flex-wrap max-w-6xl gap-3 p-10 mx-auto">
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay Thwe</div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay Thwe</div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay Thwe</div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay Thwe</div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay Thwe</div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay Thwe</div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay Thwe</div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay </div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500">Htay
        Htay Thwe</div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay Thwe</div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay </div>
      <div class="p-2 text-center border-2 border-gray-400 rounded-sm hover:border-green-400 hover:text-gray-500 ">Htay
        Htay </div>
    </div>

    <div class="flex justify-center p-8">
      <input type="text" class="p-2 border-2 border-gray-500 w-96 rounded-s-md" placeholder="Search here..." />
      <div class="p-2 font-mono text-center bg-green-400 hover:text-gray-600 rounded-e-md">Search</div>
    </div>

    <div class="max-w-5xl p-6 mx-auto text-4xl underline mb-7 decoration-green-400 decoration-2">
      Posts
    </div>
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-5 gap-4">
        <div @click="postDetail(post.id)" class="p-3 scale-100 border-2 w-44 rounded-xl group hover:scale-105"
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
            <img :src="post.images[0].image" class="w-full h-40 rounded-lg" />
          </div>
          <div class="mt-2 font-mono text-sm">
            <div>{{ post.title }}</div>
            <div>{{ post.genre }}</div>
            <div class="flex flex-row justify-between">
              <div class="text-gray-500">{{ post.userName }} </div>
              <div class="flex space-x-1 text-green-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="currentColor" class="size-4">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path fill-rule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clip-rule="evenodd" />
                </svg>
                <div class="-mt-0.5">{{ post.views }}</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import firstImg from '@/assets/img/first_img.png';
import { useThemeStore } from '@/stores/themeStore';
import axios from "axios";

export default {
  props: {
    getProfile: {
      type: Function,
      Required: true,
    }
  },
  setup(props) {
    const postData = ref([]);
    const themeStore = useThemeStore();
    const token = ref('');
    const Id = ref('');

    const Save = async (postId) => {
      const userId = Id.value;
      console.log(userId);
      await axios.get(`http://localhost:8000/api/basic-ui/create/save/${postId}/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token.value}` // Add the token to the headers
        }
      });
      await props.getProfile();
      postData.value = [...themeStore.posts];
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

    watch(() => themeStore.posts, (newPosts) => {
      postData.value = newPosts;
    });

    onMounted(async () => {
      token.value = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
      Id.value = userData.id;
      await props.getProfile();
    })

    const postDetail = (postId) => {
      navigateTo(`/detail/${postId}`);
      console.log('read');
    }
    return {
      firstImg,
      postData,
      postDetail,
      Save,
      UnSave
    }
  }

}
</script>

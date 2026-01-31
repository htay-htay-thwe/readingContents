<template>
  <div v-if="!loading">
    <!-- Section intro -->
    <div 
      data-aos="fade-right"
      class="flex-wrap max-w-sm p-4 mx-auto font-serif sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mt-7"
    >
      <span class="text-6xl font-semibold">W</span>elcome to 
      <span class="text-xl font-bold">
        LwHa<span class="text-xl text-green-700">EE</span>
      </span>, your ultimate destination for discovering, creating, and
      sharing content across a wide range of genres.
    </div>

    <!-- Genre filters -->
    <div class="flex flex-wrap max-w-6xl gap-3 p-10 mx-auto">
      <div 
        @click="getProfile" 
        data-aos="fade-left"
        class="hidden pt-2 pb-2 pl-3 pr-3 font-semibold text-center transition duration-300 bg-green-400 rounded-sm sm:block hover:text-gray-500"
      >
        All
      </div>

      <div
        v-for="(genre, index) in genres"
        :key="index"
        @click="searchByGenre(genre)"
        :class="[
          'p-2 text-center border-2 rounded-sm transition duration-300 sm:block hidden',
          selectedGenre === genre
            ? 'border-green-400 bg-green-200 text-gray-700'
            : 'border-gray-400 hover:border-green-400 hover:text-gray-500'
        ]"
        :data-aos="!selectedGenre || selectedGenre === 'All' ? 'fade-left' : null"
  :data-aos-delay="!selectedGenre || selectedGenre === 'All' ? index * 50 : null"
      >
        {{ genre }}
      </div>
    </div>

    <!-- Search -->
    <div data-aos="fade-right" :data-aos-delay="100" class="flex justify-center p-2">
      <input 
        v-model="searchKey" 
        name="searchKey" 
        type="text" 
        class="p-2 border-2 border-gray-500 w-96 rounded-s-md"
        placeholder="Search here..." 
      />
      <button 
        @click="onSubmit"
        class="p-1.5 font-mono text-center bg-green-400 hover:text-gray-600 rounded-e-md"
      >
        Search
      </button>
    </div>

    <!-- Posts header -->
    <div 
      data-aos="fade-right" 
      :data-aos-delay="100"
      class="max-w-5xl p-6 mx-auto text-4xl underline mb-7 decoration-green-400 decoration-2"
    >
      Posts
    </div>

    <!-- Posts list -->
    <div class="items-center max-w-5xl mx-auto">
      <div
        class="grid items-center max-w-sm grid-cols-1 gap-3 mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl sm:gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        v-if="paginatedPosts && paginatedPosts.length > 0"
      >
        <div
          v-for="(post, index) in paginatedPosts"
          :key="index"
          class="p-3 mx-auto mb-2 scale-100 border-2 w-44 rounded-xl group hover:scale-105"
        >
          <!-- Save/Unsave -->
          <div 
            v-if="post.save !== 0" 
            @click.stop="Save(post.id)"
            class="absolute flex items-center justify-center w-12 h-12 transition-opacity duration-500 ease-in-out bg-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 top-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="text-white size-6 ">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
          </div>
          <div 
            v-else 
            @click.stop="UnSave(post.id)"
            class="absolute flex items-center justify-center w-12 h-12 transition-opacity duration-500 ease-in-out bg-gray-800 rounded-full shadow-lg opacity-100 top-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00DC82"
              class="absolute text-gray-500 opacity-100 size-6 ">
              <path fill-rule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                clip-rule="evenodd" />
            </svg>
          </div>

          <!-- Detail -->
          <nuxt-link :to="`/detail/${post.id}`"
            class="absolute flex items-center justify-center w-12 h-12 transition-opacity duration-1000 ease-in-out bg-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 right-3 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#02DF84"
              class="font-bold size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </nuxt-link>

          <!-- Post content -->
          <div class="w-36">
            <img :src="post.images[0].image" class="w-full h-40 rounded-lg" />
          </div>
          <div class="mt-2 font-mono text-sm">
            <div class="truncate">{{ post.title }}</div>
            <div class="truncate">{{ post.genre }}</div>
            <div class="flex flex-row justify-between">
              <div class="text-gray-500 truncate">{{ post.userName }} </div>
              <div class="flex space-x-1 text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
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

      <!-- No post -->
      <div v-else class="flex items-center justify-center text-xl text-zinc-500">
        <svg xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        No Post!
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import firstImg from '@/assets/img/first_img.png';
import { useThemeStore } from '@/stores/themeStore';
import { useForm, useField } from 'vee-validate';
import * as Yup from 'yup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { api, url } from '~/utils/api';

export default {
  props: {
    getProfile: {
      type: Function,
      Required: true,
    },
    initialPaginatedPosts: {
      type: Object,
      Required: true,
    },
    loading: {
      type: Boolean,
      Required: true,
    },
  },
  setup(props) {
    const themeStore = useThemeStore();
    const token = ref('');
    const Id = ref('');
    const selectedGenre = ref(null);
    const isDark = ref(null);
    const paginatedPosts = ref([...props.initialPaginatedPosts]);
    const genres = ref([
      'Action','Adventure','Technology','Comedy','Drama','Fantasy','Historical',
      'Horror','Mystery','Romance','Sci-Fi','Thriller','Western','Animation',
      'Documentary','Crime','Biography','Family','Music','Musical','Sports','War',
      'Recipes','snakes','birds','food','Superhero','Adventure Comedy',
      'Fantasy Adventure','Science Fantasy','Political','Social','Psychological',
      'Historical Drama','Urban','Adventure Drama','Historical Romance',
      'Action Comedy','Romantic Comedy','Dark Comedy','Fantasy Comedy',
      'Family Drama','politics'
    ]);

    const schema = Yup.object({
      searchKey: Yup.string().required('*required')
    });

    const { errors, handleSubmit } = useForm({
      validationSchema: schema,
    });

    const { value: searchKey } = useField('searchKey');

    const onSubmit = handleSubmit(async () => {
      const userId = Id.value;
      await api.get(`basic-ui/search/data/${userId}/${searchKey.value}`, {
        headers: { 'Authorization': `Bearer ${token.value}` }
      })
      .then((res) => {
        res.data.search.forEach(post => {
          if (post.images && post.images.length > 0) {
            post.images.forEach((img, index) => {
              post.images[index].image = `${url}storage/images/` + img.image;
            });
          }
        });
        paginatedPosts.value = res.data.search || [];
        // ❌ no AOS.refresh()
      });
    });

    const Save = async (postId) => {
      const userId = Id.value;
      await api.get(`basic-ui/create/save/${postId}/${userId}`, {
        headers: { 'Authorization': `Bearer ${token.value}` }
      });
      await props.getProfile();
      paginatedPosts.value = [...themeStore.posts];
    };

    const UnSave = async (postId) => {
      await api.get(`basic-ui/unSave/${postId}`, {
        headers: { 'Authorization': `Bearer ${token.value}` }
      });
      await props.getProfile();
    };

    const searchByGenre = async (genre) => {
      const userId = Id.value;
      selectedGenre.value = genre;
      await api.get(`basic-ui/genre/search/data/${userId}/${genre}`, {
        headers: { 'Authorization': `Bearer ${token.value}` }
      }).then((res) => {
        res.data.search.forEach(post => {
          if (post.images && post.images.length > 0) {
            post.images.forEach((img, index) => {
              post.images[index].image = `${url}storage/images/` + img.image;
            });
          }
        });
        paginatedPosts.value = res.data.search || [];
        // ❌ no AOS.refresh()
      });
    };

    const postDetail = (postId) => {
      navigateTo(`/detail/${postId}`);
    };

    watch(() => themeStore.mode, (newMode) => {
      isDark.value = newMode;
    });

    watch(() => props.initialPaginatedPosts, (newPosts) => {
      paginatedPosts.value = newPosts;
      selectedGenre.value = '';
    });

    onMounted(async () => {
      isDark.value = themeStore.mode;
      token.value = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
      Id.value = userData.id;
      await props.getProfile();

      AOS.init({
        once: true,
        disableMutationObserver: true,
      });
    });

    return {
      firstImg,
      postDetail,
      Save,
      UnSave,
      genres,
      searchKey,
      errors,
      onSubmit,
      searchByGenre,
      selectedGenre,
      paginatedPosts,
      isDark,
      themeStore,
    };
  }
}
</script>

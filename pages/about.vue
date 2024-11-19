<template>
  <div class="h-screen mx-auto">
    <Navbar :getProfile="getProfile" />
    <MainPagePosts :loading="loading" :initialPaginatedPosts="initialPaginatedPosts" :getProfile="getProfile" :postData="postData" />
    <MainPagePagination :currentPage="currentPage" :totalPages="totalPages" :goToPage="goToPage" />
    <Footer />

    <div v-if="loading" class="flex items-center justify-center h-screen"><div class="absolute w-12 h-12 border-4 border-t-4 border-green-400 rounded-md animate-spin"></div>.</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useThemeStore } from '@/stores/themeStore';
import { Report } from 'notiflix/build/notiflix-report-aio';

export default {
  setup() {
    const themeStore = useThemeStore();
    const loading = ref(true);
    const token = ref('');
    const Id = ref('');
    const postData = ref([]);
    const currentPage = ref(1);
    const postsPerPage = ref(20);
    const route = useRoute();

    // Function to navigate to the selected page
    const goToPage = (page) => {
      if (page < 1 || page > totalPages.value) return; // Prevent invalid page
      currentPage.value = page;
    };

    const getProfile = async () => {
      token.value = localStorage.getItem('token');
      loading.value = true;
      const userData = JSON.parse(localStorage.getItem('user'));
      Id.value = userData.id;
      const userId = Number(Id.value);
      console.log('userId', userId);
      try {
        await axios.get(`http://localhost:8000/api/basic-ui/get/profile/post/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token.value}` // Add the token to the headers
          }
        }).then((res) => {
          res.data.post.forEach(post => {
            if (post.images && post.images.length > 0) {
              post.images.forEach((img, index) => {
                post.images[index].image = 'http://localhost:8000/storage/images/' + img.image;
              });
            }
          });
          res.data.postAuth.forEach(post => {
            if (post.images && post.images.length > 0) {
              post.images.forEach((img, index) => {
                post.images[index].image = 'http://localhost:8000/storage/images/' + img.image;
              });
            }
          });
          res.data.deletedPosts.forEach(post => {
            if (post.images && post.images.length > 0) {
              post.images.forEach((img, index) => {
                post.images[index].image = 'http://localhost:8000/storage/images/' + img.image;
              });
            }
          });
          res.data.save.forEach(post => {
            if (post.images && post.images.length > 0) {
              post.images.forEach((img, index) => {
                post.images[index].image = 'http://localhost:8000/storage/images/' + img.image;
              });
            }
          });
          themeStore.getPosts(res.data.post);
          themeStore.getProfilePost(res.data.postAuth);
          themeStore.getDeletedPost(res.data.deletedPosts);
          themeStore.getView(res.data.view);
          themeStore.getSave(res.data.save);
          postData.value = themeStore.posts || [];
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Report.warning(
            'Access Expired!',
            'Please log in again!',
            'Login',
            () => {
              navigateTo('/loginPage'); // Redirect to login page
            }
          );
        }
      } finally {
        loading.value = false; 
      }
    };

    const totalPages = computed(() => {
      return Math.ceil(postData.value.length / postsPerPage.value);
    });
    const initialPaginatedPosts = computed(() => {
      if (!Array.isArray(postData.value)) return []; // Safeguard if postData is not an array
      const startIndex = (currentPage.value - 1) * postsPerPage.value;
      const endIndex = startIndex + postsPerPage.value;
      return postData.value.slice(startIndex, endIndex);
    });


    return {
      Id,
      getProfile,
      loading,
      currentPage,
      totalPages,
      initialPaginatedPosts,
      goToPage,
      postData,
      themeStore
    };
  }
}
</script>

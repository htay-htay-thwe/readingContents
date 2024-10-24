<template>
  <div>
    <Navbar :getProfile="getProfile"/>
    <MainPagePosts :getProfile="getProfile"/>

    <div v-if="loading">Loading...</div>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useThemeStore } from '@/stores/themeStore'; // Adjust the path as needed

export default {
  setup() {
    const themeStore = useThemeStore();
    const loading = ref(true);
    const errorMessage = ref('');
    const token = ref('');
    const Id = ref('');

    const getProfile = async () => {
      token.value = localStorage.getItem('token');
      loading.value = true;
      errorMessage.value = '';
      const userData = JSON.parse(localStorage.getItem('user'));
      Id.value = userData.id;
      const userId = Number(Id.value);
      console.log('userId',userId);
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
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        errorMessage.value =error;
      } finally {
        loading.value = false; // Set loading to false once the fetch is complete
      }
    };

    // onMounted(() => {
    //   const userData = JSON.parse(localStorage.getItem('user'));
    //   Id.value = userData.id;
    //   token.value = localStorage.getItem('token');

    // });

    return {
      Id,
      getProfile,
      loading,
      errorMessage
    };
  }
}
</script>

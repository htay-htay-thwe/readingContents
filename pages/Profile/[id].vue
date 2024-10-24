<template>
    <div>
        <Navbar />
        <ProfileImgProfile :userId="userId" :getProfile="getProfile"/>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    setup() {
    const route = useRoute();
    const userId = route.params.id; 
    const themeStore = useThemeStore();
    const token = ref('');

    const getProfile = async () => {
      token.value = localStorage.getItem('token');
      // const userData = JSON.parse(localStorage.getItem('user'));
      // Id.value = userData.id;
      // const userId = Number(Id.value);
      // console.log('userId',userId);
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
      } 
    };

    return {
      userId,
      getProfile,
      token
    };
  }

}
</script>

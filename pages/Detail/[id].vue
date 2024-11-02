<template>
    <div>
        <Navbar />
        <DetailPage :loading="loading" :postId="postId" :getProfile="getProfile" />
        <div v-if="loading"  class="flex items-center justify-center h-screen">
            <div class='flex items-center justify-center h-screen space-x-2 bg-white dark:invert'>
 	<span class='sr-only'>Loading...</span>
  	<div class='h-3 w-3 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div class='h-3 w-3 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div class='w-3 h-3 bg-green-400 rounded-full animate-bounce'></div>
</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    setup() {
        const route = useRoute();
        const postId = route.params.id;
        const themeStore = useThemeStore();
        const token = ref('');
        const Id = ref('');
        const loading = ref(false);

        const getProfile = async () => {
            token.value = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('user'));
            Id.value = userData.id;
            const userId = Number(Id.value);
            loading.value = true;
            try {
                await axios.get(`http://localhost:8000/api/basic-ui/get/profile/post/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token.value}` // Add the token to the headers
                    }
                }).then((res) => {
                    loading.value = false;
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
                if (error.response && error.response.status === 401) {
          Report.warning(
            'Notiflix Warning',
            'Please log in again!',
            'Login',
            () => {
                navigateTo('/loginPage');
            }
          );
        }
            }
        };
        return {
            postId,
            getProfile,
            token,
            Id,
            loading
        }
    }
}
</script>

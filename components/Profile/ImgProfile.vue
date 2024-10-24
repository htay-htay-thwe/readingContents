<template>
    <div class="flex flex-row max-w-4xl gap-10 mx-auto mt-10">
        <div class="w-1/3 text-center">
            <div class="w-40 h-40 mx-auto mb-3 rounded-full">
                <img v-if="userData.image === 'http://localhost:8000/storage/images/null'" :src="Img"
                    class="w-full h-full border-2 border-green-400 rounded-full" />
                <img v-else :src="userData.image" class="w-full h-full border-2 border-green-400 rounded-full" />
            </div>
            <div class="font-mono text-xl text-zinc-500">{{ userData.name }}</div>
            <div class="mb-5 font-mono text-xl text-zinc-500">
                <span>{{ userData.email }}</span>
            </div>
            <div @click="toggleInfo()" class="mt-3"><button class="w-48 p-2 font-mono rounded-md hover:text-zinc-500 bg-zinc-300">Edit
                    Profile</button></div>
            <div @click="toggleImage()" class="mt-3"><button
                    class="w-48 p-2 font-mono bg-green-400 rounded-md hover:text-zinc-500">Upload
                    Photo</button></div>

        </div>
        <div class="w-2/3">
            <div class="px-4 pb-4 pl-4">
                <div class="flex space-x-4">
                    <button v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
                        class="px-4 py-2 text-lg font-semibold transition-colors duration-300" :class="{
                            'border-b-2 border-green-400 text-green-400': tab === activeTab,
                            'text-gray-600 hover:text-green-400': tab !== activeTab,
                        }">
                        {{ tab }}
                    </button>
                </div>

                <div class="mt-4">
                    <div v-if="activeTab == 'Posts'">
                        <div v-if="postData.length > 0" class="grid grid-cols-3 gap-4">
                            <div v-for="(post, index) in postData" :key="index"
                                class="p-3 border-2 w-44 rounded-xl group">
                                <div class="relative">
                                    <svg @click="Edit(post.id)"
                                        class="absolute opacity-0 right-7 group-hover:opacity-100"
                                        xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                                        <path fill="#2020BA"
                                            d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V10.4q0 .275-.162.475t-.413.3q-.4.15-.763.388T18 12.1l-5.4 5.4q-.275.275-.437.638T12 18.9V21q0 .425-.288.713T11 22zm8-1v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T16.65 22H15q-.425 0-.712-.287T14 21m6.575-4.6l.925-.975l-.925-.925l-.95.95zM14 9h4l-5-5l5 5l-5-5v4q0 .425.288.713T14 9" />
                                    </svg>
                                    <svg @click="Delete(post.id)"
                                        class="absolute right-0 opacity-0 group-hover:opacity-100"
                                        xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                                        <path fill="#FF0000"
                                            d="M9 17h2V8H9zm4 0h2V8h-2zm-8 4V6H4V4h5V3h6v1h5v2h-1v15z" />
                                    </svg>
                                    <div class="w-36">
                                        <img :src="post.images[0].image" class="w-full h-40 rounded-lg" />
                                    </div>
                                    <div class="mt-2 font-mono text-sm">
                                        <div>{{ post.title }}</div>
                                        <div>{{ post.genre }}</div>
                                        <div class="text-gray-500">{{ post.userName }} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex items-center justify-center h-svh text-zinc-400">No Post Available!
                        </div>
                    </div>
                    <div v-if="activeTab == 'Archive'">
                        <div v-if="deletePost.length > 0" class="grid grid-cols-3 gap-4">
                            <div v-for="(post, index) in deletePost" :key="index"
                                class="relative p-3 border-2 w-44 rounded-xl group">

                                <div class="absolute inline-block text-xl text-left -top-3 right-10">
                                    <div>
                                        <button @click="dropdownToggle(index)" type="button">
                                            <svg class="absolute opacity-0 group-hover:opacity-100"
                                                xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div v-show="toggle === index"
                                        class="absolute z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg top-10 -right-4 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button"
                                        tabindex="-1">
                                        <div class="py-1" role="none">
                                            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                            <div @click="restore(post.id)"
                                                class="block px-4 py-2 text-sm text-gray-700 hover:text-black"
                                                role="menuitem" tabindex="-1" id="menu-item-0">Restore</div>
                                            <div @click="perDel(post.id)"
                                                class="block px-4 py-2 text-sm text-gray-700 hover:text-black"
                                                role="menuitem" tabindex="-1" id="menu-item-1">Permanately
                                                Delete</div>

                                        </div>
                                    </div>
                                </div>

                                <div class="w-36">
                                    <img :src="post.images[0].image" class="w-full h-40 rounded-lg" />
                                </div>
                                <div class="mt-2 font-mono text-sm">
                                    <div>{{ post.title }}</div>
                                    <div>{{ post.genre }}</div>
                                    <div class="text-gray-500">{{ post.userName }} </div>
                                </div>

                            </div>
                        </div>
                        <div v-else class="flex items-center justify-center h-svh text-zinc-400">No Post Available!
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div v-show="imageModal == true" class="relative z-10" aria-labelledby="modal-title" role="dialog"
            aria-modal="true">
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                    <form @submit.prevent="onSubmit"
                        class="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                        <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                        Upload Profile Image!</h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">Are you sure you want to upload your
                                            photo? All of your data will be permanently updated.</p>
                                    </div>
                                    <div class="mb-4">
                                        <label class="block mt-4 mb-2 text-sm font-bold text-gray-700" for="username">
                                            Profile Photo
                                        </label>
                                        <input @change="handleFileUpload" name="image"
                                            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="username" type="file">
                                        <span v-if="errors.image" class="text-red-400">{{ errors.image }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="submit"
                                class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-400 rounded-md shadow-sm hover:text-zinc-600 sm:ml-3 sm:w-auto">Submit</button>
                            <button @click="toggleImage()" type="button"
                                class="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <ProfileUpdateInfo :toggleInfo="toggleInfo" :infoModal="infoModal" :userId="userId"/>

    </div>
</template>

<script>
import { ref } from 'vue';
import Img from "@/assets/img/default.jpg"
import * as Yup from 'yup';
import { useForm, useField } from 'vee-validate';
import axios from 'axios'
import updateInfo from './updateInfo.vue';
export default {
  components: { updateInfo },
    props: {
        userId: {
            type: Number,
            required: true, // This prop is required
        },
        getProfile: {
            type: Function,
            required: true, // This prop is required
        },

    },
    setup(props) {
        const postData = ref([]);
        const deletePost = ref([]);
        const imageModal = ref(false);
        const token = ref('');
        const themeStore = useThemeStore();
        const toggle = ref(false);
        const infoModal = ref(false);
        const userData = ref({});
        const file = ref({});
        const tabs = ref([
            'Posts',
            'Archive'
        ]);

        const activeTab = ref(tabs.value[0]);

        const selectTab = (tab) => {
            activeTab.value = tab;
            console.log(tab);
        };

        const dropdownToggle = (index) => {
            toggle.value = toggle.value === index ? null : index;
            console.log(toggle.value);
        }

        const toggleInfo = () => {
            infoModal.value = !infoModal.value;
        }

        const Edit = (postId) => {
            navigateTo(`/editPost/${postId}`)
        }

        const schema = Yup.object({
            image: Yup.string().required('*required'),
        });


        const { errors, handleSubmit} = useForm({
            validationSchema: schema
        });

        const { value: image } = useField('image');
      

        const handleFileUpload = (event) => {
             file.value = event.target.files[0];
             image.value = file.value;
        }

        const onSubmit = handleSubmit(async (values) => {
            const formData = new FormData();
            formData.append('image', values.image);
            formData.append('userId', Number(props.userId));
            const res = await axios.post(`http://localhost:8000/api/userAuth/upload/profileImage`, formData, {
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                    'Content-Type': 'multipart/form-data', // Add the token to the headers
                }
            });
            if(res.data.user.image !== null){
                res.data.user.image = 'http://localhost:8000/storage/images/' + res.data.user.image;
            }

            themeStore.getUser(res.data.user);
            localStorage.setItem('user',JSON.stringify(res.data.user))
            userData.value = JSON.parse(localStorage.getItem('user'));
            userData.value = localStorage.getItem('user');
            imageModal.value = !imageModal.value;

        });

    

        const toggleImage = () => {
            imageModal.value = !imageModal.value;
            image.value = '';
        }

        const Delete = async (postId) => {
            axios.get(`http://localhost:8000/api/basic-ui/delete/profile/post/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token.value}` // Add the token to the headers
                }
            });
            await getProfile();
        }

        const restore = async (postId) => {
            axios.get(`http://localhost:8000/api/basic-ui/restore/profile/post/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token.value}` // Add the token to the headers
                }
            });
            await getProfile();

        }
        
        const perDel = async (postId) => {
            axios.get(`http://localhost:8000/api/basic-ui/delete/permanent/profile/post/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token.value}` // Add the token to the headers
                }
            });
            await getProfile();

        }

        const getProfile = async () => {

            try {
                await axios.get(`http://localhost:8000/api/basic-ui/get/profile/post/${props.userId}`, {
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
                    themeStore.getPosts(res.data.post);
                    themeStore.getProfilePost(res.data.postAuth);
                    themeStore.getDeletedPost(res.data.deletedPosts);
                    themeStore.getView(res.data.view);
                    themeStore.getSave(res.data.save);
                    postData.value = themeStore.profilePost;
                    deletePost.value = themeStore.deletedPost;
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };


        watch(() => themeStore.user, (newPosts) => {
            userData.value = newPosts;
        });

        onMounted( async () => {
            token.value = localStorage.getItem('token');
            userData.value = JSON.parse(localStorage.getItem('user'));
            await props.getProfile();
            postData.value = themeStore.profilePost;
            deletePost.value = themeStore.deletedPost;
            console.log(userData.value);
        })
        return {
            postData,
            Img,
            activeTab,
            selectTab,
            tabs,
            deletePost,
            Edit,
            Delete,
            token,
            getProfile,
            dropdownToggle,
            toggle,
            restore,
            perDel,
            toggleImage,
            imageModal,
            onSubmit,
            image,
            userData,
            handleFileUpload,
            toggleInfo,
            infoModal,
            errors
       
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>

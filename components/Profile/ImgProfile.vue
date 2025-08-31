<template>
    <div v-if="!loading">
        <div class="flex flex-col max-w-xl gap-10 mx-auto mt-10 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl sm:flex-row">
            <div class="gap-10 mx-auto mt-10 " v-if="userId == userData.id">
                <div class="w-40 h-40 mx-auto mb-3 rounded-full ">
                    <img v-if="userData.image === `${url}storage/images/null`" :src="Img"
                        class="w-full h-full border-2 border-green-400 rounded-full" />
                    <img v-else :src="userData.image" class="w-full h-full border-2 border-green-400 rounded-full" />
                </div>
                <div class="font-mono text-xl text-center text-zinc-500">{{ userData.name }}</div>
                <div class="mb-5 font-mono text-sm md:text-md lg:text-xl xl:text-xl text-zinc-500">
                    <span class="text-center">{{ userData.email }}</span>
                </div>
                <div v-if="userId == userData.id" @click="toggleInfo()" class="mt-3"><button
                        class="w-full p-2 font-mono rounded-md hover:text-zinc-500 bg-zinc-300">Edit
                        Profile</button></div>
                <div v-if="userId == userData.id" @click="toggleImage()" class="mt-3"><button
                        class="w-full p-2 font-mono bg-green-400 rounded-md hover:text-zinc-500">Upload
                        Photo</button></div>

            </div>
            <div class="gap-10 mx-auto mt-10 " v-if="Number(userId) !== userData.id && paginatedPosts.length > 0">
                <div class="w-40 h-40 mx-auto mb-3 rounded-full ">
                    <img v-if="paginatedPosts[0].writerProfile === null" :src="Img"
                        class="w-full h-full border-2 border-green-400 rounded-full" />
                    <img v-else :src="`${url}storage/images/${paginatedPosts[0].writerProfile}`"
                        class="w-full h-full border-2 border-green-400 rounded-full" />
                </div>
                <div class="font-mono text-xl text-center text-zinc-500">{{ paginatedPosts[0].userName }}</div>
                <div class="mb-5 font-mono text-sm md:text-md lg:text-xl xl:text-xl text-zinc-500">
                    <span class="text-center">{{ paginatedPosts[0].email }}</span>
                </div>
                <div v-if="userId == userData.id" @click="toggleInfo()" class="mt-3"><button
                        class="w-full p-2 font-mono rounded-md hover:text-zinc-500 bg-zinc-300">Edit
                        Profile</button></div>
                <div v-if="userId == userData.id" @click="toggleImage()" class="mt-3"><button
                        class="w-full p-2 font-mono bg-green-400 rounded-md hover:text-zinc-500">Upload
                        Photo</button></div>

            </div>
            <div class="w-2/3 mx-auto sm:w-full">
                <div class="px-4 pb-4 pl-4">
                    <div class="flex space-x-4" v-if="userId == userData.id">
                        <button v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
                            class="px-4 py-2 text-lg font-semibold transition-colors duration-300" :class="{
                                'border-b-2 border-green-400 text-green-400': tab === activeTab,
                                'text-gray-600 hover:text-green-400': tab !== activeTab,
                            }">
                            {{ tab }}
                        </button>
                    </div>
                    <div v-else>
                        <button
                            class="px-4 py-2 text-lg font-semibold text-green-400 transition-colors duration-300 border-b-2 border-green-400">
                            Posts
                        </button>
                    </div>

                    <div class="mt-4 ">
                        <div v-if="activeTab == 'Posts'">
                            <div v-if="postData.length > 0"
                                class="grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                                <div v-for="(post, index) in paginatedPosts" :key="index"
                                    class="p-3 mx-auto border-2 w-44 rounded-xl group">
                                    <div class="relative mx-auto">
                                        <svg v-if="userId == userData.id" @click="Edit(post.id)"
                                            class="absolute opacity-0 right-7 group-hover:opacity-100"
                                            xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                            viewBox="0 0 24 24">
                                            <path fill="#2020BA"
                                                d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V10.4q0 .275-.162.475t-.413.3q-.4.15-.763.388T18 12.1l-5.4 5.4q-.275.275-.437.638T12 18.9V21q0 .425-.288.713T11 22zm8-1v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T16.65 22H15q-.425 0-.712-.287T14 21m6.575-4.6l.925-.975l-.925-.925l-.95.95zM14 9h4l-5-5l5 5l-5-5v4q0 .425.288.713T14 9" />
                                        </svg>
                                        <svg v-if="userId == userData.id" @click="Delete(post.id)"
                                            class="absolute right-0 opacity-0 group-hover:opacity-100"
                                            xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                            viewBox="0 0 24 24">
                                            <path fill="#FF0000"
                                                d="M9 17h2V8H9zm4 0h2V8h-2zm-8 4V6H4V4h5V3h6v1h5v2h-1v15z" />
                                        </svg>
                                        <div class="w-36">
                                            <img :src="post.images[0].image" class="w-full h-40 rounded-lg" />
                                        </div>
                                        <div class="mt-2 font-mono text-sm">
                                            <div class="truncate">{{ post.title }}</div>
                                            <div class="truncate">{{ post.genre }}</div>
                                            <div class="text-gray-500 truncate">{{ formatTime(post.created_at) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex items-center justify-center h-svh text-zinc-400">No Post Available!
                            </div>
                        </div>
                        <div v-if="activeTab == 'Archive'">
                            <div v-if="deletePost.length > 0" class="grid grid-cols-3 gap-4">
                                <div v-for="(post, index) in paginatedPosts" :key="index"
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
                                            <div v-if="userId == userData.id" class="py-1" role="none">
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
                                        <div class="truncate">{{ post.title }}</div>
                                        <div class="truncate">{{ post.genre }}</div>
                                        <div class="text-gray-500 truncate">{{ formatTime(post.created_at) }}</div>
                                        <div class="flex">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="#F05252" class="size-4 mt-0.5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </div>
                                            <div class="text-red-500 truncate">{{ formatTime(post.deleted_at) }}</div>
                                        </div>
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
                <div class="fixed inset-0 z-10 flex items-center justify-center w-screen p-3 overflow-y-auto">
                    <form @submit.prevent="onSubmit"
                        class="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:w-full sm:max-w-lg">
                        <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                        Upload Profile Image!</h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">Are you sure you want to upload your photo? All
                                            of your data will be permanently updated.</p>
                                    </div>
                                    <div class="mb-4">
                                        <label class="block mt-4 mb-2 text-sm font-bold text-gray-700" for="image">
                                            Profile Photo
                                        </label>
                                        <input @change="handleFileUpload" name="image"
                                            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="image" type="file">
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
            <ProfileUpdateInfo :toggleInfo="toggleInfo" :infoModal="infoModal" :userId="userId" />
        </div>
        <MainPagePagination :currentPage="currentPage" :totalPages="totalPages" :goToPage="goToPage" />
    </div>

</template>

<script>
import { onMounted, ref } from 'vue';
import Img from "@/assets/img/default.jpg"
import * as Yup from 'yup';
import { useForm, useField } from 'vee-validate';
import notiflix from 'notiflix/build/notiflix-confirm-aio';
const { Confirm } = notiflix;
import { api, url } from '~/utils/api';

export default {
    props: {
        userId: {
            type: String,
            required: true, // This prop is required
        },
        getProfile: {
            type: Function,
            required: true, // This prop is required
        },
        loading: {
            type: Boolean,
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
        const dataShow = ref(false);
        const file = ref({});
        const tabs = ref([
            'Posts',
            'Archive'
        ]);
        const currentPage = ref(1);
        const postsPerPage = ref(9);

        const activeTab = ref(tabs.value[0]);
        const selectTab = (tab) => {
            activeTab.value = tab;
        };
        const totalPages = computed(() => {
            return activeTab.value === 'Posts' ? Math.ceil(postData.value.length / postsPerPage.value) : Math.ceil(deletePost.value.length / postsPerPage.value);

        });
        const paginatedPosts = computed(() => {
            const currentData = activeTab.value === 'Posts' ? postData.value : deletePost.value;
            if (!Array.isArray(currentData)) return [];
            const startIndex = (currentPage.value - 1) * postsPerPage.value;
            const endIndex = startIndex + postsPerPage.value;
            return currentData.slice(startIndex, endIndex);
        });

        const goToPage = (page) => {
            if (page < 1 || page > totalPages.value) return; // Prevent invalid page
            currentPage.value = page;
        };
        watch(activeTab, (newTab) => {
            currentPage.value = 1; // Reset to page 1 whenever the tab changes
        });

        const dropdownToggle = (index) => {
            toggle.value = toggle.value === index ? null : index;
        }

        const toggleInfo = () => {
            infoModal.value = !infoModal.value;
            if (infoModal.value == true) {
                document.body.classList.add('overflow-y-hidden'); // Prevent scrolling
            } else {
                document.body.classList.remove('overflow-y-hidden'); // Allow scrolling
            }
        }

        const Edit = (postId) => {
            navigateTo(`/editPost/${postId}`)
        }

        const schema = Yup.object({
            image: Yup.string().required('*required'),
        });


        const { errors, handleSubmit } = useForm({
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
            const res = await api.post(`userAuth/upload/profileImage`, formData, {
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                    'Content-Type': 'multipart/form-data', // Add the token to the headers
                }
            });
            if (res.data.user.image !== null) {
                res.data.user.image = `${url}storage/images/` + res.data.user.image;
            }

            themeStore.getUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user))
            userData.value = JSON.parse(localStorage.getItem('user'));
            userData.value = localStorage.getItem('user');
            imageModal.value = !imageModal.value;
            if (imageModal.value == true) {
                document.body.classList.add('overflow-y-hidden'); // Prevent scrolling
            } else {
                document.body.classList.remove('overflow-y-hidden'); // Allow scrolling
            }

        });

        const formatTime = (dates) => {
            const date = new Date(dates);
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        }

        const toggleImage = () => {
            imageModal.value = !imageModal.value;
            image.value = '';
            if (imageModal.value == true) {
                document.body.classList.add('overflow-y-hidden'); // Prevent scrolling
            } else {
                document.body.classList.remove('overflow-y-hidden'); // Allow scrolling
            }
        }


        const Delete = async (postId) => {
            Confirm.show(
                'Delete Post!',
                'Are you sure to delete it?',
                'Yes',
                'No',
                async () => {
                    api.get(`basic-ui/delete/profile/post/${postId}`, {
                        headers: {
                            'Authorization': `Bearer ${token.value}` // Add the token to the headers
                        }
                    });
                    getProfile();
                },
                () => {

                },
                {
                },
            )
        }

        const getProfile = async () => {
            token.value = localStorage.getItem('token');
            const userId = props.userId;
            try {
                await api.get(`basic-ui/get/profile/post/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token.value}` // Add the token to the headers
                    }
                }).then((res) => {
                    res.data.post.forEach(post => {
                        if (post.images && post.images.length > 0) {
                            post.images.forEach((img, index) => {
                                post.images[index].image = `${url}storage/images/` + mg.image;
                            });
                        }
                    });
                    res.data.postAuth.forEach(post => {
                        if (post.images && post.images.length > 0) {
                            post.images.forEach((img, index) => {
                                post.images[index].image = `${url}storage/images/` + mg.image;
                            });
                        }
                    });
                    res.data.deletedPosts.forEach(post => {
                        if (post.images && post.images.length > 0) {
                            post.images.forEach((img, index) => {
                                post.images[index].image = `${url}storage/images/` + mg.image;
                            });
                        }
                    });
                    res.data.save.forEach(post => {
                        if (post.images && post.images.length > 0) {
                            post.images.forEach((img, index) => {
                                post.images[index].image = `${url}storage/images/` + mg.image;
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
                    dataShow.value = false;
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
        const restore = async (postId) => {
            Confirm.show(
                'restore post!',
                'Are you sure to restore it?',
                'Yes',
                'No',
                async () => {
                    api.get(`basic-ui/restore/profile/post/${postId}`, {
                        headers: {
                            'Authorization': `Bearer ${token.value}` // Add the token to the headers
                        }
                    });
                    getProfile();

                },
                () => {

                },
                {
                },
            )

        }

        const perDel = async (postId) => {
            Confirm.show(
                'Permanently Delete',
                'Are you sure to delete it Permanently?',
                'Yes',
                'No',
                async () => {
                    api.get(`basic-ui/delete/permanent/profile/post/${postId}`, {
                        headers: {
                            'Authorization': `Bearer ${token.value}` // Add the token to the headers
                        }
                    });
                    getProfile();
                    toggle.value = '';
                },
                () => {

                },
                {
                },
            )
        }

        watch(() => themeStore.user, (newPosts) => {
            userData.value = newPosts;
        });
        watch(() => themeStore.profilePost, (newPosts) => {
            postData.value = newPosts;
        });
        watch(() => themeStore.deletedPost, (newPosts) => {
            deletePost.value = newPosts;
        });

        onMounted(async () => {
            await props.getProfile();
            token.value = localStorage.getItem('token');
            userData.value = JSON.parse(localStorage.getItem('user'));
            postData.value = themeStore.profilePost;
            deletePost.value = themeStore.deletedPost;
            dataShow.value = true;
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
            errors,
            currentPage,
            postsPerPage,
            paginatedPosts,
            totalPages,
            goToPage,
            formatTime,
            getProfile,
            dataShow

        }
    }
}
</script>

<style lang="stylus" scoped>

</style>

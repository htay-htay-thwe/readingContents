<template>
    <div>
        <div v-show="showPw == true" class="relative z-10" aria-labelledby="modal-title" role="dialog"
            aria-modal="true">
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                    <form @submit.prevent="Submit" :class="[
                        'relative text-left transition-all transform rounded-lg top-10 shadow-xl sm:my-8 sm:w-full sm:max-w-lg',
                        themeStore.mode === true ? 'bg-black text-white' : 'bg-white text-black' // Conditional classes
                    ]">
                        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 id="modal-title" :class="[
                                        'text-base font-semibold leading-6 ',
                                        themeStore.mode === true ? ' text-white' : ' text-black' // Conditional classes
                                    ]">
                                        Update Password!</h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">Are you sure you want to change your
                                            password? All of your password will be permanently updated.</p>
                                        <div v-if="errorMessage" class="flex mt-3 text-sm text-red-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="currentColor" class="size-6">
                                                <path fill-rule="evenodd"
                                                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            {{ errorMessage }}
                                        </div>
                                    </div>
                                    <div class="mb-4">
                                        <label class="block mt-4 mb-2 text-sm font-bold text-gray-700" for="username">
                                            oldPassword
                                        </label>
                                        <input v-model="old" name="old"
                                            class="w-full px-3 py-2 text-lg leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="username" type="text" placeholder="Enter oldPassword">
                                        <span v-if="errors.old" class="text-sm text-red-400">{{ errors.old
                                            }}</span>
                                    </div>
                                    <div class="mb-4">
                                        <label class="block mt-4 mb-2 text-sm font-bold text-gray-700" for="username">
                                            NewPassword
                                        </label>
                                        <input v-model="newPw" name="newPw"
                                            class="w-full px-3 py-2 text-lg leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email" type="text" placeholder="Enter NewPassword">
                                        <span v-if="errors.newPw" class="text-sm text-red-400">{{ errors.newPw }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="submit"
                                class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-400 rounded-md shadow-sm hover:text-zinc-600 sm:ml-3 sm:w-auto">Update</button>
                            <button @click="togglePassword()" type="button"
                                class="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import * as Yup from 'yup';
import { useForm, useField } from 'vee-validate';
import api from '~/utils/api';

export default {
    props: {
        togglePassword: {
            type: Function,
            required: true,
        },
        showPw: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        const errorMessage = ref('');
        const themeStore = useThemeStore();
        const token = ref('');
        const userId = ref(null);
        const schema = Yup.object({
            old: Yup.string().required('*required').min(8, 'oldPassword must be at least 8 characters'),
            newPw: Yup.string().required('*required').min(8, 'newPassword must be at least 8 characters'),
        });

        const { errors, handleSubmit } = useForm({
            validationSchema: schema
        });
        const { value: old } = useField('old');
        const { value: newPw } = useField('newPw');

        const Submit = handleSubmit(async (values) => {
            token.value = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('oldPassword', values.old);
            formData.append('password', values.newPw);
            formData.append('userId', props.userId);
            try {
                await api.post('userAuth/change/password', formData, {
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    }
                });

                props.togglePassword();
            } catch (error) {
                if (error.response.status === 400) {
                    errorMessage.value = 'OldPassword is incorrect!';
                }
            }
        });

        onMounted(() => {
            old.value = '';
            newPw.value = '';
            errorMessage.value = '';
            const userData = JSON.parse(localStorage.getItem('user'));
            userId.value = userData.id;
        });

        return {
            old,
            newPw,
            Submit,
            errors,
            errorMessage,
            themeStore,
            userId
        }
    }
}
</script>

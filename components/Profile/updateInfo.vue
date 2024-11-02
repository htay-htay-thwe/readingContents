<template>
    <div>
        <!-- update user information  -->
        <div v-show="infoModal == true" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
    <div class="fixed inset-0 z-10 flex items-center justify-center w-screen p-3 overflow-y-auto">
        <div class="relative p-4 text-center sm:p-0">
            <form @submit.prevent="Submit"
                class="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                Update User Information!</h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">Are you sure you want to update your
                                    information? All of your data will be permanently updated.</p>
                                <div v-if="errorMessage" class="flex mt-3 text-red-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor" class="size-6">
                                        <path fill-rule="evenodd"
                                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{ errorMessage }}</div>
                            </div>
                            <div class="mb-4">
                                <label class="block mt-4 mb-2 text-sm font-bold text-gray-700" for="username">
                                    UserName
                                </label>
                                <input v-model="userName" name="userName"
                                    class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="username" type="text" placeholder="Enter userName">
                                <span v-if="errors.userName" class="text-red-400">{{ errors.userName }}</span>
                            </div>
                            <div class="mb-4">
                                <label class="block mt-4 mb-2 text-sm font-bold text-gray-700" for="username">
                                    Email
                                </label>
                                <input v-model="email" name="email"
                                    class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email" type="text" placeholder="1234@gmail.com">
                                <span v-if="errors.email" class="text-red-400">{{ errors.email }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="submit"
                        class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-400 rounded-md shadow-sm hover:text-zinc-600 sm:ml-3 sm:w-auto">Update</button>
                    <button @click="toggleInfo()" type="button"
                        class="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</div>

    </div>
</template>

<script>
import * as Yup from 'yup';
import { useForm, useField } from 'vee-validate';
import axios from 'axios'
export default {
    props: {
        toggleInfo: {
            type: Function,
            Required: true
        },
        infoModal: {
            type: Boolean,
            Required: true
        },
        userId: {
            type: Number,
            required: true, // This prop is required
        },
    },
    setup(props) {
        const token = ref('');
        const errorMessage = ref('');
        const themeStore = useThemeStore();
        const schema = Yup.object({
            userName: Yup.string().required('*required'),
            email: Yup.string().email('Invalid email address').required('*required'),
        });

        const { errors, handleSubmit } = useForm({
            validationSchema: schema
        });
        const { value: userName } = useField('userName');
        const { value: email } = useField('email');

        const Submit = handleSubmit(async (values) => {
            token.value = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('userName', values.userName);
            formData.append('email', values.email);
            formData.append('userId', props.userId);
            console.log(values);
            try {
                const res = await axios.post(`http://localhost:8000/api/userAuth/update/user/information`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token.value}`,
                        'Content-Type': 'multipart/form-data', // Add the token to the headers
                    }
                });

                if (res.data.user.image !== null) {
                    res.data.user.image = 'http://localhost:8000/storage/images/' + res.data.user.image;
                }
                console.log(res.data.user);
                themeStore.getUser(res.data.user);
                localStorage.setItem('user', JSON.stringify(res.data.user))
                props.toggleInfo();

            } catch (error) {
                if (error.response.status === 409) {
                    errorMessage.value = 'Account with this email already exists';
                }
            }
        })

        onMounted(() => {

            const user = JSON.parse(localStorage.getItem('user'));
            userName.value = user.name;
            email.value = user.email;
        });

        return {
            Submit,
            errors,
            userName,
            email,
            errorMessage
        }
    }
}
</script>

<template>
  <div
    class="flex items-center justify-center w-full max-w-xl mx-auto mb-4 overflow-hidden bg-white border-2 rounded-lg shadow-xl h-svh">
    <form @submit.prevent="onSubmit" class="w-full px-10 pb-10">
      <div class="mb-6 text-xl font-bold text-green-400">Login Page</div>

      <div v-if="errorMessage" class="mb-4 text-red-400">{{ errorMessage }}</div>
      <!-- Email Field -->
      <div class="mb-6">
        <label class="block mb-2 text-lg font-bold text-gray-700" for="email">
          Gmail
        </label>
        <input v-model="email" name="email"
          class="w-full px-4 py-3 leading-tight border border-gray-500 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
          id="email" type="text" placeholder="123@gmail.com" />
        <span v-if="errors.email" class="text-red-400">{{ errors.email }}</span>
      </div>

      <!-- Password Field -->
      <div class="mb-8">
        <label class="block mb-2 text-lg font-bold text-gray-700" for="password">
          Password
        </label>
        <input v-model="password" name="password"
          class="w-full px-4 py-3 mb-3 leading-tight text-gray-700 border border-gray-500 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
          id="password" type="password" placeholder="******************" />
        <span v-if="errors.password" class="text-red-400">{{ errors.password }}</span>
      </div>

      <div class="flex items-center justify-between">
        <button
          class="px-6 py-3 font-bold text-white bg-green-400 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit">
          Login
        </button>
        <a href="/registerPage"
          class="inline-block text-sm font-bold underline align-baseline text-zinc-500 hover:text-blue-800">
          No account?
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import { useForm, useField } from 'vee-validate';
import * as Yup from 'yup';
import axios from 'axios';

export default {
  setup() {
    const themeStore = useThemeStore();
    const errorMessage = ref(null);

    const schema = Yup.object({
      email: Yup.string().email('Invalid email address').required('*required'),
      password: Yup.string().required('*required').min(8, 'Password must be at least 8 characters'),
    });

    const { errors, handleSubmit } = useForm({
      validationSchema: schema,
    });


    const { value: email } = useField('email');
    const { value: password } = useField('password');

    // Create a method to handle form submission
    const onSubmit = handleSubmit(async (values) => {
      const data = {
        email: values.email,
        password: values.password
      }
      try {
        const res = await axios.post('http://localhost:8000/api/userAuth/user/login', data);
        themeStore.getUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        res.data.user.image = 'http://localhost:8000/storage/images/' + res.data.user.image;
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigateTo('/about');
      } catch (error) {
        if (error.response.status === 404) {
          // Display 'Account not found' error
          errorMessage.value = 'Account not found. Please check your email.';
        } else if (error.response.status === 401) {
          // Display 'Incorrect password' error
          errorMessage.value = 'Incorrect password. Please try again.';
        } else {
          // Handle any other errors
          errorMessage.value = 'An unexpected error occurred. Please try again.';
        }
      }
    });


    return {
      onSubmit,
      email,
      password,
      errors,
      errorMessage
    };
  },
};
</script>
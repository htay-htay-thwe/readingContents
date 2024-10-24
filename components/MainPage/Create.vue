<template>
  <div class="max-w-3xl mx-auto mt-10 space-y-10 font-mono">
    <div class="mb-10 font-mono text-2xl font-bold">Create Posts</div>

    <div class="mb-4">
      <label class="block mb-2 text-sm font-bold text-gray-700" for="genre">
        Genre
      </label>
      <select v-model="genre"
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="genre">
        <option>Default</option>
      </select>
      <span class="text-red-500" v-if="errors.genre">{{ errors.genre }}</span>
    </div>

    <div class="mb-4">
      <label class="block mb-2 text-sm font-bold text-gray-700" for="title">
        Title
      </label>
      <input v-model="title"
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="title" type="text" placeholder="Enter title..." />
      <span class="text-red-500" v-if="errors.title">{{ errors.title }}</span>
    </div>

    <div class="mb-4">
      <label class="block mb-2 text-sm font-bold text-gray-700" for="images">
        Insert Photo
      </label>
      <div class="flex items-center justify-center w-full h-40 border-2 border-dashed">
        <input type="file" multiple @change="handleFileUpload" class="p-2 mb-4 border" />
      </div>
      <div class="grid grid-cols-3 gap-4 mt-7">
        <div v-for="(image, index) in uploadedImages" :key="index" class="relative">
          <img :src="image.url" alt="Image preview" class="object-cover w-full h-32 rounded-md" />
          <button @click="removeImage(index)" class="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2">
            &times;
          </button>
        </div>
      </div>
      <span class="text-red-500" v-if="errors.images">{{ errors.images }}</span>
    </div>

    <div class="mb-4">
      <label class="block mb-2 text-sm font-bold text-gray-700" for="editor">
        Editor
      </label>
      <div id="editor" ref="editorContainer"></div>
      <button onclick="editor.commands.toggleItalic()">Italic</button>
      <button onclick="editor.commands.toggleBold()">Bold</button>
      <span class="text-red-500" v-if="errors.editor">{{ errors.editor }}</span>
    </div>

    <div class="flex justify-end gap-3 p-5">
      <button @click="onSubmit" type="button"
        class="p-2 px-4 bg-green-400 rounded-md hover:text-gray-700">Submit</button>
      <button type="button" class="p-2 px-4 text-white bg-black rounded-md hover:text-gray-700">Back</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as Yup from 'yup';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios'

export default {
  setup() {
    const editor = ref(null);
    const editorContainer = ref(null);
    const uploadedImages = ref([]);
    const token = ref('');
    const userId = ref('');
    const themeStore = useThemeStore();

    const schema = Yup.object({
      genre: Yup.string().required('*required'),
      title: Yup.string().required('*required'),
      images: Yup.array().min(1, '*At least one image is required.').required('*required'),
      editor: Yup.string().min(1, '*Content is required.').required('*required'),
    });

    const { errors, handleSubmit } = useForm({
      validationSchema: schema,
    });

    const { value: genre } = useField('genre');
    const { value: title } = useField('title');
    const { value: images } = useField('images'); // Using a field for images to validate
    const { value: editorContent } = useField('editor'); // For editor content validation

    // Create a method to handle form submission
    const onSubmit = handleSubmit(async (values) => {
      const editorHtml = editor.value.getHTML();
      const formData = new FormData();
      formData.append('userId', userId.value);
      formData.append('genre', values.genre);
      formData.append('title', values.title);
      formData.append('content', editorHtml);

      // Append images (if any)
      uploadedImages.value.forEach((image) => {
        formData.append('images[]', image.file); // Using 'images[]' to indicate it's an array of images
      });
      axios.post('http://localhost:8000/api/basic-ui/create/post', formData, {
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
        }),
        res.data.postAuth.forEach(post => {
          if (post.images && post.images.length > 0) {
            post.images.forEach((img, index) => {
              post.images[index].image = 'http://localhost:8000/storage/images/' + img.image;
            });
          }
        }),
        themeStore.getPosts(res.data.post);
        themeStore.getProfilePost(res.data.postAuth);
        navigateTo(`/profile/${userId.value}`);
      });
    });

    // Handle file uploads
    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        uploadedImages.value.push({ file, url }); // Store the file and its URL
      });
      images.value = uploadedImages.value; // Update the images field for validation
      event.target.value = ''; // Reset input value
    };

    // Remove an image from the preview list
    const removeImage = (index) => {
      uploadedImages.value.splice(index, 1);
      images.value = uploadedImages.value; // Update the images field for validation
    };

    onMounted(() => {
      token.value = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
      userId.value = userData.id;
      editor.value = new Editor({
        editorProps: {
          attributes: {
            class: 'border-2 border-zinc-400 w-full h-40 overflow-hidden rounded-md border-double',
          },
        },
        element: editorContainer.value,
        extensions: [StarterKit],
        content: '<p>Type something here...</p>',
        onUpdate: ({ editor }) => {
          // Get the HTML content and update the editor field value
          editorContent.value = editor.getHTML(); // Update VeeValidate field with editor content
        },
      });
    });

    onBeforeUnmount(() => {
      editor.value.destroy();
    });


    return {
      uploadedImages,
      handleFileUpload,
      removeImage,
      editorContainer,
      genre,
      title,
      onSubmit,
      errors,
      token,
      userId
    };
  },
};
</script>

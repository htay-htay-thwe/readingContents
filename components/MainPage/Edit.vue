<template>
    <div>
        <div class="max-w-3xl p-4 mx-auto mt-10 space-y-10 font-mono">
            <div class="mb-10 font-mono text-2xl font-bold">Edit Posts</div>

            <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="genre">
                    Genre
                </label>
                <select data-aos="fade-right" :data-aos-delay="100" v-model="genre"
                    class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="genre">
                    <option disabled value="">Select a genre</option>
                    <option v-for="(genre, index) in genres" :key="index" :value="genre">{{ genre }}</option>
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
                        <button @click="removeImage(index)"
                            class="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2">
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
                <div class="control-group">
                    <div class="space-x-3 button-group">
                        <button @click="editor?.chain().focus().toggleBold().run()"
                            :disabled="!editor?.can().chain().focus().toggleBold().run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('bold') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linejoin="round"
                                    d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z" />
                            </svg>

                        </button>
                        <button @click="editor?.chain().focus().toggleItalic().run()"
                            :disabled="!editor?.can().chain().focus().toggleItalic().run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('italic') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803" />
                            </svg>

                        </button>
                        <button @click="editor?.chain().focus().toggleStrike().run()"
                            :disabled="!editor?.can().chain().focus().toggleStrike().run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('strike') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 12a8.912 8.912 0 0 1-.318-.079c-1.585-.424-2.904-1.247-3.76-2.236-.873-1.009-1.265-2.19-.968-3.301.59-2.2 3.663-3.29 6.863-2.432A8.186 8.186 0 0 1 16.5 5.21M6.42 17.81c.857.99 2.176 1.812 3.761 2.237 3.2.858 6.274-.23 6.863-2.431.233-.868.044-1.779-.465-2.617M3.75 12h16.5" />
                            </svg>

                        </button>
                        <button @click="editor?.chain().focus().toggleCode().run()"
                            :disabled="!editor?.can().chain().focus().toggleCode().run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('code') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                            </svg>

                        </button>
                        <button @click="editor?.chain().focus().setParagraph().run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1 text-xl': editor?.isActive('paragraph') }">
                            P
                        </button>
                        <button @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('heading', { level: 1 }) }">
                            H1
                        </button>
                        <button @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('heading', { level: 2 }) }">
                            H2
                        </button>
                        <button @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('heading', { level: 3 }) }">
                            H3
                        </button>
                        <button @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('heading', { level: 4 }) }">
                            H4
                        </button>
                        <button @click="editor?.chain().focus().toggleHeading({ level: 5 }).run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('heading', { level: 5 }) }">
                            H5
                        </button>
                        <button @click="editor?.chain().focus().toggleHeading({ level: 6 }).run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('heading', { level: 6 }) }">
                            H6
                        </button>
                        <button @click="editor?.chain().focus().toggleBulletList().run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('bulletList') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>

                        </button>
                        <button @click="editor?.chain().focus().toggleOrderedList().run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('orderedList') }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                            </svg>

                        </button>
                        <button @click="editor?.chain().focus().toggleCodeBlock().run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('codeBlock') }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.243 6.757l-1.414 1.414-4.95-4.95L6.757 6.757l4.95 4.95-4.95 4.95 1.414 1.414 4.95-4.95 4.95 4.95 1.414-1.414-4.95-4.95 4.95-4.95z" />
                            </svg>
                        </button>
                        <button @click="editor?.chain().focus().undo().run()"
                            :disabled="!editor?.can().chain().focus().undo().run()">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
                            </svg>

                        </button>
                        <button @click="editor?.chain().focus().redo().run()"
                            :disabled="!editor?.can().chain().focus().redo().run()">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
                            </svg>

                        </button>
                        <button @click="editor?.chain().focus().setColor('#4ADA8E').run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('textStyle', { color: '#4ADA8E' }) }">
                            Green
                        </button>
                        <button @click="editor?.chain().focus().setColor('#FF0033').run()"
                            :class="{ 'bg-zinc-300 rounded-md p-1': editor?.isActive('textStyle', { color: '#FF0033' }) }">
                            Red
                        </button>
                    </div>
                </div>
                <div ref="editorContainer"></div>
                <span class="text-red-500" v-if="errors.editor">{{ errors.editor }}</span>
            </div>

            <div class="flex justify-end gap-3 ">
                <button @click="onSubmit" type="button"
                    class="p-2 px-4 bg-green-400 rounded-md hover:text-gray-700">Edit</button>
                <button type="button" class="p-2 px-4 text-white bg-black rounded-md hover:text-gray-700"
                    onclick="history.back()">Back</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as Yup from 'yup';
import { Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import axios from 'axios'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Heading } from '@tiptap/extension-heading'


export default {
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    setup(props) {

        const editor = ref(null);
        const editorContainer = ref(null);
        const uploadedImages = ref([]);
        const token = ref('');
        const Id = ref('');
        const themeStore = useThemeStore();
        const genres = ref([
            'Action',
            'Adventure',
            'Technology',
            'Comedy',
            'Drama',
            'Fantasy',
            'Historical',
            'Horror',
            'Mystery',
            'Romance',
            'Sci-Fi',
            'Thriller',
            'Western',
            'Animation',
            'Documentary',
            'Crime',
            'Biography',
            'Family',
            'Music',
            'Musical',
            'Sports',
            'War',
            'Recipes',
            'snakes',
            'birds',
            'food',
            'Adventure Comedy',
            'Fantasy Adventure',
            'Science Fantasy',
            'Social',
            'Historical Drama',
            'Urban',
            'Adventure Drama',
            'Historical Romance',
            'Action Comedy',          
            'Romantic Comedy',         
            'Dark Comedy',                    
            'Fantasy Comedy',         
            'Family Drama', 
            'politics'                
        ]);

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
            formData.append('userId', Id.value);
            formData.append('postId', props.postId);
            formData.append('genre', values.genre);
            formData.append('title', values.title);
            formData.append('content', editorHtml);

            // Append images (if any)
            uploadedImages.value.forEach((image) => {
                if (image.file) {
                    formData.append('images[]', image.file);
                }
                if (image.file === null && image.url) {
                    formData.append('imageUrls[]', image.url);  // Send existing image URLs
                }
            });

            axios.post('http://localhost:8000/api/basic-ui/update/post', formData, {
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
                navigateTo(`/profile/${Id.value}`);
            });
        });

        // Handle file uploads
        const handleFileUpload = (event) => {
            const files = Array.from(event.target.files);
            files.forEach((file) => {
                const url = URL.createObjectURL(file);
                uploadedImages.value.push({ file, url });
            });
            console.log(uploadedImages.value);
            images.value = uploadedImages.value;
            event.target.value = '';
        };

        // Remove an image from the preview list
        const removeImage = (index) => {
            uploadedImages.value.splice(index, 1);
            images.value = uploadedImages.value;
        };

        const editPost = () => {
            const postId = props.postId;
            const userId = Id.value;
            axios.get(`http://localhost:8000/api/basic-ui/edit/post/${postId}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token.value}` // Add the token to the headers
                }
            }).then((res) => {
                const post = res.data.post;

                genre.value = post.genre; // Assuming genre is a string
                title.value = post.title; // Assuming title is a string
                editorContent.value = res.data.post.content; // Assuming content is a string
                editor.value = new Editor({
                    editorProps: {
                        attributes: {
                            class: 'border-2 border-zinc-400 w-full h-40 overflow-y-auto rounded-md border-double',
                        },
                    },
                    element: editorContainer.value,
                    extensions: [
                        Heading.configure({
                            levels: [1, 2, 3, 4, 5, 6] // Enable all heading levels
                        }),
                        Color.configure({ types: [TextStyle.name, ListItem.name] }),
                        TextStyle.configure({ types: [ListItem.name] }),
                        StarterKit,
                    ],
                    content: editorContent.value,
                    onUpdate: ({ editor }) => {
                        // Get the HTML content and update the editor field value
                        editorContent.value = editor.getHTML(); // Update VeeValidate field with editor content
                    },
                });
                // Handle image URLs if available
                if (post.images && post.images.length > 0) {
                    uploadedImages.value = post.images.map(image => ({
                        file: null,
                        url: `http://localhost:8000/storage/images/${image.image}` // Construct URL for image display
                    }));
                    console.log(uploadedImages.value);
                    images.value = uploadedImages.value;

                }

            });
        }

        onMounted(() => {
            token.value = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('user'));
            Id.value = userData.id;
            editPost();

        });

        onBeforeUnmount(() => {
            editor.value.destroy();
        });


        return {
            uploadedImages,
            handleFileUpload,
            removeImage,
            editorContainer,
            editorContent,
            genre,
            genres,
            title,
            onSubmit,
            errors,
            token,
            Id,
            editPost,
            editor
        };
    },
};
</script>
<style lang="css">
h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin: 1rem 0;
    color: #333;
}

h1 {
    font-size: 2.5rem;
}

h2 {
    font-size: 2rem;
}

h3 {
    font-size: 1.75rem;
}

h4 {
    font-size: 1.5rem;
}

h5 {
    font-size: 1.25rem;
}

h6 {
    font-size: 1rem;
}

</style>

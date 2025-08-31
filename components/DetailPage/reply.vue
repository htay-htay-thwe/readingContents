<template>
    <div>

        <div v-show="replyToggle == true" class="relative z-10" aria-labelledby="modal-title" role="dialog"
            aria-modal="true">
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
            <div class="fixed inset-0 z-10 flex items-center justify-center w-screen p-3 overflow-y-auto">
                <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                    <div
                        class="relative text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                        <div class="px-4 pt-5 pb-4 mx-auto overflow-y-auto rounded-lg" style="max-height: 400px;">
                            <div class="flex flex-row justify-between ">
                                <div class="font-mono text-2xl font-bold">Comment</div>
                            </div>
                        </div>

                        <div class="p-5">
                            <div class="flex flex-row gap-4">
                                <img v-if="userData.image === `${url}storage/images/null`" :src="Img"
                                    class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg" />
                                <img v-else :src="userData.image"
                                    class="w-12 h-12 border-2 rounded-full border-zinc-400" />
                                <div><textarea v-model="reply" name="reply" class="border-2 rounded-md border-zinc-500"
                                        cols="50" rows="5" placeholder="Enter Comment here..."></textarea></div>
                            </div>
                            <div class="text-red-500 ml-14" v-if="errors.reply">{{ errors.reply }}</div>
                            <div class="flex justify-end space-x-2">
                                <button @click="replyDrop" type="button"
                                    class="w-24 p-2 text-center bg-white border-2 rounded-lg hover:text-green-400">Cancel</button>
                                <button @click="onSubmit" type="button"
                                    class="w-24 p-2 text-center bg-green-400 rounded-lg hover:text-zinc-500">Comment</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import { ref } from 'vue';
import Img from "@/assets/img/default.jpg";
import { useForm, useField } from 'vee-validate';
import * as Yup from 'yup';
import { api, url } from '~/utils/api';
export default {
    props: {
        replyDrop: {
            type: Function,
            Required: true
        },
        replyToggle: {
            type: Boolean,
            Required: true
        },
        postId: {
            type: String,
            Required: true
        },
        parentId: {
            type: Number,
            Required: true
        },
        getProfile: {
            type: Function,
            Required: true,
        },
        Detail: {
            type: Function,
            Required: true
        }
    },
    setup(props) {
        const themeStore = useThemeStore();
        const token = ref(null);
        const Id = ref(null);
        const userData = ref({});
        const schema = Yup.object({
            reply: Yup.string().required('*required')
        });

        const { errors, handleSubmit, resetForm } = useForm({
            validationSchema: schema,
        });

        const { value: reply } = useField('reply');

        const onSubmit = handleSubmit(async (values) => {
            token.value = localStorage.getItem("token");
            const userData = JSON.parse(localStorage.getItem("user"));
            Id.value = userData.id;
            const userId = Number(Id.value);
            const postId = Number(props.postId);
            const formData = {
                parentId: props.parentId,
                reply: values.reply,
            };
            const res = await api.post(`basic-ui/reply/comment/${postId}/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            themeStore.getComment(res.data.comment);
            await props.getProfile();
            await props.Detail();
            await props.replyDrop();
            resetForm();

        });

        onMounted(() => {
            userData.value = JSON.parse(localStorage.getItem("user"));
        });

        return {
            Img,
            reply,
            onSubmit,
            errors,
            userData
        }
    }

}
</script>

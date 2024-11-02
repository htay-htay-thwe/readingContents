<template>

  <div v-if="!loading" class="max-w-6xl mx-auto overflow-x-hidden">
    <div class="flex flex-row gap-5 p-5">

      <div class="-mt-2">
        <img v-if="postDetail.writerProfile === null" :src="Img"
          class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg" />
        <img v-else :src="`http://localhost:8000/storage/images/${postDetail.writerProfile}`"
          class="w-12 h-12 border-2 rounded-full border-zinc-400" />
        <!-- <img :src="`http://localhost:8000/storage/images/${postDetail.writerProfile}`" class="w-10 h-10 rounded-full" /> -->
      </div>

      <div class="mt-1 underline">{{ postDetail.userName }}</div>

      <div class="flex flex-row mt-1 "> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="#05E187" class="size-5 mt-0.5">
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
          <path
            d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
        </svg>

        {{ postDetail.email }}</div>
    </div>

    <DetailPageSimpleCarousel :postDetail="postDetail" class="float-left" />
    <p class="pl-4 ml-2 text-balance" v-html="postDetail.content"></p>

    <div class="flex flex-row max-w-sm mt-10 mb-5">
      <div
        class="flex flex-row justify-center w-32 gap-2 p-1 mx-auto border-2 border-gray-200 rounded-full shadow-lg">
        <div v-if="postDetail.like !== 0" @click="like(postDetail.id)" class="scale-100 hover:scale-105"><svg
            xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2M4 10h2v9H4zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7z" />
          </svg></div>
        <div v-else><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path
              d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"
              fill="#00DC82" />
          </svg></div>
        <div class="mt-0.5 text-lg font-semibold">{{ postDetail.likeCount }}</div>
        <div v-if="postDetail.like !== 1" @click="unLike(postDetail.id)" class="scale-100 hover:scale-105"><svg
            xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2 2 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2m-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638zM18 14V5h2l.001 9z" />
          </svg></div>
        <div v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="#00DC82"
              d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649l-.063.293V14a2 2 0 0 0 2 2" />
          </svg>
        </div>
      </div>

      <div class="flex gap-2 mt-2">
        <div class="font-mono text-lg font-bold">Views</div>
        <div class="font-mono text-lg font-bold">{{ postDetail.views }}</div>
      </div>
    </div>

    <br />

    <div class="max-w-3xl mx-auto">
      <div class="flex flex-row gap-4 mt-3">
        <img v-if="userData.image === 'http://localhost:8000/storage/images/null'" :src="Img"
          class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg" />
        <img v-else :src="userData.image" class="w-12 h-12 border-2 rounded-full border-zinc-400" />
        <div>
          <textarea v-model="comment" name="comment" class="border-2 rounded-md border-zinc-500" cols="80" rows="5"
            placeholder="Enter Comment here..."></textarea></div>
      </div>
      <div class="text-red-500 ml-14" v-if="errors.comment">{{ errors.comment }}</div>
      <div class="flex justify-end mr-20">
        <button @click="onSubmit" type="button" class="w-24 p-2 text-center bg-green-400 rounded-lg ">Comment</button>
      </div>
    </div>


    <div class="font-serif text-3xl font-semibold mb-7">Comment Sections</div>
    <div v-for="(comment, index) in commentData?.comments" :key="index" class="">
      <div class="flex flex-row max-w-4xl mx-auto mb-2 space-x-3">
        <img v-if="comment.user.image == null" :src="Img"
          class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg" />
        <img v-else :src="`http://localhost:8000/storage/images/${comment.user.image}`"
          class="w-10 h-10 mt-1 border-2 rounded-full shadow-lg border-zinc-400" />
        <div class="w-1/2">
          <div class="p-3 border-2 rounded-lg shadow-lg">
            <div class="font-bold">{{ comment.user.name }}</div>
            <div class="font-mono">{{ comment.comment }}</div>
          </div>
          <div class="flex flex-row justify-end w-full mt-2 space-x-4 font-mono">
            <div @click="replyDrop(comment.id)" class="hover:text-zinc-400">Reply</div>
            <div class="underline text-end text-zinc-400">{{ formatTime(comment.updated_at) }}</div>
          </div>
        </div>
      </div>

      <div v-if="comment.replies.length > 0">
        <div v-for="(replyOne, index) in comment?.replies" :key="index">
          <div class="flex flex-row max-w-4xl pl-8 mx-auto mb-2 space-x-3">
            <img v-if="replyOne.user.image == null" :src="Img"
              class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg" />
            <img v-else :src="`http://localhost:8000/storage/images/${replyOne.user.image}`"
              class="w-10 h-10 mt-1 border-2 rounded-full shadow-lg border-zinc-400" />
            <div class="w-1/2">
              <div class="p-3 border-2 rounded-lg shadow-lg">
                <div class="font-bold">{{ replyOne.user.name }}</div>
                <div class="font-mono">{{ replyOne.comment }}</div>
              </div>
              <div class="flex flex-row justify-end w-full mt-2 space-x-4 font-mono">
                <div @click="replyDrop(replyOne.id)" class="hover:text-zinc-400">Reply</div>
                <div class="underline text-end text-zinc-400">{{ formatTime(replyOne.updated_at) }}</div>
              </div>
            </div>
          </div>

          <!-- reply Two -->
          <div v-if="replyOne.replies.length > 0">
            <div v-for="(replyTwo, index) in replyOne?.replies" :key="index">
              <div class="flex flex-row max-w-4xl pl-16 mx-auto mb-2 space-x-3">
                <img v-if="replyTwo.user.image == null" :src="Img"
                  class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg" />
                <img v-else :src="`http://localhost:8000/storage/images/${replyTwo.user.image}`"
                  class="w-10 h-10 mt-1 border-2 rounded-full shadow-lg border-zinc-400" />
                <div class="w-1/2">
                  <div class="p-3 border-2 rounded-lg shadow-lg">
                    <div class="font-bold">{{ replyTwo.user.name }}</div>
                    <div class="font-mono">{{ replyTwo.comment }}</div>
                  </div>
                  <div class="flex flex-row justify-end w-full mt-2 space-x-4 font-mono">
                    <div @click="replyDrop(replyTwo.id)" class="hover:text-zinc-400">Reply</div>
                    <div class="underline text-end text-zinc-400">{{ formatTime(replyTwo.updated_at) }}</div>
                  </div>
                </div>
              </div>

              <!-- reply three -->
              <div v-if="replyTwo.replies.length > 0">
                <div v-for="(replyThree, index) in replyTwo?.replies" :key="index">
                  <div class="flex flex-row max-w-4xl pl-24 mx-auto mb-2 space-x-3">
                    <img v-if="replyThree.user.image == null" :src="Img"
                      class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg" />
                    <img v-else :src="`http://localhost:8000/storage/images/${replyThree.user.image}`"
                      class="w-10 h-10 mt-1 border-2 rounded-full shadow-lg border-zinc-400" />
                    <div class="w-1/2">
                      <div class="p-3 border-2 rounded-lg shadow-lg">
                        <div class="font-bold">{{ replyThree.user.name }}</div>
                        <div class="font-mono">{{ replyThree.comment }}</div>
                      </div>
                      <div class="flex flex-row justify-end w-full mt-2 space-x-4 font-mono">
                        <div @click="replyDrop(replyThree.id)" class="hover:text-zinc-400">Reply</div>
                        <div class="underline text-end text-zinc-400">{{ formatTime(replyThree.updated_at) }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- reply four -->
                  <div v-if="replyThree.replies.length > 0">
                    <div v-for="(replyFour, index) in replyThree?.replies" :key="index">
                      <div class="flex flex-row max-w-4xl pl-32 mx-auto mb-2 space-x-3">
                        <img v-if="replyFour.user.image == null" :src="Img"
                          class="w-10 h-10 border-2 border-gray-400 rounded-full shadow-lg" />
                        <img v-else :src="`http://localhost:8000/storage/images/${replyFour.user.image}`"
                          class="w-10 h-10 mt-1 border-2 rounded-full shadow-lg border-zinc-400" />
                        <div class="w-1/2">
                          <div class="p-3 border-2 rounded-lg shadow-lg">
                            <div class="font-bold">{{ replyFour.user.name }}</div>
                            <div class="font-mono">{{ replyFour.comment }}</div>
                          </div>
                          <div class="flex flex-row justify-end w-full mt-2 space-x-4 font-mono">
                            <div @click="replyDrop(replyFour.id)" class="hover:text-zinc-400">Reply</div>
                            <div class="underline text-end text-zinc-400">{{ formatTime(replyFour.updated_at) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DetailPageReply :getProfile="getProfile" :replyToggle="replyToggle" :replyDrop="replyDrop" :postId="postId"
      :parentId="parentId" :Detail="Detail" />

  </div>

</template>

<script>
import 'flowbite';
import Img from "@/assets/img/default.jpg";
import ImgI from "@/assets/img/first_img.png";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useForm, useField } from 'vee-validate';
import * as Yup from 'yup';
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/swiper-bundle.css';

export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
    getProfile: {
      type: Function,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const postDetail = ref({});
    const Id = ref('');
    const token = ref('');
    const commentData = ref([]);
    const themeStore = useThemeStore();
    const replyToggle = ref(false);
    const parentId = ref(null);
    const userData = ref({});
    const postId = props.postId;

    const schema = Yup.object({
      comment: Yup.string().required('*required')
    });

    const { errors, handleSubmit, resetForm } = useForm({
      validationSchema: schema,
    });

    const { value: comment } = useField('comment');


    // Create a method to handle form submission
    const onSubmit = handleSubmit(async (values) => {
      token.value = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      Id.value = userData.id;
      const userId = Number(Id.value);
      const postId = Number(props.postId);
      const comment = values.comment;
      console.log('comment', comment);
      const parentId = 1;
      await axios.get(`http://localhost:8000/api/basic-ui/create/comment/${postId}/${parentId}/${userId}/${comment}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }).then(async (res) => {
        console.log(res.data);
        themeStore.getComment(res.data.comment);
        commentData.value = themeStore.comment;
        resetForm();
        await props.getProfile();
        await Detail();
      });
    });

    const replyDrop = (Id) => {
      parentId.value = Id;
      replyToggle.value = !replyToggle.value;
      if (replyToggle.value == true) {
        document.body.classList.add('overflow-y-hidden'); // Prevent scrolling
      } else {
        document.body.classList.remove('overflow-y-hidden'); // Allow scrolling
      }

    }

    const Detail = async () => {
      const userId = Id.value;
      await axios.get(
        `http://localhost:8000/api/basic-ui/get/read/content/${postId}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      ).then((res) => {
        if (res.data.readPost.images && res.data.readPost.images.length > 0) {
          res.data.readPost.images.forEach((img, index) => {
            res.data.readPost.images[index].image = "http://localhost:8000/storage/images/" + img.image;
          });
        }
        themeStore.getDetailPost(res.data.readPost);
        postDetail.value = themeStore.detail;
        console.log(postDetail.value.images);
      });
    };

    const like = async (postId) => {
      token.value = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      Id.value = userData.id;
      const userId = Id.value;
      await axios.get(`http://localhost:8000/api/basic-ui/add/like/${postId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      await props.getProfile();
      await Detail();
    }

    const unLike = async (postId) => {
      token.value = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      Id.value = userData.id;
      const userId = Id.value;
      await axios.get(`http://localhost:8000/api/basic-ui/unlike/${postId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      await props.getProfile();
      await Detail();
    }

    const createView = async () => {
      token.value = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      Id.value = userData.id;
      const userId = Number(Id.value);
      const postIds = Number(props.postId);
      await axios.get(`http://localhost:8000/api/basic-ui/create/view/content/${userId}/${postIds}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      await props.getProfile();
      await Detail();
    }


    const getComments = async () => {
      token.value = localStorage.getItem("token");
      const postId = Number(props.postId);
      const res = await axios.get(`http://localhost:8000/api/basic-ui/show/comments/${postId}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      themeStore.getComment(res.data.comment);
      commentData.value = themeStore.comment;
      console.log(commentData.value);
      await props.getProfile();
      await Detail();
    }

    watch(() => themeStore.detail, (newPosts) => {
      postDetail.value = newPosts;
    });

    watch(() => themeStore.comment, (newPosts) => {
      commentData.value = newPosts;
    });



    const formatTime = (date) => {
      const now = new Date();
      const seconds = Math.floor((now - new Date(date)) / 1000);

      let interval = Math.floor(seconds / 31536000);
      if (interval > 1) return `${interval} yrs ago`;

      interval = Math.floor(seconds / 2592000);
      if (interval > 1) return `${interval}m ago`;

      interval = Math.floor(seconds / 86400);
      if (interval > 1) return `${interval}days ago`;

      interval = Math.floor(seconds / 3600);
      if (interval > 1) return `${interval}h ago`;

      interval = Math.floor(seconds / 60);
      if (interval > 1) return `${interval}min ago`;

      return seconds < 2 ? "Just now" : `${seconds}sec ago`;
    }

    onMounted(() => {

      token.value = localStorage.getItem("token");
      userData.value = JSON.parse(localStorage.getItem("user"));
      Id.value = userData.value.id;
      createView();
      Detail();
      getComments();
    });

    return {
      Img,
      ImgI,
      postDetail,
      Id,
      token,
      postId,
      like,
      unLike,
      createView,
      onSubmit,
      comment,
      errors,
      getComments,
      commentData,
      replyToggle,
      replyDrop,
      parentId,
      Detail,
      userData,
      formatTime,
      // Swiper,
      // SwiperSlide,
      // modules: [Pagination, Navigation]
      // Swiper,
      // SwiperSlide,
      // Pagination,
      // Navigation
    };
  },
};
</script>
<style scoped>
/* @import '~swiper/swiper-bundle.css'; */
.mySwiper {
  height: 300px;
  /* Adjust height as needed */
}

.mySwiper img {
  width: 100%;
  /* Make images responsive */
  height: auto;
}
</style>

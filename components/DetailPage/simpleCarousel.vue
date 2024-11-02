<template>
    <div class="carousel">
      <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div class="carousel-item" v-for="(image, index) in postDetail?.images" :key="index">
          <img
            :src="image.image"
            :alt="'Image ' + (index + 1)"
            class="carousel-image"
          />
        </div>
      </div>
      <button @click="prev" class="carousel-button prev">❮</button>
      <button @click="next" class="carousel-button next">❯</button>
      <div class="carousel-indicators">
        <span
          v-for="(image, index) in postDetail?.images"
          :key="index"
          :class="['indicator', { active: currentIndex === index }]"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    props: {
      postDetail: {
        type: Object,
        required: true,
      },
    },
  
    setup(props) {
      const currentIndex = ref(0);
  
      const next = () => {
        currentIndex.value = (currentIndex.value + 1) % props.postDetail.images.length;
      };
  
      const prev = () => {
        currentIndex.value = (currentIndex.value - 1 + props.postDetail.images.length) % props.postDetail.images.length;
      };
  
      const goToSlide = (index) => {
        currentIndex.value = index;
      };
  
      // Watch for postDetail changes to reset currentIndex if images change
      watch(
        () => props.postDetail.images,
        () => {
          currentIndex.value = 0; // Reset to the first image
        }
      );
  
      return {
        next,
        prev,
        goToSlide,
        currentIndex,
      };
    },
  };
  </script>
  
  <style scoped>
.carousel {
  position: relative;
  width: 600px; /* Fixed width for the carousel */
  height: 300px; /* Fixed height for the carousel */
  margin: auto;
  overflow: hidden;
  border-radius: 10px; /* Optional styling */
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%; /* Ensure full width */
}

.carousel-item {
  min-width: 100%; /* Ensure only one item is shown */
  height: 300px; /* Match the carousel height */
  display: flex; /* Use flexbox to center the image */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
}

.carousel-image {
    border-radius: 15px 15px;
  width: auto; /* Maintain original width */
  height: 100%; /* Set height to fill the container */
  object-fit: contain; /* Ensure the entire image is visible */
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 2em;
  padding: 0.5em;
  z-index: 1; /* Ensure buttons are above images */
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.carousel-indicators {
  text-align: center;
  margin-top: 10px;
}

.indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #bbb;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.indicator.active {
  background-color: #717171;
}
</style>
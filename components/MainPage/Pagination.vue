<template>
    <div class="flex justify-end m-5">
      <nav aria-label="Pagination">
        <ul class="flex items-center space-x-2">
          <li>
            <a 
              href="#" 
              @click.prevent="goToPage(currentPage - 1)" 
              class="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200 {{ currentPage === 1 ? 'opacity-50 cursor-not-allowed' : '' }}"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              :aria-disabled="currentPage === 1"
            >
              Previous
            </a>
          </li>
  
          <li v-for="page in totalPages" :key="page">
            <a 
              href="#" 
              @click.prevent="goToPage(page)" 
              class="px-3 py-1 text-gray-600 border rounded-md hover:bg-gray-200" 
              :class="{ 'bg-green-400 font-semibold': currentPage === page }"
            >
              {{ page }}
            </a>
          </li>
  
          <li>
            <a 
              href="#" 
              @click.prevent="goToPage(currentPage + 1)" 
              class="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200 {{ currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : '' }}"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              :aria-disabled="currentPage === totalPages"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        goToPage: {
            type: Function,
            required: true
        },
    },
  };
  </script>
  

  
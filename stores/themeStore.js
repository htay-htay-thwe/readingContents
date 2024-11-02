// stores/theme.js

import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false, 
    posts:{},
    profilePost:{},
    deletedPost:{},
    view:null,
    save:{},
    user:{},
    detail:{},
    comment:[],
    mode:''
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
    getPosts(post) {
      this.posts = post;
    },
    getProfilePost(post) {
      this.profilePost = post;
    },
    getDeletedPost(post) {
      this.deletedPost = post;
    },
    getView(post) {
      this.view = post;
    },
    getSave(post) {
      this.save = post;
    },
    getUser(user) {
      this.user = user;
    },
    getDetailPost(post) {
      this.detail = post;
    },
    resetStore(){
      this.$reset();
    },
    getComment(com){
      this.comment = com;
    },
    getMode(com){
      this.mode = com;
    }
  },
});

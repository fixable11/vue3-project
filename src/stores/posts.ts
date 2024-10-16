import { inject } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: []
  }),

  actions: {
    async fetchPosts() {
      try {
        const { data } = await axios.get(POSTS_URL)
        this.posts = data
      } catch (error) {
        console.log('err', error)
      }
    }
  }
})

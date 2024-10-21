import { inject } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: []
  }),

  getters: {
    getPosts(state) {
      return state.posts
    }
  },

  actions: {
    async fetchPosts() {
      try {
        const { data } = await axios.get(POSTS_URL)
        this.posts = data
      } catch (error) {
        console.log('err', error)
      }
    },
    async createPost(formData = {}) {
      try {
        const { data } = await axios.post(POSTS_URL, formData)
        this.posts.push(data)
      } catch (error) {
        console.log('err', error)
      }
    }
  }
})

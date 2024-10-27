import { inject, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: reactive(new Map())
  }),

  getters: {
    getPosts(state) {
      return Array.from(state.posts.values())
    }
  },

  actions: {
    async fetchPosts() {
      try {
        const { data: posts } = await axios.get(POSTS_URL)
        for (const post of posts) {
          this.posts.set(post.id, Object.assign(post, this.posts.get(post.id) ?? {}))
        }
      } catch (error) {
        console.log('err', error)
      }
    },
    async fetchPost(postId: number) {
      try {
        if (this.posts.has(+postId)) {
          return this.posts.get(+postId)
        }

        const { data } = await axios.get(`${POSTS_URL}/${postId}`)
        return data
      } catch (error) {
        console.log('err', error)
      }
    },
    async createPost(formData = {}) {
      try {
        const { data: post } = await axios.post(POSTS_URL, formData)
        this.posts.set(post.id, post)
      } catch (error) {
        console.log('err', error)
      }
    },
    async updatePost(postId: number, formData = {}) {
      try {
        const { data: post } = await axios.put(`${POSTS_URL}/${postId}`, formData)
        this.posts.set(post.id, post)
      } catch (error) {
        console.log('err', error)
      }
    },
    async deletePost(postId: number) {
      try {
        await axios.delete(`${POSTS_URL}/${postId}`)
        this.posts.delete(postId)
      } catch (error) {
        console.log('err', error)
      }
    }
  }
})

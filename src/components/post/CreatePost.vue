<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import { useRouter } from 'vue-router'

const titleInput = defineModel('title')
const bodyInput = defineModel('body')

const router = useRouter()

const postsStore = usePostsStore()
async function createPost() {
  const createPostForm = { title: titleInput.value, body: bodyInput.value, userId: 1 }
  await postsStore.createPost(createPostForm)
  await router.push({ name: 'posts' })
}
</script>

<template>
  <div class="create-post">
    <h1 class="h1 title">Create post</h1>

    <div class="row">
      <form class="mt-4" @submit.prevent="createPost">
        <div class="form-group">
          <label for="titleInput">Title</label>
          <input
            v-model="titleInput"
            type="text"
            class="form-control mt-1"
            id="titleInput"
            aria-describedby="emailHelp"
            placeholder=""
          />
        </div>
        <div class="form-group mt-2">
          <label for="bodyInput">Body</label>
          <textarea
            v-model="bodyInput"
            class="form-control mt-1"
            id="bodyInput"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

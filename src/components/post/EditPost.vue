<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const titleInput = defineModel('title')
const bodyInput = defineModel<string>('body')

const router = useRouter()
const route = useRoute()

const postsStore = usePostsStore()
async function editPost() {
  const editForm = { title: titleInput.value, body: bodyInput.value, userId: 1 }
  await postsStore.updatePost(+route.params.postId, editForm)
  await router.push({ name: 'posts' })
}

onMounted(async () => {
  const post = await postsStore.fetchPost(+route.params.postId)
  titleInput.value = post.title
  bodyInput.value = post.body
})
</script>

<template>
  <div class="edit-post">
    <h1 class="h1 title">Edit post #{{ route.params.postId }}</h1>

    <div class="row">
      <form class="mt-4" @submit.prevent="editPost">
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
        <button @click="router.push({ name: 'posts' })" class="btn btn-secondary mt-3">
          Cancel
        </button>
        <button type="submit" class="btn btn-success mt-3 ms-2">Save</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

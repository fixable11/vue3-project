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
  await router.push({ name: 'posts' })
}

let post: any = {}

onMounted(async () => {
  post = await postsStore.fetchPost(+route.params.postId)
  titleInput.value = post.title
  bodyInput.value = post.body
})
</script>

<template>
  <div class="edit-post">
    <h1 class="h1 title">View post #{{ route.params.postId }}</h1>

    <div class="row">
      <form class="mt-4" @submit.prevent="editPost">
        <div class="form-group">
          <label for="titleInput">Title</label>
          <input
            disabled
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
            disabled
            v-model="bodyInput"
            class="form-control mt-1"
            id="bodyInput"
            rows="3"
          ></textarea>
        </div>
        <button
          @click="router.push({ name: 'edit-post', params: { postId: post.id } })"
          type="submit"
          class="btn btn-primary mt-3"
        >
          Edit
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
//@ts-ignore
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'

const titleInput = defineModel('title')
const bodyInput = defineModel<string>('body')

let deleteModal: any = null

const router = useRouter()
const route = useRoute()

const postsStore = usePostsStore()

async function deletePost() {
  const postId: number = +route.params.postId
  await postsStore.deletePost(postId)
  deleteModal.hide()
  await router.push({ name: 'posts' })
}

let post: any = {}

onMounted(async () => {
  post = await postsStore.fetchPost(+route.params.postId)
  titleInput.value = post.title
  bodyInput.value = post.body
  deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {})
})
</script>

<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete post?</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Are you sure to delete post <strong>#{{ +route.params.postId }}</strong
          >?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="deletePost()" type="button" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <div class="edit-post">
    <h1 class="h1 title">View post #{{ route.params.postId }}</h1>

    <div class="row">
      <form class="mt-4">
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
        <button @click="router.push({ name: 'posts' })" class="btn btn-secondary mt-3">
          Cancel
        </button>
        <button
          @click="router.push({ name: 'edit-post', params: { postId: post.id } })"
          class="btn btn-primary mt-3 ms-2"
        >
          Edit
        </button>
        <button @click.prevent="deleteModal.toggle()" class="btn btn-danger mt-3 ms-2">
          Delete
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

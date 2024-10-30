<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { useRouter } from 'vue-router'
//@ts-ignore
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'

const posts = ref<any>([])
const postsStore = usePostsStore()
const router = useRouter()

let deleteModal: any = null
let currentPostId = ref<number>(0)

async function viewPost(post: any) {
  await router.push({ name: 'view-post', params: { postId: post.id } })
}

async function editPost(post: any) {
  await router.push({ name: 'edit-post', params: { postId: post.id } })
}

async function deletePostModal(post: any) {
  currentPostId.value = post.id
  deleteModal.toggle()
}

async function deletePost(postId: number) {
  await postsStore.deletePost(postId)
  deleteModal.hide()
}

onMounted(async () => {
  await postsStore.fetchPosts()
  posts.value = postsStore.getPosts
  deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {})
})
</script>

<template>
  <div>
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
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
            Are you sure to delete post <strong>#{{ currentPostId }}</strong
            >?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="deletePost(currentPostId)" type="button" class="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="view-posts">
      <button
        @click.prevent="router.push({ name: 'create-post' })"
        type="button"
        class="btn btn-primary mb-3 create-post-btn"
      >
        Create post
      </button>
      <div class="row row-cols-3 g-4">
        <div class="col" :key="post.id" v-for="post in postsStore.getPosts">
          <div class="card">
            <img src="https://placehold.co/600x400" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.body }}</p>
            </div>
            <div class="d-flex view-post-btn-container">
              <span><b>ID:</b> {{ post.id }}</span>
              <div class="view-post-btn-wrap">
                <button
                  @click.prevent="editPost(post)"
                  type="button"
                  class="btn btn-primary btn-sm"
                >
                  <i class="bi-pencil-fill"></i>
                </button>
                <button
                  @click.prevent="viewPost(post)"
                  type="button"
                  class="btn btn-secondary btn-sm ms-1"
                >
                  <i class="bi-eye-fill"></i>
                </button>
                <button
                  @click.prevent="deletePostModal(post)"
                  type="button"
                  class="btn btn-danger btn-sm ms-1"
                >
                  <i class="bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#deleteModal {
  .modal-title {
    font-size: 22px;
  }
  .modal-body {
    font-size: 16px;
  }
}
</style>
<style scoped lang="scss">
.view-posts {
  .card {
    height: 100%;
  }
  .view-post-btn-wrap {
    margin-left: auto;
  }
  .view-post-btn-container {
    padding: 16px 16px;
  }
}
</style>

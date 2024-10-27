<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { useRouter } from 'vue-router'

const posts = ref([])
const postsStore = usePostsStore()
const router = useRouter()

async function viewPost(post: any) {
  await router.push({ name: 'view-post', params: { postId: post.id } })
}

async function editPost(post: any) {
  await router.push({ name: 'edit-post', params: { postId: post.id } })
}

onMounted(async () => {
  await postsStore.fetchPosts()
  posts.value = postsStore.getPosts
})
</script>

<template>
  <div class="view-posts">
    <div class="row row-cols-3 g-4">
      <div class="col" v-for="post in posts">
        <div class="card">
          <img src="https://placehold.co/600x400" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.body }}</p>
          </div>
          <div class="d-flex view-post-btn-container">
            <span><b>ID:</b> {{ post.id }}</span>
            <div class="view-post-btn-wrap">
              <button @click.prevent="editPost(post)" type="button" class="btn btn-primary btn-sm">
                <i class="bi-pencil-fill"></i>
              </button>
              <button
                @click.prevent="viewPost(post)"
                type="button"
                class="btn btn-secondary btn-sm ms-1"
              >
                <i class="bi-eye-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

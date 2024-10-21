<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'

const posts = ref([])
const postsStore = usePostsStore()

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
          <div class="d-flex view-post-btn-wrap">
            <span><b>ID:</b> {{ post.id }}</span>
            <button type="button" class="btn btn-primary btn-sm view-post-btn">
              <i class="bi-eye-fill"></i>
            </button>
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
  .view-post-btn {
    margin-left: auto;
  }
  .view-post-btn-wrap {
    padding: 16px 16px;
  }
}
</style>

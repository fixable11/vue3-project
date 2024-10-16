<script setup lang="ts">
import CreatePost from '../components/post/CreatePost.vue'
</script>

<template>
  <div class="about">
    <CreatePost />
  </div>
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

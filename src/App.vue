<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import TestList from "./components/TestList.vue";
</script>

<template>
  <div class="flex h-screen">
    <div class="w-full">
      <div class="h-full">
        <Sidebar />
        <TestList />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  pageTransition: {
    name: 'rotate'
  }
});
</script>


<template>
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <SiteNavigation />
    <NuxtPage />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

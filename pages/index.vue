<script setup>

  const state = reactive({
    searchQuery: '',
    queryTimeout: null,
    searchResult: null,
    allItems: []
  })

  async function handleBlur(event) {
    event.preventDefault();
    
    state.allItems = await useWeatherApi().getSearchResults(state.queryTimeout, state.searchQuery)

    state.searchQuery = ''

    if (!state.searchQuery) {
      state.allItems = []
      return
    }
  }

</script>
<template>
  <main class="container mx-auto text-white px-4">
    <form class="pt-4 mb-8 relative">
      <input 
        type="text" 
        v-model="state.searchQuery"
        @keypress.enter="handleBlur"
        placeholder="Rechercher une ville ou un état"
        class="py-4 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
    </form>
  </main>
</template>

<style scoped>
input::placeholder {
  color: #ccc;
}

</style>
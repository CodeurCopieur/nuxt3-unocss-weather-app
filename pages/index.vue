<script setup>

  const state = reactive({
    searchQuery: '',
    searchResult: null,
    allItems: [],
    visible: false
  })

  async function handleBlur(event) {
    event.preventDefault();
    
    try{
      if (!state.searchQuery) {
        state.allItems = []
        state.visible = true
        return
      } else {
        state.allItems = await useWeatherApi().getSearchResults(state.searchQuery)

        setTimeout(()=> {
          const { data } = state.allItems;
          const res = data.features;
          state.searchResult = res
        }, 300)

        state.visible = false
      }
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
    

    // state.searchQuery = ''

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

        <ul 
          v-if="state.searchResult"
          class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
          <li 
            v-for="searchResult in state.searchResult" 
            :key="searchResult.id"
            class="py-2 cursor-pointer"> {{ searchResult.place_name }}</li>
        </ul>
    </form>

    <div v-if="state.visible" class="container mx-auto bg-red-100 border border-weather-tertiary text-weather-tertiary px-4 py-3 relative mt-4 text-center" role="alert">
      <p>Désolé, quelque chose s'est mal passé, veuillez réessayer</p>
    </div>
  </main>
</template>

<style scoped>
input::placeholder {
  color: #ccc;
}

</style>
<script setup>

  const state = reactive({
    searchQuery: '',
    searchResult: null,
    allItems: [],
    visible: null,
    messageError: ''
  })

  async function handleBlur(event) {
    event.preventDefault();

    if (state.searchQuery === '') {
        state.allItems = []
        state.searchResult = []
        state.visible = true
        state.messageError = "Désolé, quelque chose s'est mal passé, veuillez réessayer"

        return
      }  
      
      if(state.searchQuery !== '') {
        state.allItems = await useWeatherApi().getSearchResults(state.searchQuery)
        const { data } = state.allItems;
        const res = data.features;
        if (res) {
          state.visible = true
          state.searchResult = res
          state.messageError = `${state.searchResult.length} resultat${state.searchResult.length> 1 ? 's' : ''}`
        }
        

        if (res.length === 0) {
          state.visible = false
          state.messageError = "Aucun résultat ne correspond à votre requête, essayez un  terme différent."
        }
        
      }

  }
const getWeatherPageRoute = (res) => {
  const [city, state] = res.place_name.split(',')

  const decodedCity = decodeURIComponent(city.trim());
  const decodedState = decodeURIComponent(state.trim());
  return `/weather/city=${decodedCity.toLowerCase()}?lat=${res.geometry.coordinates[1]}&lng=${res.geometry.coordinates[0]}&preview=true`;
};

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
          v-if="state.searchResult && state.searchResult.length"
          class="bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px] z-50">
          <li 
            v-for="searchResult in state.searchResult" 
            :key="searchResult.id"
            class="py-2 cursor-pointer">
            <nuxt-link class="block" :to="getWeatherPageRoute(searchResult)">
            {{ searchResult.place_name }}
            </nuxt-link>
          </li>
        </ul>
    </form>

    <div v-if="state.visible === true  || state.visible === false && state.searchResult.length === 0" class="container mx-auto bg-red-100 border border-weather-tertiary text-weather-tertiary px-4 py-3 relative mt-4 text-center" role="alert">
      <p>{{ state.messageError }}</p>
    </div>
  </main>
</template>

<style scoped>
input::placeholder {
  color: #ccc;
}

</style>
<script setup>
  const state = reactive({
    savedCities: [],
    weatherData: null,
    isLoading: true
  })

  const { getWeatherData } = useWeatherApi()

  const getCities = async() => {
    if (localStorage.getItem('savedCities')) {
      state.savedCities = JSON.parse(localStorage.getItem('savedCities'))

      const requests = [];

      state.savedCities.forEach( city => {
        requests.push(getWeatherData(city.coords.lat, city.coords.lng, 'weather'))
      })

      state.weatherData = await Promise.all(requests)
      state.weatherData.forEach( (value, index) => {
        const {data} = value
        state.savedCities[index].temp = data.main.temp
        state.savedCities[index].temp_max = data.main.temp_max
        state.savedCities[index].temp_min = data.main.temp_min
        state.savedCities[index].description = data.weather[0].description
      })
    }
  };

  const goToCityView = (city) => {
    return `/weather/${city.name.toLowerCase()}?id=${city.id}&lat=${city.coords.lat}&lng=${city.coords.lng}`;
  }

  onMounted(async () => {
    await getCities()
    setTimeout(() => {
      state.isLoading = false;
  }, 1000);
  });
</script>
<template>
  <head>
    <Title>Page d'accueil - Nuxt 3 Weatheer App</Title>
    <Meta name="description" content="Bienvenue sur cet App Méteo recherche la météo de ta ville préférée :)" />
  </head>
  <template v-if="state.isLoading">
    <CityCardSkeleton v-for="(city, i) in state.savedCities" :key="i" />
  </template>
  <template v-else>
    <div v-for="city in state.savedCities" :key="city.id">
      <NuxtLink :to="goToCityView(city)">
        <CityCard :city="city"/>
      </NuxtLink>
    </div>

    <p v-if="state.savedCities.length === 0">
      Aucun emplacement ajouté. br
      pour commencer à suivre un emplacement, recherchez dans le champ ci-dessus
    </p>
  </template>
</template>

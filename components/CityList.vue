<script setup>
  const state = reactive({
    savedCities: [],
    weatherData: null
  })

  const { getWeatherData } = useWeatherApi()

  const getCities = async() => {
    if (localStorage.getItem('savedCities')) {
      state.savedCities = JSON.parse(localStorage.getItem('savedCities'))

      const requests = [];

      state.savedCities.forEach( city => {
        requests.push(getWeatherData(city.coords.lat, city.coords.lng))
      })
      state.weatherData = await Promise.all(requests)
      state.weatherData.forEach( (value, index) => {
        state.savedCities[index].value = value.data
      })
    }
  };

  onMounted(async () => {
    await getCities()
  });
</script>
<template>
  <div v-for="city in state.savedCities" :key="city.id">
    <CityCard />
  </div>
</template>

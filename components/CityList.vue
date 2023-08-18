<script setup>
  const state = reactive({
    savedCities: [],
    weatherData: null,
    data: {

    }
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
        state.savedCities[index].weather  = value.data
      })
    }
  };

  onMounted(async () => {
    await getCities()
  });
</script>
<template>
  <div v-for="city in state.savedCities" :key="city.id">
    <CityCard :city="city"/>
  </div>
</template>

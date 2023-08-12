<script setup>
  const route = useRoute();
  const {name} = route.params;
  const {lat, lng} = route.query;
  const state = reactive({
    currentTime: null,
    temp: null,
    feelsLike: null,
    description: null,
    icon: null
  });

  const convertToCelsius  = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
   };

   const { getWeatherData, translateWeatherDescription } = useWeatherApi()

  const getWeather = async() => {
    const wData = await getWeatherData(lat, lng)

    // cal current data & time
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = wData.data.current.dt * 1000 + localOffset
    wData.data.currentTime = utc + 1000 * wData.data.timezone_offset;

    // cal hourly weather offset
    wData.data.hourly.forEach( hour => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * wData.data.timezone_offset;
    })

    state.currentTime = wData.data.currentTime;
    state.temp = convertToCelsius(wData.data.current.temp);
    state.feelsLike = convertToCelsius(wData.data.current.feels_like);
    state.description = wData.data.current.weather[0].description;
    state.icon = wData.data.current.weather[0].icon;

    return wData
  }

  onMounted(async () => {

    if (!name || !lng || !lat) {
      useRouter().replace('/');
    } else {
      await getWeather()
    }

  });
</script>
<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div 
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>Vous êtes actuellement en train de prévisualiser cette ville, cliquez sur l'icône "+" pour commencer à suivre cette ville.</p>
    </div>
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2"> {{ name.toUpperCase() }}</h1>
      <p class="text-sm mb-12">
        {{ 
          new Date(state.currentTime).toLocaleDateString("fr-FR", 
          { weekday: "short", // Jour de la semaine complet
            year: "numeric", // Année au format numérique
            month: "long", // Mois complet
            day: "2-digit" // Jour du mois au format numérique
          })
        }}
        {{ 
          new Date(state.currentTime).toLocaleTimeString("fr-FR",
          {
            timeStyle: "short"
          })
        }}  
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(state.temp) }}&deg;
      </p>
        <p>
          Ressenti
          {{ Math.round(state.feelsLike) }}&deg;
        </p>
        <p class="capitalize">
          {{ translateWeatherDescription(state.description)  }}
        </p>
        <img 
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${state.icon}@2x.png`" alt="">
    </div>
  </div>
</template>


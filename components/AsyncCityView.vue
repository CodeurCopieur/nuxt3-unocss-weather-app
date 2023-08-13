<script setup>
  const route = useRoute();
  const {name} = route.params;
  const {lat, lng} = route.query;
  const state = reactive({
    currentTime: null,
    temp: null,
    feelsLike: null,
    description: null,
    icon: null,
    hourly: null
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
    state.hourly = wData.data.hourly;

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

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Météo horaire -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Météo horaire</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div 
            class="flex flex-col gap-4 items-center"
            v-for="data in state.hourly" :key="data.dt">
            <p class="whitespace-nowrap text-md">
              {{ 
                new Date(data.currentTime).toLocaleTimeString("fr-FR",
                {
                  hour: "numeric"
                })
              }}
            </p>
            <img 
              class="h-[45px] w-auto object-cover"
              :src="`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`" alt="">
            <p class="text-xl">
              {{ Math.round(convertToCelsius(data.temp)) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    
  </div>
</template>


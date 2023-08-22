<script setup>
  const route = useRoute();
  const router = useRouter();

  const {name} = route.params;
  const {lat, lng} = route.query;

  const state = reactive({
    currentTime: null,
    temp: null,
    feelsLike: null,
    description: null,
    icon: null,
    hourly: null,
    daily: null,
    isLoading: true
  });

   const { getWeatherData, translateWeatherDescription, convertToCelsius } = useWeatherApi()

  const getWeather = async() => {
    const wData = await getWeatherData(lat, lng, 'onecall')

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
    state.daily = wData.data.daily;

    return wData
  }

  const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities'))
    const updatedCities = cities.filter( city => city.id !== route.query.id)

    localStorage.setItem('savedCities', JSON.stringify(updatedCities))

    router.replace('/')
  }

  onMounted(async () => {

    if (!name || !lng || !lat) {
      useRouter().replace('/');
    } else {
      await getWeather()
      setTimeout(() => {
      state.isLoading = false;
  }, 1000);
    }

  });
</script>
<template>
  <head>
    <Title>{{ name.toUpperCase()  }} - {{ Math.round(state.temp) }}&deg; - Nuxt 3 Weatheer App</Title>
    <Meta name="description" :content="`${translateWeatherDescription(state.description)} ${Math.round(state.temp)}&deg;`" />
  </head>
  <template v-if="!state.isLoading">
    <div class="flex flex-col flex-1 items-center">
      <!-- Banner -->
      <div 
        v-if="route.query.preview"
        class="text-white p-4 bg-weather-secondary w-full text-center">
        <p>Vous êtes actuellement en train de prévisualiser cette ville, cliquez sur l'icône "+" pour commencer à suivre cette ville.</p>
      </div>

      <!-- Aperçu météo -->
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

      <!-- Météo hebdomadaire -->
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">Prévisions à 7 jours</h2>
          <div 
            class="flex items-center"
            v-for="day in state.daily" 
            :key="day.dt">
            <p class="flex-1">
              {{ 
                new Date(day.dt * 1000).toLocaleDateString("fr-FR",
                {
                  weekday: "long",
                })
              }}
            </p>
            <img 
                class="h-[50px] w-[50px] object-cover"
                :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt= />
            <div class="flex gap-2 flex-1 justify-end">
              <p>H: {{ Math.round(convertToCelsius(day.temp.max)) }}</p>
              <p>B: {{ Math.round(convertToCelsius(day.temp.min)) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div 
        class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
        @click="removeCity">
        <Icon 
          name="mdi-light:delete" 
          class="text-xl hover:text-weather-secondary duration-150 cursor-pointer" />
        <p>Supprimer la ville</p>
      </div>
    </div>
  </template>
  <template v-else>
    <CityViewSkeleton />
  </template>
</template>


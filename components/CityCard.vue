<script setup>
  const props = defineProps({
    city: {
      type: Object,
      default: ()=> {}
    },
    
  });
  const { convertToCelsius, translateWeatherDescription } = useWeatherApi();

  const { city } = props;
</script>
<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.name }}</h2>
      <h3>{{ translateWeatherDescription(city.description) }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ Math.round(convertToCelsius(city.temp)) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          H: {{ Math.round(convertToCelsius(city.temp_max)) }}&deg;
        </span>
        <span class="text-xs">
          B: {{ Math.round(convertToCelsius(city.temp_min)) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>


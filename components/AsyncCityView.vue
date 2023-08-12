<script setup>
  const router = useRoute();
  const {name} = router.params;
  const {lat, lng} = router.query;

  const getWeather = async() => {
    const wData = await useWeatherApi().getWeatherData(lat, lng)

    // cal current data & time
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = wData.data.current.dt * 1000 + localOffset
    wData.data.currentTime = utc + 1000 * wData.data.timezone_offset;

    // cal hourly weather offset
    wData.data.hourly.forEach( hour => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * wData.data.timezone_offset;
    })
    console.log(wData.data, localOffset, utc);

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
 
</template>


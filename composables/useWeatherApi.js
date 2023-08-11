import axios from 'axios';

export default () => {

  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;
  const baseUrl2 = config.public.baseUrl2;
  const apiKey = config.public.currencyKey;
  const apiKey2 = config.public.currencyKey2;

  const state = reactive({res: null});

  const getSearchResults = async(searchQ) => {
      if (searchQ !== "") {
        state.res = await axios.get(`${baseUrl}${searchQ}.json?access_token=${apiKey}`)
      }
      return state.res
  }

  const getWeatherData = async(lat, lng) => {
    try {
      const weatherData = await axios.get(`${baseUrl2}?lat=${lat}&lon=${lng}&exclude={part}&appid=${apiKey2}&units=imperial`)

      return weatherData
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getSearchResults,
    getWeatherData
  }
}
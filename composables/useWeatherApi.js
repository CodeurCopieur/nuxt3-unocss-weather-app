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

  const translateWeatherDescription = (description) => {
    switch (description) {
      case 'clear sky':
        return 'ciel dégagé';
      case 'few clouds':
        return 'quelques nuages';
      case 'cloudy':
        return 'nuageux';
      case 'partly cloudy':
        return 'partiellement nuageux';
      case 'scattered clouds':
        return 'nuages épars';
      case 'overcast':
        return 'couvert';
      case 'light rain':
        return 'pluie légère';
      case 'moderate rain':
        return 'pluie modérée';
      case 'heavy rain':
        return 'pluie forte';
      case 'showers':
        return 'averses';
      case 'light snow':
        return 'neige légère';
      case 'moderate snow':
        return 'neige modérée';
      case 'heavy snow':
        return 'neige forte';
      case 'thunderstorms':
        return 'orages';
      case 'fog':
        return 'brouillard';
      case 'strong wind':
        return 'vent fort';
      default:
        return description;
    }
  }

  return {
    getSearchResults,
    getWeatherData,
    translateWeatherDescription
  }
}
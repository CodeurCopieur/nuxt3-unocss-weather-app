import axios from 'axios';

export default () => {

  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;
  const baseUrl2 = config.public.baseUrl2;
  const apiKey = config.public.currencyKey;
  const apiKey2 = config.public.currencyKey2;

  const state = reactive({res: null, weatherData: null });

  const getSearchResults = async(searchQ) => {
      if (searchQ !== "") {
        state.res = await axios.get(`${baseUrl}${searchQ}.json?access_token=${apiKey}`)
      }
      return state.res
  }

  const getWeatherData = async(lat, lng, word) => {
    try {

      if (word === 'onecall') {
        state.weatherData = await axios.get(`${baseUrl2+word}?lat=${lat}&lon=${lng}&exclude={part}&appid=${apiKey2}&units=imperial`)

      } else if(word === 'weather') {
        state.weatherData = await axios.get(`${baseUrl2+word}?lat=${lat}&lon=${lng}&appid=${apiKey2}&units=imperial`)
      }
      
      return state.weatherData

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
        return 'vent fort';case 'clear sky':
        return 'ciel dégagé';
      case 'few clouds':
        return 'quelques nuages';
      case 'scattered clouds':
        return 'nuages épars';
      case 'broken clouds':
        return 'nuages fragmentés';
      case 'overcast clouds':
        return 'ciel couvert';
      case 'mist':
        return 'brume';
      case 'smoke':
        return 'fumée';
      case 'haze':
        return 'brume légère';
      case 'sand':
        return 'sable';
      case 'dust':
        return 'poussière';
      case 'fog':
        return 'brouillard';
      case 'sand/ dust whirls':
        return 'tourbillons de sable/poussière';
      case 'squalls':
        return 'rafales de vent';
      case 'tornado':
        return 'tornade';
      case 'rain':
        return 'pluie';
      case 'light rain':
        return 'pluie légère';
      case 'moderate rain':
        return 'pluie modérée';
      case 'heavy intensity rain':
        return 'pluie forte';
      case 'very heavy rain':
        return 'pluie très forte';
      case 'extreme rain':
        return 'pluie extrême';
      case 'drizzle':
        return 'bruine';
      case 'freezing rain':
        return 'pluie verglaçante';
      case 'shower rain':
        return 'averses de pluie';
      case 'rain and snow':
        return 'pluie et neige';
      case 'snow':
        return 'neige';
      case 'light snow':
        return 'neige légère';
      case 'heavy snow':
        return 'neige forte';
      case 'sleet':
        return 'grésil';
      case 'shower sleet':
        return 'averses de grésil';
      case 'snow and rain':
        return 'neige et pluie';
      case 'shower snow':
        return 'averses de neige';
      case 'thunderstorm':
        return 'orage';
      case 'thunderstorm with light rain':
        return 'orage avec pluie légère';
      case 'thunderstorm with rain':
        return 'orage avec pluie';
      case 'thunderstorm with heavy rain':
        return 'orage avec pluie forte';
      case 'thunderstorm with light drizzle':
        return 'orage avec bruine légère';
      case 'thunderstorm with drizzle':
        return 'orage avec bruine';
      case 'thunderstorm with heavy drizzle':
        return 'orage avec forte bruine';
      default:
        return description;
    }
  }

  const convertToCelsius  = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
   };

  return {
    getSearchResults,
    getWeatherData,
    translateWeatherDescription,
    convertToCelsius
  }
}
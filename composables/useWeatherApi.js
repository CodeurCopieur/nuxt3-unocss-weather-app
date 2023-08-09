import axios from 'axios';

export default () => {

  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;
  const apiKey = config.public.currencyKey;

  const state = reactive({res: null});

  const getSearchResults = async(searchQ) => {

      if (searchQ !== "") {
        state.res = await axios.get(`${baseUrl}${searchQ}.json?access_token=${apiKey}`)

      }
      return state.res
  }
  return {
    getSearchResults
  }
}
import axios from 'axios';

export default () => {

  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;
  const apiKey = config.public.currencyKey;

  const state = reactive({res: null});

  const getSearchResults = async(queryT, searchQ) => {
    clearTimeout(queryT)
    queryT = setTimeout( async()=> {
      if (searchQ !== "") {
        state.res = await axios.get(`${baseUrl}${searchQ}.json?access_token=${apiKey}`)
        const { res } = state

        return res.data
      }
    }, 300)
  }
  return {
    getSearchResults
  }
}
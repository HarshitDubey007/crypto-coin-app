import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '9e9ec062efmsh16a5fb3c3744350p1c466fjsnffa3e02dc0aa'
  }

  const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news'
  
  const createRequest  = (url) => ({ url, headers: cryptoNewsHeaders})

  export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory,count}) => createRequest(`/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})


export const { useGetCryptoNewsQuery } = cryptoNewsApi;




// import axios from "axios"



// const cryptoNewsHeaders = {
//         'x-bingapis-sdk': 'true',
//         'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
//         'x-rapidapi-key': '9e9ec062efmsh16a5fb3c3744350p1c466fjsnffa3e02dc0aa'
//       }
// const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news'
// const createRequest  = (url) => ({ url, headers: cryptoNewsHeaders})

// const fetchData = () => {
// return axios.get(baseUrl, cryptoNewsHeaders)
//       .then((response) => console.log(response.data));}

//       export const cryptoNewsApi = createApi({
            
//             endpoints: (builder) => ({
//                 getCryptoNews: builder.query({
//                     query: ( newsCategory, count) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
//                 })
//             })
//         })
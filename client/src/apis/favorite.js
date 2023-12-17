import axios from 'axios';

const GF_API_KEY = import.meta.env.VITE_GF_API_KEY;
const GF_AFFILIATE_CODE = import.meta.env.VITE_GF_AFFILIATE_CODE;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function createFavorite({email, gameId, type}) {
  const endPoint = SERVER_URL + `/api/favorite/create`

  const headers = {
    'GF-API-KEY': GF_API_KEY,
    'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
    'Content-Type': 'application/json'
  }
  const options = {
    headers: headers,
    withCredentials: true
  }
  
  try {
    const res = await axios.post(endPoint, {
      email, gameId, type
    }, options);
    if(res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }
    
    return {
      success: false,
      data: "Api Error"
    }
  } catch( err ) {
    if(err.response && err.response.request.status == 400)
      return {
        success: false,
        data: err.response.data
      }
    return {
      success: false,
      data: {
        'message': "Bad Internet Connection"
      }
    }
  }
}

export async function deleteFavorite({email, gameId, type}) {
  const endPoint = SERVER_URL + `/api/favorite/delete`

  const headers = {
    'GF-API-KEY': GF_API_KEY,
    'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
    'Content-Type': 'application/json'
  }
  const options = {
    headers: headers,
    withCredentials: true
  }
  
  try {
    const res = await axios.post(endPoint, {
      email, gameId, type
    }, options);
    if(res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }
    
    return {
      success: false,
      data: "Api Error"
    }
  } catch( err ) {
    if(err.response && err.response.request.status == 400)
      return {
        success: false,
        data: err.response.data
      }
    return {
      success: false,
      data: {
        'message': "Bad Internet Connection"
      }
    }
  }
}
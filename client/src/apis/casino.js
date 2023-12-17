import axios from 'axios';

const GF_API_KEY = import.meta.env.VITE_GF_API_KEY;
const GF_AFFILIATE_CODE = import.meta.env.VITE_GF_AFFILIATE_CODE;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function getCasinoList({title, type, page, sort, limit, email}) {
  const endPoint = SERVER_URL + `/api/casino/list?title=${title}&type=${type}&page=${page}&sort=${sort}&limit=${limit}&email=${email}`

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
    const res = await axios.get(endPoint, {}, options);
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

export async function getCasinoInfo(idx) {
  const endPoint = SERVER_URL + `/api/casino/info?id=${idx}`
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
    const res = await axios.get(endPoint, {}, options);
    if(res.status == 200) {
      return res.data
    }
    
    if(err.response && err.response.request.status == 400) {
      return err.response.data
    }
  } catch (err) {
    return {
      data: {
        // 'message': "Bad Internet Connection"
        'message': err
      }
    }
  }
}

export async function LaunchCasino(idx, nick) {
  const endPoint = SERVER_URL + `/api/casino/launch?id=${idx}&nick=${nick}`
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
    const res = await axios.get(endPoint, {}, options);
    if(res.status == 200) {
      return res.data
    }
    
    if(err.response && err.response.request.status == 400) {
      return err.response.data
    }
  } catch (_) {
    return {
      data: {
        'message': "Bad Internet Connection"
      }
    }
  }
}

export async function getBetResult(page, search) {
  const endPoint = SERVER_URL + '/api/casino/bet-result'
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
    const res = await axios.get(endPoint, {}, options);
    if(res.status == 200) {
      return res.data
    }
    
    if(err.response && err.response.request.status == 400) {
      return err.response.data
    }
  } catch (_) {
    return {
      data: {
        'message': "Bad Internet Connection"
      }
    }
  }
}

export async function getTypes() {
  const endPoint = SERVER_URL + '/api/casino/type'
  
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
    const res = await axios.get(endPoint, {}, options);
    if(res.status == 200) {
      return res.data
    }
    
    if(err.response && err.response.request.status == 400) {
      return err.response.data
    }
  } catch (_) {
    return {
      data: {
        'message': "Bad Internet Connection"
      }
    }
  }
}

export async function getVendors() {
  const endPoint = SERVER_URL + '/api/casino/vendor'
  
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
    const res = await axios.get(endPoint, {}, options);
    if(res.status == 200) {
      return res.data
    }
    
    if(err.response && err.response.request.status == 400) {
      return err.response.data
    }
  } catch (_) {
    return {
      data: {
        'message': "Bad Internet Connection"
      }
    }
  }
}
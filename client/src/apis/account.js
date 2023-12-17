import axios from 'axios';

const GF_API_KEY = import.meta.env.VITE_GF_API_KEY;
const GF_AFFILIATE_CODE = import.meta.env.VITE_GF_AFFILIATE_CODE;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ADMIN_IDX = import.meta.env.VITE_ADMIN_IDX;

export async function getAccessToken() {
  try {
    const res = await axios.post(SERVER_URL + '/api/account/sign-in/success', {
    }, {
      headers: {
        'GF-API-KEY': GF_API_KEY,
        'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if (res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }

    return {
      success: false,
      data: "Api Error"
    }
  } catch (err) {
    if (err.response && err.response.request.status == 400)
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

export async function getRefreshToken() {
  try {
    const res = await axios.post(SERVER_URL + '/api/account/sign-in/refresh', {
    }, {
      headers: {
        'GF-API-KEY': GF_API_KEY,
        'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if (res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }

    return {
      success: false,
      data: "Api Error"
    }
  } catch (err) {
    if (err.response && err.response.request.status == 400)
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

export async function signIn({ email, password }) {
  try {
    const res = await axios.post(SERVER_URL + '/api/account/sign-in', {
      email,
      password
    }, {
      headers: {
        'GF-API-KEY': GF_API_KEY,
        'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    if (res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }

    return {
      success: false,
      data: "Api Error"
    }
  } catch (err) {
    if (err.response && err.response.request.status == 400)
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

export async function signupSocial({ email, password }) {
  try {
    const res = await axios.post(SERVER_URL + '/api/account/social/sign-up', {
      admin_idx: ADMIN_IDX,
      email, password
    }, {
      headers: {
        'GF-API-KEY': GF_API_KEY,
        'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
        'Content-Type': 'application/json'
      }
    });
    if (res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }

    return {
      success: false,
      data: "Api Error"
    }
  } catch (err) {
    if (err.response && err.response.request.status == 400)
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

export async function signOut() {
  try {
    const res = await axios.post(SERVER_URL + '/api/account/sign-out', {}, {
      headers: {
        'GF-API-KEY': GF_API_KEY,
        'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }
    return {
      success: false,
      data: "Sign in Failed"
    }
  } catch (err) {
    if (err.response && err.response.request.status == 400)
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

export async function changeProfileImage({ customerIdx, profileImage }) {
  try {
    const res = await axios.post(SERVER_URL + '/api/account/profile/image', {
      customerIdx,
      profileImage
    }, {
      headers: {
        'GF-API-KEY': GF_API_KEY,
        'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    if (res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }
    /// add more case here.
    return {
      success: false,
      data: "Sign in Failed"
    }
  } catch (err) {
    if (err.response && err.response.request.status == 400)
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

export async function changeNickname({ customerIdx, nick }) {
  try {
    const res = await axios.post(SERVER_URL + '/api/account/profile/nick', {
      customerIdx,
      nick
    }, {
      headers: {
        'GF-API-KEY': GF_API_KEY,
        'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    if (res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }
    /// add more case here.
    return {
      success: false,
      data: "Sign in Failed"
    }
  } catch (err) {
    if (err.response && err.response.request.status == 400)
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

export async function sendEmail({email}) {
  try {
    const res = await axios.post(SERVER_URL + '/api/account/email', {
      email
    }, {
      headers: {
        'GF-API-KEY': GF_API_KEY,
        'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if (res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }

    return {
      success: false,
      data: "Api Error"
    }
  } catch (err) {
    if (err.response && err.response.request.status == 400)
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

export async function authCodeCheck({authCode}) {
  try {
    const res = await axios.post(SERVER_URL + '/api/account/auth-code', {
      authCode
    }, {
      headers: {
        'GF-API-KEY': GF_API_KEY,
        'GF-AFFILIATE-CODE': GF_AFFILIATE_CODE,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if (res.status == 200) {
      return {
        success: true,
        data: res.data
      }
    }

    return {
      success: false,
      data: "Api Error"
    }
  } catch (err) {
    if (err.response && err.response.request.status == 400)
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
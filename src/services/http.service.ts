import Axios from 'axios'

const BASE_URL =
  import.meta.env.MODE === 'production' ? '/api' : '//localhost:3030/api'

const axios = Axios.create({
  withCredentials: true,
})

export const httpService = {
  get<T>(endpoint: string, data?: T) {
    return ajax(endpoint, 'GET', data)
  },
  post<T>(endpoint: string, data?: T) {
    return ajax(endpoint, 'POST', data)
  },
  put<T>(endpoint: string, data?: T) {
    return ajax(endpoint, 'PUT', data)
  },
  delete<T>(endpoint: string, data?: T) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data: any = null
) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    })
    return res.data
  } catch (err: any) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )
    console.dir(err)
    if (err.response && err.response.status === 401) {
      sessionStorage.clear()
    }
    throw err
  }
}

import axios from 'axios'

let defaultData = {
  uid: '',
  token: '',
  timestamp: ''
}

export function setToken(data) {
  defaultData = {
    ...defaultData,
    ...data
  }
}

let baseUrl = 'http://localhost:9093'

axios.defaults.timeout = 20000

export default class HttpUtils {

  static get(url) {
    url = baseUrl + url
    return axios.get(url).then(response => response.data)
  }

  static post(url, data) {
    url = baseUrl + url

    data = {
      ...defaultData,
      ...data
    }

    console.log(data)
    return axios.post(url, data)
      .then(response => response.data)
      .catch(error => console.dir(error))
  }
}

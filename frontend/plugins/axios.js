export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers.client = localStorage.getItem('client')
    config.headers['access-token'] = localStorage.getItem('access-token')
    config.headers.uid = localStorage.getItem('uid')
    config.headers['token-type'] = localStorage.getItem('token-type')
    config.headers.expiry = window.localStorage.getItem('expiry')
    console.log(config)
  })

  $axios.onResponse((response) => {
    $axios.setHeader('Access-Control-Allow-Origin', '*')
    console.log(response)
    if (response.headers.client) {
      localStorage.setItem('access-token', response.headers['access-token'])
      localStorage.setItem('client', response.headers.client)
      localStorage.setItem('uid', response.headers.uid)
      localStorage.setItem('token-type', response.headers['token-type'])
      localStorage.setItem('expiry', response.headers.expiry)
    }
  })
}

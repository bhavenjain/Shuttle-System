import Axios from 'axios'

const api = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// GET REQUESTS
export const getLocationsApi = () => api.get('/api/getLocations')
export const getBusesApi = () => api.get('/api/getbuses')

// POST REQUESTS
export const addBusesApi = (data) => api.post('/api/addBus', data)
export const addLocationsApi = (data) => api.post('/api/addLocation', data)

export default api

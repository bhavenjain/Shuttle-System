import Axios from 'axios'

const api = Axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Get REQUESTS
export const getLocationsApi = () => api.get('/api/getLocations')
export const getBusesApi = () => api.get('/api/getbuses')

// Post REQUESTS
export const addBusesApi = data => api.post('/api/addBus', data)
export const addLocationsApi = data => api.post('/api/addLocation', data)
export const addBookingApi = data => api.post('/api/addbooking', data)
export const reserveSeatApi = data => api.post('/api/reserveseat', data)

export default api

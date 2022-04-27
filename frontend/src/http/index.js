import Axios from 'axios'

const api = Axios.create({
  baseURL: "https://asia-south1-shuttle-booking-28033.cloudfunctions.net",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Get REQUESTS
export const getLocationsApi = () => api.get('/location-getLocations')
export const getBusesApi = () => api.get('/bus-getBuses')

// Post REQUESTS
export const addBusesApi = data => api.post('/bus-addBus', data)
export const addLocationsApi = data => api.post('/location-addLocation', data)
// export const addBookingApi = data => api.post('/api/addbooking', data)
// export const reserveSeatApi = data => api.post('/api/reserveseat', data)

export default api

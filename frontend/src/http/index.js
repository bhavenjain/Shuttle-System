import Axios from 'axios'


export const handleGetApi = async (url) => {
  // let token = null;
  // if (firebase.auth().currentUser) {
  //   token = await firebase.auth().currentUser.getIdToken();
  // }
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;",
      Accept: "application/json;",
      // Authorization: "Bearer " + token,
    },
  };
  console.log("Get call started...");
  try {
    return await fetch(url, requestOptions).then((response) =>
      response
        .json()
        .then((res) => res)
        .catch((err) => console.error(err))
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const handlePostApi = async (url, body) => {
  // let token = null;
  // if (firebase.auth().currentUser) {
  //   token = await firebase.auth().currentUser.getIdToken();
  // }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json;",
      // Authorization: "Bearer " + token,
    },
    body: body,
  };
  console.log("post call started...");
  try {
    return await fetch(url, requestOptions).then((response) =>
      response
        .json()
        .then((res) => res)
        .catch((err) => console.log(err))
    );
  } catch (error) {
    console.log(error);
  }
};


const api = Axios.create({
  baseURL: "https://asia-south1-shuttle-booking-28033.cloudfunctions.net",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Get REQUESTS
export const getLocationsApi = () => api.get('/location-getLocations')
export const getBusesApi = (query) => api.get(`/bus-getBuses${query}`)

// Post REQUESTS
export const addBusesApi = data => api.post('/api/addbus', data)
export const addLocationsApi = data => api.post('/location-updateLocation', data)
export const addBookingApi = data => api.post('/api/addbooking', data)
export const reserveSeatApi = data => api.post('/api/reserveseat', data)

export default api

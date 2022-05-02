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
  console.log(url);
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


// const api = Axios.create({
//   // baseURL: "https://asia-south1-shuttle-booking-28033.cloudfunctions.net",
//   baseUrl: "http://localhost:5001/shuttle-booking-28033/asia-south1",
//   withCredentials: false,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   }
// })

// Get REQUESTS
const baseURL = process.env.REACT_APP_API_URL;
export const getLocationsApi = () => handleGetApi(`${baseURL}/location-getLocations`);
export const getBusesApi = (query) => handleGetApi(`${baseURL}/bus-getBuses${query}`);
export const deleteBusApi = (query) => handleGetApi(`${baseURL}/bus-deleteBus`);
// Post REQUESTS
// export const createUserApi = data => handlePostApi(`${baseURL}/user-create`, data);
export const loginUserApi = data => handlePostApi(`${baseURL}/user-login`, data);
export const addBusesApi = data => handlePostApi(`${baseURL}/bus-addBus`, data);
export const updateBusApi = data => handlePostApi(`${baseURL}/bus-updateBus`, data);
export const addLocationsApi = data => handlePostApi(`${baseURL}/location-updateLocation`, data)
export const addBookingApi = data => handlePostApi(`${baseURL}/booking-create`, data)
export const reserveSeatApi = data => handlePostApi(`${baseURL}/api/reserveseat`, data)

// export default api

import axios from "axios";

const BASE_URL = 'http://192.168.10.114:3000';

const get = (endpoint, params = undefined) => {
  return axios.get(BASE_URL + endpoint, {
    params: params,
  });
};

const post = (endpoint, data) => {
  return axios.post(BASE_URL + endpoint, data);
};

const coordsFromPostal = (postal) => {
  return get("/coords", { postal : postal });
};

const postFeedback = (feedback) => {
  return post("/lots/feedback", { feedback: feedback });
};

const getFeedback = (id) => {
    return get('/lots/retrievefeedback', { id: id })
};

const getCP = (carparkId) => {
  return get("/lots", { ppcode: carparkId });
};

const getCPLevel = (carparkId, levelId) => {
  return get("/lots/level", {
    ppcode: carparkId,
    level: levelId,
  });
};

const getCPVacant = (carparkId) => {
  return get("/lots/vacant", { ppcode: carparkId });
};

const getCPOccupied = (carparkId) => {
  return get("/lots/occupied", { ppcode: carparkId });
};

const markOccupied = (lotId) => {
  return post("/lots/occupy", { id: lotId });
};

const markVacant = (lotId) => {
  return post("/lots/vacate", { id: lotId });
};

const setLicenseplate = ({ id, licenseplate }) => {
  post("/lots/setlicenseplate", { id: id, platenumber: licenseplate });
};

const allCPs = () => {
  return get("/carparks");
};

const searchCPPostal = (postal) => {
  return get("/carparks/search", { postal: postal });
};

const searchCPCoords = (coords) => {
  return get("/carparks/search", { coords: coords });
};

export {
  coordsFromPostal,
  getCP,
  getCPLevel,
  getCPOccupied,
  getCPVacant,
  markOccupied,
  markVacant,
  allCPs,
  searchCPPostal,
  searchCPCoords,
  postFeedback,
  getFeedback,
  setLicenseplate,
};

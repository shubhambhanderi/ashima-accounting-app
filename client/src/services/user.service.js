import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/";
const API_uri = "http://localhost:4000/";

const getPartylist = () => {
  return axios.get(API_URL + "as2020/listofparties", { headers: authHeader() });
};

const getPartydata = (partyName, brokerName) => {
  return axios.get(API_URL + `as2020/partydata/${partyName}/${brokerName}`, { headers: authHeader() });
};

const getAllPartiesdata = (partyName, brokerName) => {
  return axios.get(API_URL + `as2020/partydata`, { headers: authHeader() });
};

const pythonPDFSerivce = (data) => {

  return axios.post(API_uri + `file-downloads`, data);
}

// const createPDFdetail = (data, party, broker) => {
//   let postData = {
//     data: data,
//     party: party,
//     broker: broker
//   };
//   return axios.post(API_URL + `as2020/create-pdf`, postData, { headers: authHeader() })
// }

// const getPDFdetail = () => {
//   return axios.get(API_URL + `as2020/fetch-pdf`, { headers: authHeader() }, { responseType: 'blob' },)
// }

// const createPDFplist = (data, party, broker) => {
//   let postData = {
//     data: data,
//     party: party,
//     broker: broker
//   };
//   return axios.post(API_URL + `as2020/create-pdf-s`, postData, { headers: authHeader() })
// }

// const getPDFplist = () => {
//   return axios.get(API_URL + `as2020/fetch-pdf-s`, { headers: authHeader() }, { responseType: 'blob' },)
// }

export default {
  getPartylist,
  getPartydata,
  getAllPartiesdata,
  pythonPDFSerivce,
  // createPDFdetail,
  // getPDFdetail,
  // createPDFplist,
  // getPDFplist
};
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://ashima-accounting-node.herokuapp.com/api/";
const API_uri = "https://temp-testing-app.herokuapp.com/";

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

  return axios.post(API_uri, data, { responseType: 'blob' });
}

export default {
  getPartylist,
  getPartydata,
  getAllPartiesdata,
  pythonPDFSerivce,
};
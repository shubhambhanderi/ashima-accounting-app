import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/";

const getPartylist = () => {
  return axios.get(API_URL + "as2020/listofparties", { headers: authHeader() });
};

const getPartydata = (partyName, brokerName) => {
  return axios.get(API_URL + `as2020/partydata/${partyName}/${brokerName}`, { headers: authHeader() });
};

export default {
  getPartylist,
  getPartydata,
};
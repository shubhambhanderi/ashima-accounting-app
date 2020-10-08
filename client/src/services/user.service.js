import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://ashima-accounting-node.herokuapp.com/api/";
const API_uri = "https://temp-testing-app.herokuapp.com/";
const request = require('request');

const getPartylist = async () => {
  // return axios.get(API_URL + "as2020/listofparties", { headers: authHeader() });

  //Another Method
  const options = {
    url: API_URL + "as2020/listofparties",
    headers: authHeader(),
  };

  let promise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });

  return await promise;
};

const getPartydata = (partyName, brokerName) => {
  return axios.get(API_URL + `as2020/partydata/${partyName}/${brokerName}`, { headers: authHeader() });
};

const getAllPartiesdata = async (partyName, brokerName) => {
  // return axios.get(API_URL + `as2020/partydata`, { headers: authHeader() });

  //Another Method
  const options = {
    url: API_URL + `as2020/partydata`,
    headers: authHeader(),
  };

  let promise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });

  return await promise;
};

const pythonPDFSerivce = (data) => {
  return axios.post(API_uri, data, { responseType: 'blob' });
};

const getDailyReport = async () => {
  // return axios.get(API_URL + "as2020/dailyreport", { headers: authHeader() });

  // Another Method
  const options = {
    url: API_URL + `as2020/dailyreport`,
    headers: authHeader(),
  };

  let promise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });

  return await promise;
};

const getBeamStock = async () => {
  //return axios.get(API_URL + "as2020/beamstock", { headers: authHeader() });

  //Another Method
  const options = {
    url: API_URL + `as2020/beamstock`,
    headers: authHeader(),
  };

  let promise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });

  return await promise;
}

const getWorpingMeter = async () => {
  //return axios.get(API_URL + "as2020/worpingmeter", { headers: authHeader() });

  //Another Method
  const options = {
    url: API_URL + `as2020/worpingmeter`,
    headers: authHeader(),
  };

  let promise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });

  return await promise;
}

const getStockReport = async () => {
  // return axios.get(API_URL + "as2020/stockreport", { headers: authHeader() });

  //Another Method
  const options = {
    url: API_URL + `as2020/stockreport`,
    headers: authHeader(),
  };

  let promise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });

  return await promise;
}

const getReport = async () => {
  //return axios.get(API_URL + "as2020/report", { headers: authHeader() });

  //Another Method
  const options = {
    url: API_URL + `as2020/report`,
    headers: authHeader(),
  };

  let promise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });

  return await promise;
}

const getDate = async () => {
  // return axios.get(API_URL + "as2020/metadata", { headers: authHeader() });

  //Another Method
  const options = {
    url: API_URL + `as2020/metadata`,
    headers: authHeader(),
  };

  let promise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });

  return await promise;
}

const getData = async () => {
  //Date
  try {
    const response = await getDate();
    localStorage.setItem("date", JSON.stringify(response[0].backupName));
  } catch (error) {
    const _content =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.setItem("date", JSON.stringify(_content));
  }

  //Partylist
  try {
    const response = await getPartylist();
    localStorage.setItem("partyName", JSON.stringify(response.sort((a, b) => (a._id.partyName.localeCompare(b._id.partyName)))));
  } catch (error) {
    const _content =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.setItem("partyName", JSON.stringify(_content));
  }

  //Partylist
  try {
    const response = await getAllPartiesdata()
    localStorage.setItem("parties", JSON.stringify(response));
  } catch (error) {
    const _content =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.setItem("parties", JSON.stringify(_content));
  }

  //Daily Report
  try {
    const response = await getDailyReport()
    localStorage.setItem("DRdetail", JSON.stringify(response.sort((a, b) => (a.key.localeCompare(b.key)))));
  } catch (error) {
    const _content =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.setItem("DRdetail", JSON.stringify(_content));
  }

  //Warping Report
  try {
    const response = await getBeamStock()
    var temp = {};
    response.forEach((e, i) => {
      temp[e.QualityCode] = e.beamStockData.reduce((T, c) => (T + Number(c.Meter)), 0)
    })
    // console.log(temp)
    localStorage.setItem("beam", JSON.stringify(temp));
    try {
      const response = await getWorpingMeter();
      localStorage.setItem("WMDetail", JSON.stringify(response.sort((a, b) => (a.quality.localeCompare(b.quality)))));
    } catch (error) {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.setItem("WMDetail", _content);
    }
  } catch (error) {
    const _content =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.setItem("beam", JSON.stringify(_content));
  }

  //Beam Stock
  try {
    const response = await getBeamStock()
    localStorage.setItem("BSdetail", JSON.stringify(response.sort((a, b) => (a.QualityCode.localeCompare(b.QualityCode)))));
  } catch (error) {
    const _content =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.setItem("BSdetail", JSON.stringify(_content));
  }

  //Stock Report
  try {
    const response = await getStockReport()
    localStorage.setItem("SRDetail", JSON.stringify(response.sort((a, b) => (a.qualityCode.localeCompare(b.qualityCode)))));
  } catch (error) {
    const _content =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.setItem("SRDetail", JSON.stringify(_content));
  }

  //Machine Report
  try {
    const response = await getReport()
    // console.log("--->", response.data)
    localStorage.setItem("MRDetail", JSON.stringify(response));
  } catch (error) {
    const _content =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.setItem("MRDetail", JSON.stringify(_content));
  }

  return "Done !!";
}
export default {
  getPartylist,
  getPartydata,
  getAllPartiesdata,
  pythonPDFSerivce,
  getDailyReport,
  getBeamStock,
  getWorpingMeter,
  getStockReport,
  getReport,
  getDate,
  getData
};
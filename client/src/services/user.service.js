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

const getData = () => {

  //Partylist
  getPartylist().then(
    (response) => {
      // console.log("before sort", JSON.stringify(response))
      localStorage.setItem("partyName", JSON.stringify(response.sort((a, b) => (a._id.partyName.localeCompare(b._id.partyName)))));
      // console.log("after sort", JSON.stringify(response.sort((a, b) => (a._id.partyName.localeCompare(b._id.partyName)))))
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.setItem("partyName", JSON.stringify(_content));
    }
  );

  //Partylist
  getAllPartiesdata().then(
    (response) => {
      // console.log("--->", JSON.stringify(response.data))
      localStorage.setItem("parties", JSON.stringify(response));
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      localStorage.setItem("parties", JSON.stringify(_content));
    }
  );

  //Daily Report
  getDailyReport().then(
    (response) => {
      //  console.log("--->", response.data)
      localStorage.setItem("DRdetail", JSON.stringify(response.sort((a, b) => (a.key.localeCompare(b.key)))));
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.setItem("DRdetail", JSON.stringify(_content));
    });

  //Warping Report
  getBeamStock().then(
    (response) => {
      var temp = {};
      response.forEach((e, i) => {
        temp[e.QualityCode] = e.beamStockData.reduce((T, c) => (T + Number(c.Meter)), 0)
      })
      // console.log(temp)
      localStorage.setItem("beam", JSON.stringify(temp));
      getWorpingMeter().then(
        (response) => {
          // console.log("--->", response)
          localStorage.setItem("WMDetail", JSON.stringify(response.sort((a, b) => (a.quality.localeCompare(b.quality)))));
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          localStorage.setItem("WMDetail", _content);
        })
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.setItem("beam", JSON.stringify(_content));
    });

  //Beam Stock
  getBeamStock().then(
    (response) => {
      // console.log(response.data)
      localStorage.setItem("BSdetail", JSON.stringify(response.sort((a, b) => (a.QualityCode.localeCompare(b.QualityCode)))));
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.setItem("BSdetail", JSON.stringify(_content));
    });

  //Stock Report
  getStockReport().then(
    (response) => {
      // console.log(response.data)
      localStorage.setItem("SRDetail", JSON.stringify(response.sort((a, b) => (a.qualityCode.localeCompare(b.qualityCode)))));
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.setItem("SRDetail", JSON.stringify(_content));
    });

  //Machine Report
  getReport().then(
    (response) => {
      // console.log("--->", response.data)
      localStorage.setItem("MRDetail", JSON.stringify(response));
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.setItem("MRDetail", JSON.stringify(_content));
    });
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
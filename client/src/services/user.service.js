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
};

const getDailyReport = () => {
  return axios.get(API_URL + "as2020/dailyreport", { headers: authHeader() });
}

const getBeamStock = () => {
  return axios.get(API_URL + "as2020/beamstock", { headers: authHeader() });
}

const getWorpingMeter = () => {
  return axios.get(API_URL + "as2020/worpingmeter", { headers: authHeader() });
}

const getStockReport = () => {
  return axios.get(API_URL + "as2020/stockreport", { headers: authHeader() });
}

const getReport = () => {
  return axios.get(API_URL + "as2020/report", { headers: authHeader() });
}

const getDate = () => {
  return axios.get(API_URL + "as2020/metadata", { headers: authHeader() });
}

const getData = () => {

  //Partylist
  getPartylist().then(
    (response) => {
      console.log("before sort", JSON.stringify(response.data))
      localStorage.setItem("partyName", JSON.stringify(response.data.sort((a, b) => (a._id.partyName.localeCompare(b._id.partyName)))));
      console.log("after sort", JSON.stringify(response.data.sort((a, b) => (a._id.partyName.localeCompare(b._id.partyName)))))
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
      localStorage.setItem("parties", JSON.stringify(response.data));
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
      // console.log("--->", response.data)
      localStorage.setItem("DRdetail", JSON.stringify(response.data.sort((a, b) => (a.key.localeCompare(b.key)))));
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
      response.data.forEach((e, i) => {
        temp[e.QualityCode] = e.beamStockData.reduce((T, c) => (T + Number(c.Meter)), 0)
      })
      // console.log(temp)
      localStorage.setItem("beam", JSON.stringify(temp));
      getWorpingMeter().then(
        (response) => {
          // console.log("--->", response.data)
          localStorage.setItem("WMDetail", JSON.stringify(response.data.sort((a, b) => (a.quality.localeCompare(b.quality)))));
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
      localStorage.setItem("BSdetail", JSON.stringify(response.data.sort((a, b) => (a.QualityCode.localeCompare(b.QualityCode)))));
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
      localStorage.setItem("SRDetail", JSON.stringify(response.data.sort((a, b) => (a.qualityCode.localeCompare(b.qualityCode)))));
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
      localStorage.setItem("MRDetail", JSON.stringify(response.data));
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
import React, { useEffect, useState } from "react";
import { Document, PDFViewer, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import ReactDOM from 'react-dom';
import userService from "../../services/user.service";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row"
  },
  section: {
    flexGrow: 1
  }
});

const Pdfgenerator = () => {

  const ps = JSON.parse(localStorage.getItem('ps'));

  const [detail, setDetail] = useState();

  function fun() {
    return userService.getPartydata(ps.party, ps.broker).then(
      (response) => {
        setDetail(response.data);
        console.log("----->", response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setDetail(_content)
      })

  }

  // fun()

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>
            {JSON.stringify(detail)}
          </Text>
        </View>
        {/* <View style={styles.section}>
          <Text>We're inside a PDF!</Text>
        </View> */}
      </Page>
    </Document>
  )
}

export default Pdfgenerator;// = () => {

// ReactDOM.render(
//   <PDFViewer>{Pdfgenerator}</PDFViewer>,
//   document.getElementById("root")
// );

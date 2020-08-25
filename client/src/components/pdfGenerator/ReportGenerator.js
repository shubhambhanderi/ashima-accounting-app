import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const ReportGenerator = detail => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Id", "Order Date", "Q Code", "Ord. No", "Ord. Quantity", "Supply Date", "BL/CH No.", "Supply Quan.", "No. Taka", "Supply Rate", "Balance Quan"];
  // define an empty array of rows
  const tableRows = [];
  console.log("--->", detail);
  // for each ticket pass all its data into an array
  detail && detail.forEach(detail => {
    const ticketData = [
      1,
      detail.orderDate.toString().slice(0, 10),
      detail.itemName,
      detail.orderNo,
      detail.orderQuantity,
      detail && detail.FCHDetails && detail.FCHDetails.map((detail, index) => (
        detail.DATE.toString().slice(0, 10)
      )),
      // detail && detail.FCHDetails && detail.FCHDetails.map((detail, index) => (
      //   detail.NO
      // )),
      // detail && detail.FCHDetails && detail.FCHDetails.map((detail, index) => (
      //   detail.TQNTY
      // )),
      // detail && detail.FCHDetails && detail.FCHDetails.map((detail, index) => (
      //   detail.TBOX
      // )),
      // detail && detail.FCHDetails && detail.FCHDetails.map((detail, index) => (
      //   detail.CRATE
      // )),
      detail.balanceQuantity,
      // called date-fns to format the date on the ticket
      // format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startX: 10, startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Closed tickets within the last one month.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default ReportGenerator;
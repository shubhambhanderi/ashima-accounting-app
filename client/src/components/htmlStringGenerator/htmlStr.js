import React from 'react'

function dateToStr(e) {
  return e?.getDate() + "/" + e?.getMonth() + "/" + e?.getFullYear()
}


export default function htmlStr(detail, partyname, brokername) {
  return (
    `
                    <style>
                     html,
                     body {
                       margin: 0px;
                       padding: 5px;
                     }
                     table {
                       width: 100%;
                     }
                     table tbody tr td {
                       text-align: center;
                       vertical-align: top;
                       padding-top: 5px;
                       padding-bottom: 5px;
                       font-size: 10px;
                     }
                     table tbody tr:nth-child(odd) {
                       background-color: #f0f0f0;
                     }

                     .heading{
                      background-color: #212529 !important;
                      color: white;
                     }
                   </style>
                   <body>
                   <div>
                   <center>
                                        <h1>ASHIMA FABRICS</h1>
                                        <h6>
                                          PLOT NO. 1 TO 4 JAY AMBEY ESTATE AT.DELAD(SAYAN).
                                          TAL.OLPAD.DIST:SURAT.
                                        </h6>
                                        <h6>
                                          PARTYWISE CHALLAN BASE PARTICULAR COMPANY [ SALES BOOKING ] DETAIL
                                        </h6>
                                      </center>
                                  </div>
                                   <div>
                                       <table cellpadding="0" cellspacing="0">
                                     <tr>
                                       <td colspan="2">
                                         <table>
                                           <tr>
                                             <td>
                                               <h3><b>Party : ${partyname}</b></h3>
                                             </td>
                                             <td>
                                               <h3><b>Broker : ${brokername}</b></h3>
                                             </td>
                                           </tr>
                                         </table>
                                       </td>
                                     </tr>
                                   </table>
                                           </div>
                                           <table border="0">
                                              <tr class = "heading">
                                              <td>#</td>
                                              <td>Order Date</td>
                                              <td>Q Code</td>
                                              <td>Ord. No</td>
                                              <td>Ord. Quantity</td>
                                              <td>Supply Date</td>
                                              <td>BL/CH No.</td>
                                              <td>L.R.NO</td>
                                              <td>Supply Quan.</td>
                                              <td>Balance Quan</td>
                                              <td>No. Taka</td>
                                              <td>Supply Rate</td>
                                              </tr>
                     <tbody>
                     ${detail && detail.map((data, index) => (
      ` <tr key=${index} >
                             <td>${index + 1}</td>
                           <td> ${ dateToStr(new Date(data.orderDate))}</td >
                         <td>${data.itemName}</td>
                         <td>${data.orderNo}</td>
                         <td>${data.orderQuantity}</td>
                         <td>
                         ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
        `<p>${dateToStr(new Date(detail.DATE))}</p>`
      ))}
                         </td>
                         <td>
                         ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
        ` <p>${detail.NO}</p>`
      ))}
                         </td>
                         <td>
                          ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
        `<p>${detail.LRNO}</p>`
      ))}
                         </td>
                         <td>
                         ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
        `<p>${detail.TQNTY}</p>`
      ))}<b>${data.supplyQuantity}</b>
                         </td>
                         <td><b>${data.balanceQuantity}</b></td>
                         <td>
                         ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
        `<p>${detail.TBOX}</p>`
      ))}

                         </td>
                         <td>
                         ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
        `<p>${detail.CRATE}</p>`
      ))}
                         </td>

                           </tr >`
    ))
    }
                     </tbody>
                   </table>
                   </body>`
  )
}
// export default function htmlStr(detail, partyname, brokername) {

//   return (`<html>
//               <head>
//               <meta charset="utf-8" />
//               <title>PDF Result Template</title>
//               <link
//                 href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
//                 rel="stylesheet"
//               />
//               <style>
//                 html,
//                 body {
//                   margin: 0px;
//                   padding: 5px;
//                   font-family: "Open Sans", sans-serif;
//                 }
//                 table {
//                   width: 100%;
//                 }
//                 table tbody tr td {
//                   text-align: center;
//                   vertical-align: top;
//                   padding-top: 5px;
//                   padding-bottom: 5px;
//                 }
//                 table tbody tr:nth-child(odd) {
//                   background-color: #f0f0f0;
//                 }
//               </style>
//             </head>
//             <body>
//                   <div class="invoice-box">
//                   <center>
//                     <img
//                       src="https://www.ashimafabrics.com/assets/img/logo.png"
//                       alt="Ashima Fabrics"
//                       style="
//                         width: 156px;
//                         max-height: 156px;
//                         margin-left: auto;
//                         margin-right: auto;
//                       "
//                     />
//                     <p>
//                       PLOT NO. 1 TO 4,JAY AMBEY ESTATE,AT.DELAD(SAYAN).
//                       TAL.OLPAD.DIST:SURAT.
//                     </p>
//                     <p>
//                       PARTYWISE CHALLAN BASE PARTICULAR COMPANY [ SALES BOOKING ] DETAIL
//                     </p>
//                   </center>
//                   <table cellpadding="0" cellspacing="0">
//                     <tr class="information">
//                       <td colspan="2">
//                         <table>
//                           <tr>
//                             <td>
//                               <h3><b>Party :${partyname}</b></h3>
//                             </td>
//                             <td>
//                               <h3><b>Broker : ${brokername}</b></h3>
//                             </td>
//                           </tr>
//                         </table>
//                       </td>
//                     </tr>
//                   </table>
//                   <table border="0">
//                     <thead style="background-color: #212529; color: white">
//                       <tr>
//                         <th>#</th>
//                         <th>Order Date</th>
//                         <th>Q Code</th>
//                         <th>Ord. No</th>
//                         <th>Ord. Quantity</th>
//                         <th>Supply Date</th>
//                         <th>BL/CH No.</th>
//                         <th>Supply Quan.</th>
//                         <th>No. Taka</th>
//                         <th>Supply Rate</th>
//                         <th>Balance Quan</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       ${detail && detail.map((data, index) => (
//     ` <tr key=${index} >
//       <td>${index + 1}</td>
//     <td> ${ data.orderDate.toString().slice(0, 10)}</td >
//   <td>${data.itemName}</td>
//   <td>${data.orderNo}</td>
//   <td>${data.orderQuantity}</td>
//   <td>
//   ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
//       `<p>${detail.DATE.toString().slice(0, 10)}</p>`
//     ))}
//   </td>
//   <td>
//   ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
//       ` <p>${detail.NO}</p>`
//     ))}<b>${data?.FCHDetails?.map((e) => e.NO)?.reduce((a, b) => (parseFloat(a) + parseFloat(b)), 0)}</b>
//   </td>
//   <td>
//   ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
//       `<p>${detail.TQNTY}</p>`
//     ))}<b>${data.supplyQuantity}</b>
//   </td>
//   <td>
//   ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
//       `<p>${detail.TBOX}</p>`
//     ))}

//   </td>
//   <td>
//   ${data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
//       `<p>${detail.CRATE}</p>`
//     ))}
//   </td>
//   <td><b>${data.balanceQuantity}</b></td>
//     </tr >`
//   ))
//     }
//                     </tbody >
//                   </table >
//                 </div >
//             </body >
//           </html > `
//   )
// }

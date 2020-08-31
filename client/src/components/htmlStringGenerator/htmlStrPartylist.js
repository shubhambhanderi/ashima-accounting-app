import React from 'react'

function dateToStr(e) {
  return e?.getDate() + "/" + e?.getMonth() + "/" + e?.getFullYear()
}

export default function htmlStrPartylist(detail, partyname, brokername) {
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
                                          PARTYWISE CHALLAN BASE PARTICULAR COMPANY [ SALES BOOKING ] SUMMARY
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
                                              <td>Ord. Rate</td>
                                              <td>Supply Quan.</td>
                                              <td>Balance Quan</td>
                                              </tr>
                     <tbody>
                     ${detail && detail.map((data, index) => (
      ` <tr key=${index} >
                         <td>${index + 1}</td>
                         <td> ${ dateToStr(new Date(data.orderDate))}</td >
                         <td>${data.itemName}</td>
                         <td>${data.orderNo}</td>
                         <td>${data.orderQuantity}</td>
                         <td>${data.orderRate}</td>
                         <td>${data.supplyQuantity}</td>
                         <td><b>${data.balanceQuantity}</b></td>
                           </tr >`
    ))
    }
                     </tbody>
                   </table>
                   </body>`
  )
}

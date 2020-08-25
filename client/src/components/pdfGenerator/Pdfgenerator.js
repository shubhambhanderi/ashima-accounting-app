import React, { useEffect, useState } from "react";
import { Document, PDFViewer, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Table, TableBody, DataTableCell, TableHeader, Utils, TableCell } from '@david.kucsai/react-pdf-table';

const styles = StyleSheet.create({
  section: {
    flexGrow: 1
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  line: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
    display: 'block'
  },
  title: {
    fontSize: 24,
    fontWeight: '4px',
    textAlign: 'center',
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
});

export function Pdfgenerator(detail) {
  console.log("detail", detail)
  const v = detail.data.map((d, index) => (
    <Text style={styles.line} key={index} break>
      <TableCell>{d.orderDate.toString().slice(0, 10)}</TableCell>
      <TableCell>{d.itemName}</TableCell>
      <TableCell>{d.orderNo}</TableCell>
      <TableCell>{d.orderQuantity}</TableCell>
      <TableCell>{d.balanceQuantity}</TableCell>
    </Text>))
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.title}>ASHIMA FABRICS</Text>
        <Text style={styles.author}>PLOT NO. 1 TO 4,JAY AMBEY ESTATE,AT.DELAD(SAYAN). TAL.OLPAD.DIST:SURAT.</Text>
        <Table
          data={[
            { firstName: "John", lastName: "Smith", dob: new Date(2000, 1, 1), country: "Australia", phoneNumber: "xxx-0000-0000" }
          ]}
        >
          <TableHeader>
            <TableCell>Order Date</TableCell>
            <TableCell>Q Code</TableCell>
            <TableCell>Ord. No</TableCell>
            <TableCell>Ord. Quantity</TableCell>
            <TableCell>Balance Quan</TableCell>
          </TableHeader>
          <TableBody>
            {v}
          </TableBody>
        </Table>
      </Page>
    </Document>
  )
}

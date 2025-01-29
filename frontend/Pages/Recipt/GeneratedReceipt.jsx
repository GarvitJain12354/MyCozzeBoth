import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",

    marginBottom: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    borderTop: "4px solid #BC2C3D",
    paddingTop: 10,
  },
  dated: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
    // marginLeft:"10px",
    borderTop: "4px solid #BC2C3D",
    paddingTop: 10,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  footerSection: {
    flexDirection: "column",
    fontSize: 12,
  },
  note: {
    fontSize: 10,
    color: "#A0A0A0",
    textAlign: "center",
    marginTop: 40,
  },
  separator: {
    width: "100%",
    height: 1,
    borderStyle: "dashed",
    borderTopWidth: 2,
    borderColor: "#A0A0A0",
    marginVertical: 20,
  },
});

const MyDocument = ({ monthlyData, landlordName,address }) => (
  <Document>
    {monthlyData.map(({ startDate, endDate, tenantName, amount }, index) => (
      <Page key={index} style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { width: "70%" }]}>
            House Rent Receipt
          </Text>
          <Text style={[styles.dated, { width: "28%" }]}>
            Dated: {startDate}
          </Text>
        </View>

        <Text style={styles.paragraph}>
          This is to acknowledge the receipt from{" "}
          <Text style={styles.boldText}>{tenantName}</Text> the sum of Rs.{" "}
          <Text style={styles.boldText}>{amount}</Text>/-(Ten Thousand Rupees)
          toward rent payment for the period from{" "}
          <Text style={styles.boldText}>{startDate}</Text> to{" "}
          <Text style={styles.boldText}>{endDate}</Text> towards the property
          bearing the address <Text style={styles.boldText}>{address}</Text>.
        </Text>

        <View style={styles.footerContainer}>
          <View style={styles.footerSection}>
            <Text style={styles.boldText}>Landlord Details</Text>
            <Text>{landlordName}</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.boldText}>Signature</Text>
            <Text>({landlordName})</Text>
          </View>
        </View>

        <Text style={styles.note}>This is system generated from MyCozze</Text>
        <View style={styles.separator} />
      </Page>
    ))}
  </Document>
);

const GeneratedReceipt = ({ data }) => {
  const {
    landlordName,
    rentAmount,
    receiptStartDate,
    months,
    tenantName,
    address,
  } = data;

  // Calculate monthly data
  const monthlyData = Array.from(
    { length: parseInt(months, 10) },
    (_, index) => {
      const startDate = new Date(receiptStartDate);
      startDate.setMonth(startDate.getMonth() + index);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);

      return {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        tenantName,
        amount: rentAmount,
      };
    }
  );

  return (
    <PDFDownloadLink
      document={
        <MyDocument
          monthlyData={monthlyData}
          landlordName={landlordName}
          address={address}
        />
      }
      fileName="agreement.pdf"
    >
      {({ loading }) => (loading ? "Generating document..." : "Download Now")}
    </PDFDownloadLink>
  );
};

{
  /* <PDFDownloadLink document={<MyDocument />} fileName="agreement.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating document...' : 'Download Now'
        }
      </PDFDownloadLink> */
}
export default GeneratedReceipt;

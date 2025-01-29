import React, { useRef } from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";
import RazorpayPayment from "../PaymentDemo";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  titleContainer: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  center: {
    textAlign: "center",
    width: "100%",
    fontSize: 12,
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
    fontSize: 12,
    display: "flex",
    flexDirection: "column",
    gap: 4,
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

const MyDocument = ({
  landlordName,
  tenantName,
  propertyDetails,
  agreementTerms,
  tenantDetails,
}) => (
  <Document>
    <Page style={styles.page}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>RENTAL AGREEMENT</Text>
      </View>

      {/* Content */}
      <Text style={styles.paragraph}>
        THIS RENTAL AGREEMENT is executed at {propertyDetails.city},{" "}
        {propertyDetails.state} on {agreementTerms.agreementStartDate} by and
        between <Text style={styles.boldText}>{landlordName}</Text>, residing at{" "}
        {propertyDetails.ownerAddress} (hereinafter jointly and severally called
        the "LANDLORD").
      </Text>

      <Text style={styles.paragraph}>
        AND <Text style={styles.boldText}>{tenantName}</Text>, having permanent
        address at {tenantDetails.address} (hereinafter called the "TENANT").
      </Text>

      <Text style={styles.paragraph}>
        WHEREAS the Landlord is the absolute owner of{" "}
        {propertyDetails.fullAddress}, including all inbuilt fittings &
        fixtures.
      </Text>

      {/* Clauses */}
      <Text style={styles.paragraph}>
        1. The rent for the "Demised Premises" will commence from{" "}
        {agreementTerms.agreementStartDate} and will remain valid until{" "}
        {agreementTerms.agreementEndDate}. The monthly rent shall be Rs.{" "}
        {agreementTerms.monthlyRent}.
      </Text>

      <Text style={styles.paragraph}>
        2. The Tenant shall pay to the Landlord a monthly rent of Rs.{" "}
        {agreementTerms.monthlyRent}. The rent is due in advance by the 10th of
        each month. If unpaid for one month, and after notice, the Landlord may
        terminate this Agreement and reclaim possession.
      </Text>

      <Text style={styles.paragraph}>
        3. During the lease, the Tenant shall pay for utilities such as
        electricity and water directly. Upon vacating, the Tenant must ensure
        all utility dues are cleared.
      </Text>

      <Text style={styles.paragraph}>
        4. The Tenant is responsible for maintaining and servicing any
        Landlord-provided appliances and fixtures. Any damages caused by the
        Tenant must be repaired at their own expense.
      </Text>

      <Text style={styles.paragraph}>
        5. An interest-free refundable security deposit of Rs.{" "}
        {agreementTerms.securityDeposit} is required. The Landlord may deduct
        unpaid rent, utilities, or repair costs from the deposit before
        returning it at lease end.
      </Text>

      <Text style={styles.paragraph}>
        6. The Tenant may not sublet or assign the premises, which must be used
        solely for residential purposes by the Tenant or their family and
        guests.
      </Text>
      <Text style={styles.paragraph}>
        7. That the day-to-day minor repairs will be the responsibility for the
        Tenant at his/her own expense. However, any structural or major repairs,
        if so required, shall be carried out by the Landlord.
      </Text>

      <Text style={styles.paragraph}>
        8. That no structural additions or alterations shall be made by the
        Tenant to the Demised Premises without the prior written consent of the
        Landlord. However, the Tenant can install air-conditioners in the space
        provided and other electrical gadgets and make such changes for the
        purposes as may be necessary, at his own cost. The Landlord represents
        that the Premises possesses the adequate electrical infrastructure to
        cater for the electrical appliances including the air-conditioners. On
        termination or expiry of the tenancy or earlier, the Tenant will be
        entitled to remove such equipments and should restore the changes made,
        if any.
      </Text>

      <Text style={styles.paragraph}>
        9. That the Landlord shall have the right to visit or enter the Dernised
        Premises in person or through his authorized agent(s), servants, workmen
        etc., for inspection (not exceeding once in a month) or to carry out
        repairs/construction, as and when required, by giving a 24 hours notice
        to the Tenant.
      </Text>

      <Text style={styles.paragraph}>
        10. That the Tenant shall comply with all the rules and regulations of
        the local authority or the resident welfare association as applicable to
        the Demised Premises.
      </Text>
    </Page>
    <Page style={styles.page}>
      {/* Clauses */}

      <Text style={styles.paragraph}>
        11. That the Landlord shall pay for all property or other taxes/cesses
        levied on the Demised Premises by the local or government authorities.
        Further, any other payment in the nature of subscription or periodical
        fee to the welfare association shall be paid by the Landlord.
      </Text>

      <Text style={styles.paragraph}>
        12. That the Landlord will keep the Demised Premises free and harmless
        from any liens, claims, proceedings, demands, or actions on his account
        and subject to payment of monthly rent and compliance with the terms of
        this Agreement the Tenant shall be entitled to enjoy peaceful possession
        of the Demised Premises.
      </Text>
      <Text style={styles.paragraph}>
        13. That this Rent Agreement cannot be terminated by either party for a
        period of Lock In Period months from the Agreement Start Date
        (hereinafter "Lock in Period"). If a party intends to terminate this
        Agreement during the Lock in Period, it must pay the other Party, as
        compensation, an amount equal to the Rent for the remainder of the Lock
        in Period. After the completion of lock-in-period, the Tenant can
        terminate the Rent Agreement by giving Notice Period months notice to
        the Landlord or the rent in lieu of. After the completion of
        Lock-in-Period, the Landlord can also terminate the Rent Agreement by
        giving 1 months notice to the Tenant. It is clarified that in the event
        of non payment of rent by the Tenant during the lock-in period being in
        arrears for 2 consecutive months, then the Landlord shall have the right
        to terminate the Rent Agreement with immediate effect and take back
        possession of the Demised Premises.
      </Text>
      <Text style={styles.paragraph}>
        14. In the event the Landiord transfers, alienates or encumbers or
        otherwise howsoever disposes of or deals with Demised Premises, the
        Landlord shall intimate the Tenant about the same in writing and shall
        ensure that the purchaser/transferee shall honor the terms of this Rent
        Agreement. Landlord shall provide an undertaking to the Tenant from the
        said purchaser/transferee to that effect.
      </Text>
      <Text style={styles.paragraph}>
        15. The Landlord shall acknowledge and give valid receipts for each
        payment made by the Tenant to the Landlord, which shall be treated as
        conclusive proof of such payments.
      </Text>
      <Text style={styles.paragraph}>
        16. The Landlord confirms that in case for any reason whatsoever the
        premises in reference or any part thereof cannot be used for residential
        purposes because of any earthquake, civil commotion, or due to any
        natural calamity or if Premises is acquired compulsorily by any
        authority, over which the Landlord has no control, the Tenant shall have
        the right to terminate this Agreement forthwith and vacate the premises
        and the Landlord shall refund the security deposit or the rent received
        in advance to the Tenant without any deductions whatsoever
      </Text>
      <Text style={styles.paragraph}>
        17. That the Tenant will keep the Landlord harmless and keep it
        exonerated from all losses (whether financial or life), damage,
        liability or expense occasioned or claimed by reasons of acts or
        neglects of the Tenant or his visitors, employees, whether in the
        Demised Premises or elsewhere in the building, unless caused by the
        negligent acts of the Landlord.
      </Text>
    </Page>
    <Page style={styles.page}>
      {/* Clauses */}

      <Text style={styles.paragraph}>
        18. The Tenant shall maintain the Demised Premises in good and tenable
        condition and all the minor repairs such as leakage in the sanitary
        fittings, water taps and electrical usage etc. shall be carried out by
        the Tenant. That it shall be the responsibility of the Tenant to hand
        over the vacant and peaceful possession of the demised premises on
        expiry of the Rent period, or on its early termination, as stated
        hereinabove in the same condition subject to natural wear and tear.
      </Text>
      <Text style={styles.paragraph}>
        19. That in case, where the Premises are not vacated by the Tenant, at
        the termination of the Rent period, the Tenant will pay damages
        calculated at two times the rent for any period, of occupation
        commencing from the expiry of the Rent period. The payment of damages as
        aforesaid will not preclude the Landlord from initiating legal
        proceedings against the Tenant for recovering possession of premises or
        for any other purpose
      </Text>

      <Text style={styles.paragraph}>
        20. That both the parties shall observe and adhere to the terms and
        conditions contained hereinabove.
      </Text>

      <Text style={styles.paragraph}>
        21. That the Tenant and Landlords represent and warrant that they are
        fully empowered and competent to make this Rent.
      </Text>

      <Text style={styles.paragraph}>
        22. If required, the Rent Agreement will be registered in front of
        registrar and the charges towards stamp duty, court fee &
        lawyer/coordinator will be equally borne by the Landlord & Tenant.
      </Text>
      <Text style={styles.center}>
        IN WITNESS WHEREOF the parties hereto have executed these presents on
        the day and year.
      </Text>
      <View style={styles.footerContainer}>
        <View style={styles.footerSection}>
          <Text>LANDLORD SIGNATURE:</Text>
          <Text>Tenant Name</Text>
          <Text>--------------------------</Text>
        </View>
        <View style={styles.footerSection}>
          <Text>TENANT SIGNATURE:</Text>
          <Text>Tenant Name</Text>
          <Text>--------------------------</Text>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footerSection}>
          <Text>WITNESS ONE :</Text>
          <Text>Name & Address</Text>
          <Text>--------------------------</Text>
        </View>
        <View style={styles.footerSection}>
          <Text> WITNESS TWO :</Text>
          <Text>Name & Address </Text>
          <Text>--------------------------</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const GeneratedAgreement = ({ handleCancel, amount, data }) => {
  const {
    landlordName,
    tenantDetails,
    tenantName,
    propertyDetails,
    agreementTerms,
  } = data;
  const btn = useRef();
  const handleDownload = () => {
    btn.current.click();
    handleCancel();
  };
  return (
    <>
      <RazorpayPayment
        classn={
          "w-full  text-white py-2 rounded-lg font-bold  bg-primary"
        }
        text={"Pay Now"}
        amount={amount}
        onComplete={handleDownload}
      />
      <PDFDownloadLink
        document={
          <MyDocument
            landlordName={landlordName}
            tenantName={tenantName}
            propertyDetails={propertyDetails}
            agreementTerms={agreementTerms}
            tenantDetails={tenantDetails}
          />
        }
        fileName="rental_agreement.pdf"
      >
        {({ loading }) =>
          loading ? (
            "Generating document..."
          ) : (
            <button
              ref={btn}
              className="w-full hidden bg-primary text-white py-2 rounded-lg font-bold"
            >
              Download now
            </button>
          )
        }
      </PDFDownloadLink>
    </>
  );
};

export default GeneratedAgreement;

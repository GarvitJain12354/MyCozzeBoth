import React, { useState } from "react";
import { toast } from "react-toastify";

const AgreementReady = ({ formData, setdownload, target }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { agreementTerms, tenantDetails, ownerDetails, propertyDetails } = formData;

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDownload = () => {
    setdownload(true);
  };

  return (
    <>
      {isOpen && (
        <div className=" shadow-xl border-2 w-full flex flex-col justify-center pb-5" ref={target}>
          <div className="relative max-md:w-full bg-white rounded-lg border-none flex flex-col items-center justify-center w-full overflow-hidden">
            <div className="flex max-md:w-full flex-col h-[50rem] px-4 rounded-lg p-5">
              <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold text-[#bc2c3d]">
                Yayy, Your Agreement is Ready
              </h2>
              <p className="text-center mt-2 text-sm sm:text-base">Preview & Download it</p>

              <div className="relative overflow-hidden px-20 max-md:px-0 min-h-fit ">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[10]">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#90909068] -rotate-45">
                    My cozee.in
                  </h1>
                </div>

                <div>
                  <h3 className="text-center font-bold text-xs sm:text-sm underline mb-4">RENTAL AGREEMENT</h3>
                  <div className="w-full h-[90vh] overflow-y-auto flex flex-col gap-2 relative z-20">
                    <p className="text-xs sm:text-sm">
                    THIS RENTAL AGREEMENT is executed at{" "}
                      {propertyDetails.city}, {propertyDetails.state} on{" "}
                      {agreementTerms.agreementStartDate} by and between{" "}
                      {ownerDetails.ownerName} residing at{" "}
                      {ownerDetails.ownerAddress} (hereinafter jointly and
                      severally called the "LANDLORD").
</p>
                    <p className="text-xs sm:text-sm">
                    AND {tenantDetails.fullName}, having permanent address at{" "}
                    {tenantDetails.address} (hereinafter called the "TENANT").
                    </p>
                    <ul className="list-decimal ml-6 text-xs sm:text-sm leading-relaxed mt-4">
                      <li>
                       The rent in respect of the "Demised Premises" shall
                      commence from {agreementTerms.agreementStartDate} and
                      shall be valid till {agreementTerms.agreementStartDate}.
                      The monthly rent shall be Rs. {agreementTerms.monthlyRent}{" "}
                      (hereinafter "Rent").

                      </li>
                      <li>
                       That the Tenant shall pay to the Landlord a monthly
                      rent of Rs. {propertyDetails?.agreementTerms?.monthlyRent}{" "}
                      (hereinafter "Rent"). The Rent shall be paid in advance
                      Monthly on or before 10 of Every Month If the rent remains
                      unpaid for one month and the Tenant does not pay the same
                      despite service of a notice by the Landlord, the Landlord
                      shall be entitled to immediately terminate this Agreement
                      and take back possession of the Demised Premises
                      immediately.</li>
                      <li>
                      That during the Rent period, in addition to the rental
                      amount payable to the Landlord, the Tenant shall pay for
                      the use of electricity, water and any other utilities as
                      per actual bills received from the authorities concerned
                      directly. Before vacating the Demised Premises on the
                      Agreement End Date Tenant must ensure that all dues of any
                      utilities are cleared and no amounts remains unpaid. Dues
                      of electricity and water before the Rent Period shall be
                      paid for and cleared by the Landlord.

                      </li>
                      <li>
                      Servicing & repair of any appliances or fixtures
                      provided by the Landlord will be the responsibility of the
                      Tenant. Any Landlord provided appliances which have been
                      damaged by Tenant will be replaced by the Tenant.
                      </li>
                      <li>
                      The Tenant will pay to the Landlord an interest-free
                      refundable security deposit of Rs. {propertyDetails?.agreementTerms?.securityDeposit}
                      (hereinafter "Security Deposit"). The said Security
                      deposit shall be refunded by the Landlord to the Tenant at
                      the time of handing back possession of the Demised
                      Premises by the Tenant upon expiry or sooner termination
                      of this Agreement. Landlord shall be entitled to adjust
                      any dues of Rent, utilities or cost of damage to the
                      Demised Premises caused by the Tenant except for normal
                      wear & tear in the ordinary course of usage. In case the
                      Landlord fails to refund the security deposit to the
                      Tenant on early termination or expiry of this agreement,
                      the Tenant is entitled to hold possession of the Demised
                      Premises, without payment of rent and/or any other charges
                      whatsoever, till such time the Landlord refunds the
                      Security Deposit to the Tenant after deducting dues, if
                      any.
                      </li>
                      <li>
                      That the Tenant shall not sublet, assign or part with
                      the Demised Premises in whole or part thereof to any
                      person in any circumstances whatsoever and the same shall
                      be used for the Bonafide residential purposes of the
                      Tenant or the Tenant's family or guests only.

                      </li>
                      <li>
                      That the day-to-day minor repairs will be the
                      responsibility for the Tenant at his/her own expense.
                      However, any structural or major repairs, if so required,
                      shall be carried out by the Landlord.

                      </li>
                      <li>
                      That no structural additions or alterations shall be
                      made by the Tenant to the Demised Premises without the
                      prior written consent of the Landlord. However, the Tenant
                      can install air-conditioners in the space provided and
                      other electrical gadgets and make such changes for the
                      purposes as may be necessary, at his own cost. The
                      Landlord represents that the Premises possesses the
                      adequate electrical infrastructure to cater for the
                      electrical appliances including the air-conditioners. On
                      termination or expiry of the tenancy or earlier, the
                      Tenant will be entitled to remove such equipments and
                      should restore the changes made, if any.

                      </li>
                      <li>
                      That the Landlord shall have the right to visit or
                      enter the Dernised Premises in person or through his
                      authorized agent(s), servants, workmen etc., for
                      inspection (not exceeding once in a month) or to carry out
                      repairs/construction, as and when required, by giving a 24
                      hours notice to the Tenant.

                      </li>
                      <li>
                      That the Tenant shall comply with all the rules and
                      regulations of the local authority or the resident welfare
                      association as applicable to the Demised Premises.
                      </li>
                      <li>
                      That the Landlord shall pay for all property or other
                      taxes/cesses levied on the Demised Premises by the local
                      or government authorities. Further, any other payment in
                      the nature of subscription or periodical fee to the
                      welfare association shall be paid by the Landlord.
                      </li>
                      <li>
                      That the Landlord will keep the Demised Premises free
                      and harmless from any liens, claims, proceedings, demands,
                      or actions on his account and subject to payment of
                      monthly rent and compliance with the terms of this
                      Agreement the Tenant shall be entitled to enjoy peaceful
                      possession of the Demised Premises.
                      </li>
                      <li>
                      That this Rent Agreement cannot be terminated by
                      either party for a period of Lock In Period months from
                      the Agreement Start Date (hereinafter "Lock in Period").
                      If a party intends to terminate this Agreement during the
                      Lock in Period, it must pay the other Party, as
                      compensation, an amount equal to the Rent for the
                      remainder of the Lock in Period. After the completion of
                      lock-in-period, the Tenant can terminate the Rent
                      Agreement by giving Notice Period months notice to the
                      Landlord or the rent in lieu of. After the completion of
                      Lock-in-Period, the Landlord can also terminate the Rent
                      Agreement by giving 1 months notice to the Tenant. It is
                      clarified that in the event of non payment of rent by the
                      Tenant during the lock-in period being in arrears for 2
                      consecutive months, then the Landlord shall have the right
                      to terminate the Rent Agreement with immediate effect and
                      take back possession of the Demised Premises.
                      </li>
                      <li>
                      In the event the Landiord transfers, alienates or
                      encumbers or otherwise howsoever disposes of or deals with
                      Demised Premises, the Landlord shall intimate the Tenant
                      about the same in writing and shall ensure that the
                      purchaser/transferee shall honor the terms of this Rent
                      Agreement. Landlord shall provide an undertaking to the
                      Tenant from the said purchaser/transferee to that effect.

                      </li>
                      <li>
                      The Landlord shall acknowledge and give valid receipts
                      for each payment made by the Tenant to the Landlord, which
                      shall be treated as conclusive proof of such payments.

                      </li>
                      <li>
                      The Landlord confirms that in case for any reason
                      whatsoever the premises in reference or any part thereof
                      cannot be used for residential purposes because of any
                      earthquake, civil commotion, or due to any natural
                      calamity or if Premises is acquired compulsorily by any
                      authority, over which the Landlord has no control, the
                      Tenant shall have the right to terminate this Agreement
                      forthwith and vacate the premises and the Landlord shall
                      refund the security deposit or the rent received in
                      advance to the Tenant without any deductions whatsoever
                      </li>
                      <li>
                      That the Tenant will keep the Landlord harmless and
                      keep it exonerated from all losses (whether financial or
                      life), damage, liability or expense occasioned or claimed
                      by reasons of acts or neglects of the Tenant or his
                      visitors, employees, whether in the Demised Premises or
                      elsewhere in the building, unless caused by the negligent
                      acts of the Landlord.

                      </li>
                      <li>
                      The Tenant shall maintain the Demised Premises in good
                      and tenable condition and all the minor repairs such as
                      leakage in the sanitary fittings, water taps and
                      electrical usage etc. shall be carried out by the Tenant.
                      That it shall be the responsibility of the Tenant to hand
                      over the vacant and peaceful possession of the demised
                      premises on expiry of the Rent period, or on its early
                      termination, as stated hereinabove in the same condition
                      subject to natural wear and tear.

                      </li>
                      <li>
                      That in case, where the Premises are not vacated by
                      the Tenant, at the termination of the Rent period, the
                      Tenant will pay damages calculated at two times the rent
                      for any period, of occupation commencing from the expiry
                      of the Rent period. The payment of damages as aforesaid
                      will not preclude the Landlord from initiating legal
                      proceedings against the Tenant for recovering possession
                      of premises or for any other purpose

                      </li>
                      <li>
                      That both the parties shall observe and adhere to
                      the terms and conditions contained hereinabove.

                      </li>
                      <li>
                      That the Tenant and Landlords represent and warrant
                      that they are fully empowered and competent to make this
                      Rent.

                      </li>
                      <li>
                      If required, the Rent Agreement will be registered in
                      front of registrar and the charges towards stamp duty,
                      court fee & lawyer/coordinator will be equally borne by
                      the Landlord & Tenant.
                      </li>
                    </ul>
                    <br />
                    <h1 className="text-center font-semibold">
                      IN WITNESS WHEREOF the parties hereto have executed these presents on the day and year.
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgreementReady;

import Footer from './Footer'
import NavBar from './NavBar'
// import NavBar from '../Components/NavBar'

const RefundPolicy = () => {
  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="px-[15rem] py-16 mt-10 max-md:px-[2rem]">
        <h1 className="text-[#bc2c3d] text-3xl font-bold mb-6">
          MY Cozee.in Refund and Cancellation Policy
        </h1>
        <p className=" mb-6">
          Welcome to MY Cozee.in, the go-to platform for finding hassle-free rental homes, PGs, and
          roommates across cities. This policy ensures transparency and ease in understanding how
          refunds and cancellations work for our premium membership plans.
        </p>
        <p className=" mb-6">
          We offer two main plans for our users: the Basic Plan and the Assisted Plan. Please review
          our Refund and Cancellation Policy carefully before making any purchases.
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">Basic Plan</h2>
        <ul>
          <li>Our Basic Plan is designed for users who prefer a self-directed approach in searching for roommates or rental accommodations.</li>
          <ul className="list-disc pl-8  mb-6">
          <li className="mb-3">
          Access and Benefits: Upon subscribing to the 30-day Premium Basic Plan, you gain immediate access to contact other users via call/chat and view their detailed profiles and listings.
          </li>
          <li className="mb-3">
         Refund Eligibility: If, within the 30-day premium period, you are unable
            to find a suitable flatmate or rental property, you may request a refund after your plan
            expires. The refund request must be made within 30 days after your subscription ends.
          </li>
          <li className="mb-3">
            Refund Breakdown: If you have paid ₹599 for the Basic Plan, the refund
            will apply only to the service fee, with platform fees and taxes being non-refundable. For
            example:
            <ul className="list-disc pl-6 mt-2">
              <li>₹1,379 (Value of Service)</li>
              <li>₹7,220 (Platform fees and applicable taxes)</li>
            </ul>
          </li>
          <li className="">
            <p>Only the Value of Service portion is refundable.</p>
          </li>
          <ul>
            <li className="list-disc">Conditions:</li>
            <ul className="pl-6">
              <li className="list-disc">
                Refunds will not be granted if you continue using the premium service past the original
                30 days or if you extend your plan.
              </li>
              <li className="list-disc">
                Refund requests are limited to two instances per user. Subsequent requests will not be
                considered.
              </li>
            </ul>
          </ul>
          </ul>
        </ul>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">Assisted Plan</h2>
        <ul className="  mb-6">
            <li>
            The Assisted Plan combines the features of the Basic Plan with the added convenience of a dedicated Relationship Manager (RM) to help streamline your search.
            </li>
         <ul className='list-disc pl-10'>
         <li className="mb-3">
            RM Assignment After subscribing to the Assisted Plan, you will be assigned a
            dedicated RM within 24 hours, who will assist you in finding flatmates or rental properties
            by reaching out to prospects and arranging visits.
          </li>
          <li>
          Working Hours: Your RM will be available to assist you on weekdays from 10:00 AM to 6:00 PM, excluding Sundays and public holidays. Communication with your RM will be via phone.
          </li>
         <ul className='list-disc'>
         <li>
          Refund Eligibility:
          </li>
          <ul className='list-disc pl-10'>
            <li>You may request a refund after 30 days from the date of purchase if your RM has not successfully arranged 10 property or flatmate visits for you.</li>
            <li>If 10 visits have been arranged, no refund will be provided.</li>
            <li>Refund requests are also subject to user engagement: if you fail to respond to your RM's calls or messages over several consecutive days, you will forfeit your eligibility for a refund.</li>
           </ul>
         </ul>
         <ul className='list-disc'>
         <li>
         Refund Amount:
          </li>
          <ul className=''>
            <li>You may request a refund after 30 days from the date of purchase if your RM has not successfully arranged 10 property or flatmate visits for you.</li>
          </ul>
         </ul>
         </ul>

        </ul>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          Additional Terms for Refund and Cancellation
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            Flat Owners and PG Managers: Refund policies for flat owners subscribing to the
            Basic Plan are limited to a 50% refund.
          </li>
          <li className="mb-3">
            Gender-Specific Searches: Refunds will not be granted if your search criteria
            involve finding a flatmate of a different gender, as these requests have a low success
            rate.
          </li>
          <li className="mb-3">
            Multiple Purchases: If you have made multiple purchases of the same premium
            membership plan, only the most recent transaction will be eligible for a refund.
          </li>
          <li className="mb-3">
            Add-Ons: If you have purchased add-ons (such as profile verification or enhanced
            visibility), refunds for add-ons are not provided. Only the base plan is subject to the
            refund policy.
          </li>
          <li className="mb-3">
            Discounts and Adjustments: Any discounts applied during your purchase will be
            deducted from the refundable amount.
          </li>
          <li className="mb-3">
            Account Deletion: Deleting your account before the refund process is completed
            will result in a forfeiture of your refund as your data will be permanently deleted from
            our system.
          </li>
          <li className="mb-3">
           Refund Processing Time: Refunds will be processed within 5 to 7 business days
            after we receive the necessary details from you.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          Important Considerations
        </h2>
        <ul>
         <ul className="list-disc pl-6  ">
         <li className="mb-3">
            Refunds will not be granted for any payments made directly to other users as part of
            advance deposits or booking fees for properties. We advise you to meet potential flatmates
            and visit properties in person before making any payments.
          </li>
          <li className="mb-3">
            The MY Cozee.in Refund and Cancellation Policy does not apply to accounts registered as PG
            owners or rental property managers.
          </li>
          <li className="mb-3">
            By purchasing a premium membership, you agree to the terms of this refund and cancellation
            policy. If you do not agree with any part of the policy, we encourage you not to proceed
            with your purchase.
          </li>
         </ul>
          <li className="mb-3">
            We hope your experience with MY Cozee.in is smooth and successful. Should you have any
            further questions regarding this policy or your eligibility for a refund, please feel free
            to contact our customer support team.
          </li>
        </ul>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default RefundPolicy

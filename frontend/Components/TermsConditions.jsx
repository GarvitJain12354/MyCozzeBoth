import Footer from "./Footer";
import NavBar from "./NavBar";
// import NavBar from '../Components/NavBar'

const TermsCondition = () => {
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
          MyCozee (“us”, “we”, or “our”) operates the website
          https://www.mycozee.in (the “Service”). This page informs you of our
          policies regarding the collection, use, and disclosure of Personal
          Information when you use our Service. By using the Service, you agree
          to the collection and use of information in accordance with this
          policy. 
        </p>
        <p className=" mb-6">
          We offer two main plans for our users: the Basic Plan and the Assisted
          Plan. Please review our Refund and Cancellation Policy carefully
          before making any purchases.
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          1. Acceptance of Terms
        </h2>
        <ul>
          <li>
            By accessing or using our website and services, you agree to comply
            with these Terms and Conditions. If you do not agree with any part
            of these terms, you should not use our Service.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          2. Information Collection and Use While using our
        </h2>
        <ul className="  mb-6">
          <li>
            Service, we may ask you to provide us with certain personally
            identifiable information that can be used to contact or identify
            you. Personally identifiable information may include, but is not
            limited to, your name, email address, phone number, and payment
            details.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          3. User Accounts
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            To access certain features of our Service, you must create an
            account. You are responsible for maintaining the confidentiality of
            your account information and are fully responsible for all
            activities that occur under your account.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          4. User Postings
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            Our Service allows you to post requirements and communicate with
            other users (“User Postings”). You acknowledge that User Postings do
            not reflect our views, and we are not responsible for the content of
            these postings. We reserve the right to review, edit, or remove any
            User Postings at our discretion.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          5. Subscription Fees and Automatic Renewal
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            MyCozee offers subscription plans for premium features. Details
            regarding subscription pricing and automatic renewal will be clearly
            stated during the subscription process. You can manage your
            subscription settings through your account.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          6. Security
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            We prioritize the security of your Personal Information. However, no
            method of transmission over the Internet or electronic storage is
            100% secure. While we strive to use commercially acceptable means to
            protect your Personal Information, we cannot guarantee its absolute
            security.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          7. Children’s Privacy
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            Our Service is not intended for children under the age of 13. We do
            not knowingly collect personal information from anyone under 13. If
            you are a parent or guardian and believe your child has provided us
            with Personal Information, please contact us. We will take steps to
            delete such information from our servers.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          8. Third-Party Links
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            Our Service may contain links to third-party websites or services
            that are not owned or controlled by MyCozee. We have no control
            over, and assume no responsibility for, the content, privacy
            policies, or practices of any third-party sites or services
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          9. Limitation of Liability
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            Our Service may contain links to third-party websites or services
            that are not owned or controlled by MyCozee. We have no control
            over, and assume no responsibility for, the content, privacy
            policies, or practices of any third-party sites or services
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          10. Modifications to Terms{" "}
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            We may update these Terms and Conditions from time to time. Any
            changes will be posted on this page with an updated effective date.
            Your continued use of the Service after any modifications
            constitutes acceptance of the new Terms and Conditions.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          11. Governing Law
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            These Terms shall be governed by and construed in accordance with
            the laws laid by the Constitution of India. Any disputes arising
            from or relating to these Terms shall be subject to the exclusive
            jurisdiction of the courts in [your jurisdiction].
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          12. Contact Us
        </h2>
        <ul className="list-disc   pl-6 mb-6">
          <li className="mb-3">
            If you have any questions about these Terms and Conditions, please
            contact us at [support@mycozee.in].
          </li>
        </ul>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default TermsCondition;

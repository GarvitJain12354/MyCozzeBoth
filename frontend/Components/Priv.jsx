import Footer from "./Footer";
import NavBar from "./NavBar";

const Priv = () => {
  return (
    <div>
      <NavBar />
      <div className="px-[15rem] py-16 mt-10 max-md:px-[2rem]">
        <h1 className="text-[#bc2c3d] text-3xl font-bold mb-6">
          MyCozee Privacy Policy
        </h1>
        <p className="mb-6">
          At MyCozee, we are committed to protecting your privacy and ensuring
          that your personal information is handled responsibly. This Privacy
          Policy outlines how we collect, use, store, disclose, and protect your
          information. By using our website, you consent to the practices
          described in this policy.
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          1. Information Collection
        </h2>
        <p className="mb-6">
          We collect information from you when you:
          <ul className="list-disc pl-6">
            <li>Create an account</li>
            <li>Post a listing or seek a flatmate</li>
            <li>Communicate with other users</li>
            <li>Use our services or contact customer support</li>
          </ul>
        </p>
        <p className="mb-6">
          The personal information we may collect includes, but is not limited
          to:
          <ul className="list-disc pl-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Location details</li>
            <li>Payment information (if applicable)</li>
          </ul>
          You can delete your account at any time through your account settings
          or by contacting us at support@mycozee.in. Upon deletion, your
          personal information will be removed from our databases.
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          2. Use of Information
        </h2>
        <p className="mb-6">
          We use your personal information for various purposes, including:
          <ul className="list-disc pl-6">
            <li>Providing and improving our services</li>
            <li>Communicating with you about your account or transactions</li>
            <li>Sending you updates, promotional materials, and newsletters</li>
            <li>Personalizing your experience on our platform</li>
            <li>Verifying your identity and preventing fraud</li>
            <li>Complying with legal obligations</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          3. Disclosure of Information
        </h2>
        <p className="mb-6">
          We do not sell or rent your personal information to third parties.
          However, we may disclose your information in the following
          circumstances:
          <ul className="list-disc pl-6">
            <li>
              To trusted third-party service providers who assist us in
              operating our website and conducting our business (e.g., payment
              processors).
            </li>
            <li>
              If required by law or in response to valid requests by public
              authorities.
            </li>
            <li>
              To protect our rights, privacy, safety, or property, and/or that
              of our users or others.
            </li>
            <li>
              As part of a merger, acquisition, or asset sale, where your
              information may be transferred.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          4. Data Security
        </h2>
        <p className="mb-6">
          We take reasonable measures to protect your personal information from
          unauthorized access, loss, misuse, or alteration. However, please be
          aware that no method of transmission over the Internet or electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your information, we cannot guarantee its absolute
          security.
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          5. International Transfers
        </h2>
        <p className="mb-6">
          Your information may be transferred to, and maintained on, computers
          located outside of your state, province, country, or other
          governmental jurisdiction where the data protection laws may differ.
          If you are located outside India and choose to provide information to
          us, please note that we transfer the data to India and process it
          there. Your consent to this Privacy Policy followed by your submission
          of such information represents your agreement to that transfer.
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          6. Cookies and Tracking Technologies
        </h2>
        <p className="mb-6">
          We use cookies and similar tracking technologies to enhance your
          experience on our website. Cookies are small data files stored on your
          device that help us remember your preferences and understand how you
          use our site. You can manage cookie preferences through your browser
          settings, but disabling cookies may affect your ability to use certain
          features of our website.
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          7. Your Rights
        </h2>
        <p className="mb-6">
          You have the right to:
          <ul className="list-disc pl-6">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of any inaccurate or incomplete data.</li>
            <li>Request deletion of your personal information, subject to certain exceptions.</li>
            <li>Withdraw your consent for data processing at any time.</li>
          </ul>
          To exercise these rights, please contact us at support@mycozee.in.
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          8. Children’s Privacy
        </h2>
        <p className="mb-6">
          Our services are not intended for children under the age of 16. We do
          not knowingly collect personal information from children. If you are a
          parent or guardian and believe that your child has provided us with
          personal information, please contact us. We will take steps to delete
          such information from our records.
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          9. Changes to This Privacy Policy
        </h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page with
          a new effective date. We encourage you to review this Privacy Policy
          periodically for any updates. Your continued use of the website after
          any changes constitutes your acceptance of the revised policy.
        </p>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mt-10 mb-8">
          10. Contact Us
        </h2>
        <p className="mb-6">
          If you have any questions or concerns about this Privacy Policy or our
          practices regarding your personal information, please contact us:
        </p>
        <p className="mb-6 font-semibold">MyCozee Team</p>
        <p>Email: support@mycozee.in</p>
      </div>
      <Footer />
    </div>
  );
};

export default Priv;

import React from 'react';
import Cards from '../../Components/contactus/Cards';
import email from '../../src/assets/email.png';
import office from '../../src/assets/office.png';

const ReachOut = () => {
  return (
    <div className="w-full py-20 ">
      <div className="flex flex-col justify-center">
        <div className="mb-6 text-center md:text-left">
          <button className="bg-[#f4dbde] rounded-full px-4 py-1 mb-3">
            Reach out to us
          </button>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#bc2c3d]">
            We'd love to hear from you
          </h2>
          <p className="text-gray-600 mt-2">
            Or reach out manually to{' '}
            <h1
              href="mailto:mycozee1@gmail.com"
              className="text-[#bc2c3d] underline"
            >
              mycozee1@gmail.com
            </h1>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Cards
            icon={email}
            title="Email support"
            description="Our team can respond in real time"
            linkText="mycozee1@gmail.com"
            linkUrl="mailto:mycozee1@gmail.com"
          />

          <Cards
            icon={office}
            title="Visit our office"
            description="Visit our location in real life"
            linkText="Ashokanagar Road, Guna Madhya Pradesh, 473331"
          />

          <Cards
            icon={email}
            title="Call us directly"
            description="Available during working hours"
            linkText="+91 8871501996"
            linkUrl="tel:+918871501996"
          />
        </div>
      </div>
    </div>
  );
};

export default ReachOut;

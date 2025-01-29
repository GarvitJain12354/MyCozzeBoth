import  { useState } from 'react'

const DropDown = ({securityDeposit,setSecurityDeposit,noticePeriod,setNoticePeriod}) => {

  return (
    <div className='px-2'>
          <div className="flex flex-col gap-4 mt-6  w-full justify-center items-center">
              <div className="w-full">
                <label className="font-bold ">Security Deposit</label>
                <select
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(e.target.value)}
                  className="w-full border-2 border-[#bc2c3d] outline-none p-2 rounded-xl mt-2"
                >
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                </select>
              </div>
              <div className="w-full mt-1">
                <label className="font-bold">Notice Period</label>
                <select
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
                  className="w-full border-2 border-[#bc2c3d] outline-none  p-2 rounded-xl mt-3"
                >
                  <option  value="15 days">15 days</option>
                  <option value="1 months">1 month</option>
                  <option value="3 months">3 months</option>
                </select>
              </div>
            </div>
    </div>
  )
}

export default DropDown
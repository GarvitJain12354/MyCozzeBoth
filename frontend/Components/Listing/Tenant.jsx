import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserListing } from '../../store/Action/User';

const Tenant = () => {
    const { listing, loading, message, error } = useSelector(
        (state) => state.User
      );
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(getUserListing());
      }, []);
  return (
<div className="w-full h-full p-4 flex flex-wrap gap-4">
    {
        listing?.map((i,index)=>{
          return  <Card listing={true} data={i} key={index} index={index}/>
        })
    }
  </div>
  )
}

export default Tenant
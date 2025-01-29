import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListing } from "../../store/Action/User";
import Card from "../Card";
import Loading from "../Loading";

const Property = () => {
  const { listing, loading, message, error } = useSelector(
    (state) => state.User
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserListing());
  }, []);
//   console.log(listing,145);
  
if(loading){
    return <Loading/>
}
  return <div className="w-full h-full p-4 flex flex-wrap gap-4">
    {
        listing?.map((i,index)=>{
          return  <Card listing={true} data={i} key={index} index={index}/>
        })
    }
  </div>;
};

export default Property;

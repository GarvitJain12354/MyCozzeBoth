import React from "react";

const ChatDets = ({data,setreceiverId}) => {
  return <div onClick={()=>setreceiverId(data?._id)} className="w-full cursor-pointer flex  items-center gap-4 border-b-2 p-2">
    <div className="h-10 w-10 rounded-full bg-red-600 relative overflow-hidden">
        <img src={`${data?.avatar?.url}`} alt="img" className="h-full w-full object-cover" />
    </div>
    <h1 className="text-base font-semibold">{data?.firstname} {data?.lastname}</h1>
  </div>; 
};

export default ChatDets;

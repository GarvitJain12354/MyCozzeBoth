import React, { useEffect } from "react";
import Login from "../Components/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { isUser } from "../store/Action/Auth";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";
import { clearError, clearMessage } from "../store/Reducer/Auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user, loading, message, error,isAuthenticated } = useSelector((state) => state.Auth);
  useEffect(() => {
    dispatch(isUser());
  }, []);
  const navigate = useNavigate()
  useEffect(() => {
    if(message){
      toast.success(message)
      dispatch(clearMessage())
    }
    if(error){
      toast.error(error)
      dispatch(clearError())

    }
    // if(isAuthenticated && user){
    //   navigate("/")
    // }
  }, [message,error,isAuthenticated,user,dispatch,loading])
  

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {loading ? <Loading /> : <Login />}
    </div>
  );
};

export default LoginPage;

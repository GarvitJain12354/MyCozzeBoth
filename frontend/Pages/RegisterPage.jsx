import React, { useEffect } from 'react'
import Register from '../Components/Auth/Register'
import { useDispatch, useSelector } from 'react-redux';
import { isUser } from '../store/Action/Auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearError, clearMessage } from '../store/Reducer/Auth';
import Loading from '../Components/Loading';

const RegisterPage = () => {
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
    if(isAuthenticated && user){
      navigate("/")
    }
  }, [message,error,isAuthenticated,user,dispatch,loading])
  
  return (
  loading ? <Loading/> : <Register/>
)
}

export default RegisterPage
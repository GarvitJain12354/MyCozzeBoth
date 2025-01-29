import React, { useEffect } from 'react'
// import Nav from '../../Compnents/Nav'
import Content from '../../Components/viewcities/Content'
import Footer from '../../Components/Footer'
import Cities from '../../Components/viewcities/Cities'
import NavBar from '../../Components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCity } from '../../store/Action/Others'

const ViewCities = () => {
  const dispatch = useDispatch();
  const { city, loading } = useSelector((state) => state.Others);
  useEffect(() => {
    dispatch(getAllCity());
  }, []);

  return (
    <div>
       <NavBar></NavBar>
        <div>
            <Cities city={city}></Cities>
            <Content></Content>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default ViewCities
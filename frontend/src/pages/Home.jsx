import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import CreateListBox from '../components/CreateListBox';
  
const Home = () => {
  const { username,useremail } = useSelector((store) => store.userData);
  const navigate = useNavigate();

   useEffect(() => {
     if (username === "") navigate("/");
   }, []);

  return (
    <div className="flex">
      <Navbar/>
      <CreateListBox/>
    </div>
  )
}

export default Home;
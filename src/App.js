import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();

  // const user = JSON.parse(localStorage.getItem('user'));
  const user = JSON.parse(localStorage.getItem("user"));
  
  useEffect(()=>{
    dispatch(setUser(user))
  },[dispatch, setUser])
  return (
    <>
     <BrowserRouter>
        <ToastContainer/>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/users/:id/verify/:token"  element={<VerifyEmail/>}/>
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;

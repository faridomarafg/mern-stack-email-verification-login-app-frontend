import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import { useEffect } from 'react';
import { emailVerification } from '../features/auth/authSlice';
import { useParams } from 'react-router-dom';

function VerifyEmail() {
  const dispatch = useDispatch();

  const {message, isSuccess} = useSelector((state)=> state.auth); 
  const successMsseage = message.message
  const {id} = useParams();
  const {token} = useParams()

  useEffect(()=>{
    dispatch(emailVerification({id, token}))
    if(isSuccess){
      toast.success(successMsseage)
    }
  },[dispatch,id, token, successMsseage])

  return (
    <div className='pt-[140px] w-full h-screen flex flex-col items-center justify-center'>
        <h1 className='text-3xl text-teal-600 font-playfair'>Your account is verified</h1>
        <h1 className='text-4xl text-teal-600 font-playfair'>Please Login</h1>
        <Link to='/login'>
            <p className='text-4xl font-playfair font-semibold text-slate-400 hover:scale-110 duration-1000'>Longin</p>
        </Link>

    </div>
  )
}

export default VerifyEmail
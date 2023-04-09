import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';
import { login, reset } from '../features/auth/authSlice';


const initialState = {
    email:'',
    password:''
}

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shadowPassword, setShowPassword] = useState(false);

    const [formValue, setFormValue] = useState(initialState);

    const { email, password} = formValue;


    const {isLoading, isError, isSuccess, message, user} = useSelector((state)=> state.auth);

    console.log(message);

    useEffect(()=>{
      if(isError){
        toast.error(message)
      }
      if(isSuccess){
      toast.success('user logged successfully!')
      navigate('/');
      }
    },[isError,isSuccess, message, dispatch, navigate]);


    const togglePasswordVisibility = ()=>{
      setShowPassword(!shadowPassword);
    }

    const onChangeHandler = (e)=>{
       const {name, value} = e.target;
       setFormValue({...formValue, [name]: value})
    }

  const onSubmit =async (e)=>{
    e.preventDefault();

    const userData = {
      email,
      password
    };
    await dispatch(login(userData))
  }



  return (
    <div className='pt-[140px] flex flex-col justify-center w-full items-center'>
        <h1 className='py-8 text-lg md:text-3xl font-playfair font-semibold text-teal-600'>Login</h1>
        <div className=' w-full sm:w-[80%] md:w-[40%] bg-slate-400 border-2 border-slate-700 h-fit p-3 md:p-5 relative shadow-2xl shadow-black sm:rounded-2xl md:rounded-2xl'>
            <form 
                onSubmit={onSubmit}
                className='w-full md:py-10'>

                <input 
                type="email" 
                name="email" 
                placeholder='Email'
                value={email}
                onChange={onChangeHandler}
                className='border-2 border-slate-900 px-3 py-1 w-full rounded-xl outline-none mb-5'
                />

                <div className='relative'>
                <input 
                type={shadowPassword ? "text" : "password"}
                name='password' 
                placeholder='Password'
                autoComplete='off'
                value={password}
                onChange={onChangeHandler}
                className='border-2 border-slate-900 px-3 py-1 w-full rounded-xl outline-none mb-5'
                />
                <div onClick={togglePasswordVisibility}>
                {shadowPassword ?
                <AiFillEye size={20} className='absolute right-1 top-[8px] cursor-pointer text-slate-500'/>:
                <AiFillEyeInvisible size={20} className='absolute right-1 top-[8px] cursor-pointer text-slate-500'/>}
                </div>
                </div>

                <button className='w-full rounded-xl border-2 border-slate-900 py-1 mb-5 text-teal-600'>Login</button>
                <div className='flex items-center'>
                    <p className='font-playfair pr-5 text-slate-200'>Don't have an accound?</p>
                    <p className='font-playfair text-teal-600 font-semibold text-sm md:text-xl hover:scale-110 duration-1000'>
                      <Link to='/register'>Register</Link>
                    </p>
                </div>
                {message === 'An Email sent to your account please verify your account' ? message : ''}
            </form>
        </div>
    </div>
  )
}

export default Login
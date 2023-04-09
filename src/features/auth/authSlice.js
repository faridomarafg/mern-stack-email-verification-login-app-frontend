import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import authService from './authService';


const  initialState ={
    user:null,
    isLoading : false,
    isError : false,
    isSuccess : false,
    message : ''
};

//Login User
export const login = createAsyncThunk('auth/login', async(userData, thunkAPI)=>{
    try {
        const response = await authService.login(userData);
        return response.data
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)     
    }
});



//Register User
export const register = createAsyncThunk('auth/register', async(userData, thunkAPI)=>{
    try {
        const response = await authService.register(userData);
        return response.data
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)     
    }
});


//Email-verificationn
export const emailVerification = createAsyncThunk('auth/emailVerification', async({id,token}, thunkAPI)=>{
    try {
        const response = await authService.emailVerification(id, token);
        return response.data
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)     
    }
});

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state, action)=>{
           state.user = action.payload 
        },
        setLogout:(state)=>{
          localStorage.clear();
          state.user= null  
        },
        reset :(state)=>{
         state.isLoading = false
         state.isError = false
         state.isSuccess = false
         state.message = ''
        }
    },
    extraReducers:(builder)=>{
     builder

     //Register user
     .addCase(register.pending, (state)=>{
       state.isLoading = true
     })
     .addCase(register.fulfilled, (state, action)=>{
      state.isLoading = false
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.isSuccess = true
      state.user = action.payload
      state.message = action.payload
      console.log(action.payload);
    })
    .addCase(register.rejected, (state, action)=>{
      state.isLoading = false
      state.isError = true
      state.user = null
      state.message = action.payload  
    }) 

    //Login  user
    .addCase(login.pending, (state)=>{
    state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action)=>{
    state.isLoading = false
    localStorage.setItem("user", JSON.stringify({ ...action.payload }));
    state.user = action.payload
    state.isSuccess = true
    })
    .addCase(login.rejected, (state, action)=>{
    state.isLoading = false
    state.isError = true
    state.user = null
    state.message = action.payload  
    })
   
    //Email verification
    .addCase(emailVerification.pending, (state)=>{
    state.isLoading = true
    })
    .addCase(emailVerification.fulfilled, (state, action)=>{
    state.isLoading = false
    localStorage.setItem("user", JSON.stringify({ ...action.payload }));
    state.isSuccess = true
    state.user = action.payload
    state.message = action.payload
    })
    .addCase(emailVerification.rejected, (state, action)=>{
    state.isLoading = false
    state.isError = true
    state.user = null
    state.message = action.payload  
    }) 
    }
});


export const {setUser, setLogout, reset} = authSlice.actions;

export default authSlice.reducer;
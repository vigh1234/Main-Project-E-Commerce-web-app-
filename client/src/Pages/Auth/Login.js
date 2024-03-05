import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import './Login.css'
import {useNavigate,useLocation, Link} from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../context/auth'

function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [auth,setAuth]=useAuth()
    const [error,setError]=useState('')
    const navigate=useNavigate()
    const location=useLocation()

    const handleEmail=(event)=>{
        setEmail(event.target.value)
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value)
    }
    //timer
    useEffect(()=>{
      if(error){
          setTimeout(()=>{
              setError('');
          },5000)
      }
      return ()=>clearTimeout(setTimeout)
    },[error])

    const handleChange=()=>{
      if(email!='' || password!='')
      setError('')
    }
    //form control
    const handleSubmit=async (e)=>{
          e.preventDefault()
          // useEffect=(()=>{
          //   setInterval=(()=>{
          //       setError('')
          //   },1000)
          // })  
          try {
            const res =await axios.post('http://localhost:8080/api/v1/auth/login',{email,password}) 
            if(res.data && res.data.success){
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state||'/');
            }
            else{
               setError('Incorrecet Password') 
            }
        
        } catch (error) {
            setError('Email not Registered')
          }
          if(!email || !password){
            setError('Invalid Email or Password')
          }
    };

  return (
    <Layout title={'register'}>
        <div className='register1 '>
            <div className='wrapper'>
            <h1>Login</h1>

            <form onChange={handleChange} onSubmit={handleSubmit}>
                  <div className=" input-box">
                      <input type="email" value={email} onChange={handleEmail} placeholder='Email Address'></input>
                      {/* <FaUser className='icon' /> */}
                  </div>
                  <div className=" input-box">
                      <input type="password" value={password} onChange={handlePassword} placeholder='Password'></input>
                      {/* <FaLock className='icon' /> */}
                  </div>
                  <div className='error'>{error}</div>
                  <div className='mb-3 register-link '>
                    <p className='mt-3'>Don't have an account? <Link to ='/register'>Register</Link></p>
                  </div>
                  <button type="submit mb-3">Login</button>
              </form>
              </div>
        </div>
    </Layout>
  )
}

export default Login

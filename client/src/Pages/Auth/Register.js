import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
import './Register.css'

function Register() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')
    // const [error,setError]=useState('')
    const navigate=useNavigate()
    //error
    const [nameError,setNameError]=useState('')
    const [emailError,setEmailError]=useState('')
    const [emailValidationError,setEmailValidationError]=useState('')
    const [passwordError,setPasswordError]=useState('')
    const [phoneError,setPhoneError]=useState('')
    const [phoneValidationError,setPhoneValidationError]=useState('')
    const [addressError,setAddressError]=useState('')

    const handleName=(event)=>{
        setName(event.target.value)
    }
    const handleEmail=(event)=>{
        setEmail(event.target.value)
    }
    const handlePassword=(event)=>{
        setPassword(event.target.value)
    }
    const handlePhone=(event)=>{
        setPhone(event.target.value)
    }
    const handleAddress=(event)=>{
        setAddress(event.target.value)
    }

    useEffect(()=>{
        if(nameError,emailError,passwordError,phoneError,addressError){
            setTimeout(()=>{
                setNameError(''),setEmailError(''),setPasswordError(''),setPhoneError(''),setAddressError('');
            },5000)
        }
        return ()=>clearTimeout(setTimeout)
    },[nameError,emailError,passwordError,phoneError,addressError])

    useEffect(()=>{
            if(emailValidationError){
                setTimeout(()=>{
                    setEmailValidationError('')
                },4000)
            }
            return ()=>clearTimeout(setTimeout)
    },[emailValidationError])

    useEffect(()=>{
        if(phoneValidationError){
            setTimeout(()=>{
                setPhoneValidationError('')
            },4000)
        }
        return ()=>clearTimeout(setTimeout)
    },[phoneValidationError])

    //form control
    const handleSubmit=async (e)=>{
          e.preventDefault() 
          const regEx=/[a-zA-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
          if(!regEx.test(email)&& email!=''){
            setEmailValidationError('Invalid email address')
          }
          const regEx1=/^[0-9]{10}$/;
          if(!regEx1.test(phone) && phone!=''){
            setPhoneValidationError('Invalid Phone Number')
          }
        
          
          try {
                const res =await axios.post('http://localhost:8080/api/v1/auth/register',{name,email,password,phone,address}) 
                    if(res && res.data.success){

                        navigate('/login') 
                    }
                                  
                else{
                    //  setEmailError('Email already in use')
                }
            
            } catch (error) {
                console.log(error)
            }
         
          //validation
          if(!name){
            setNameError('Please Enter Username')
          }
         if(!email){
            setEmailError('Please Enter Email Address')
          }
         if(!password){
            setPasswordError('Please Enter Password')
          }
         if(!phone){
            setPhoneError('Please Enter Phone No:')
          }
         if(!address){
            setAddressError('Please Enter Address')
          }
    }
    const handleChange=()=>{
        if(name!=''){
            setNameError('')
        }
        if(email!=''){
            setEmailError('')
        }
        if(password!=''){
            setPasswordError('')
        }
        if(phone!=''){
            setPhoneError('')
        }
        if(address!=''){
            setAddressError('')
        }
    }
  return (
    <Layout title={'register'}>
        <div className='register'>
            <div className='wrap'>
            <h1>Sign Up</h1>

            <form onChange={handleChange} onSubmit={handleSubmit}>
                  <div class="input-box1 mb-2">
                      <input type="text" value={name} onChange={handleName} placeholder='Username'></input><div className='error1 mb-2'>{nameError}</div>
                  </div>
                  <div class="input-box1 mb-4">
                      <input type="email" value={email} onChange={handleEmail}  placeholder='Email Address'></input><div className='error1 mb-2 '>{emailError}{emailValidationError}</div>
                  </div>
                  <div class="mb-4 input-box1 ">
                      <input type="password1" value={password} onChange={handlePassword}  placeholder='Password'></input><div className='error1 mb-2 '>{passwordError}</div>
                  </div>
                  <div class=" input-box1 mb-4">
                      <input type="long" value={phone} onChange={handlePhone}  placeholder='Phone No:'></input><div className='error1 mb-2 '>{phoneError}{phoneValidationError}</div>
                  </div>
                  <div class=" input-box1 mb-4">
                      <input type="text" value={address} onChange={handleAddress}  placeholder='Address'></input><div className='error1 mb-2 '>{addressError}</div>
                  </div>
                  
                  <button type="submit mt-5">Register</button>
              </form>
              </div>
        </div>
    </Layout>
  )
}

export default Register

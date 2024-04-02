import React, { useState,useEffect } from 'react'
import Layout from './../Components/Layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react";
import './CartPage.css'

function CartPage() {
    const [auth,setAuth]=useAuth()
    const [cart,setCart]=useCart()
    const navigate=useNavigate()
    const [clientToken,setClientToken] = useState('')
    const [instance,setInstance]=useState('')
    const [loading,setLoading] =useState(false)
    //total price
    const totalPrice=()=>{
        try {
            let total =0
            cart?.map(item =>(total = total + item.price))
            return total
        } catch (error) {
            console.log(error)
        }
    }
    //remove item
    const removeCartItem=(pid)=>{
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart',JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
    // get payment gateway
    const getToken=async()=>{
        try {
            const {data} =await axios.get('http://localhost:8080/api/v1/product/braintree/token')
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getToken();
    },[auth?.token])

    const handlePayment=async()=>{
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
              nonce,
              cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
    }
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
           <div className='col-md-12'>
                <h2 className='text-center mt-2 p-2 mb-2'>
                    {`Hello ${auth?.token && auth?.user?.name}`}
                </h2>
                <h5 className='text-center'>
                    {cart?.length ? `you have ${cart.length} items in your cart ${auth?.token ? '' : "Please login to checkout"}`: 'Your cart is empty'}
                </h5>
           </div>
        </div>
        <div className='row '>
            <div className='col-md-8'>
                <div className='row '>
                    <div className='col-md-8'>
                        {
                            cart?.map( p =>(
                                <div className='row m-2 mb-2 cartCard card mt-4 flex-row'>
                                    <div className='col-md-3 mt-2'><img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'10px'} height={'150px'}/></div>
                                    <div className='col-md-8'>
                                        <h6 className='mt-3'>{p.name}</h6>
                                        <p className='prodctdesc'>{p.description.substring(0,30)}</p>
                                        <h4 className='prodctprce'>{p.price}</h4>
                                        <button className='btn btn-danger btn-sm mt-2' onClick={()=>removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='col-md-4 text-center'>
                <h2>Cart summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr/>
                <h4>Total : {totalPrice()}</h4>
                {auth?.user?.address?(
                    <>
                    <div className='mb-3'>
                        <h4>Current Address</h4>
                        <h5>{auth?.user?.address}</h5>
                        <button className='btn btn-warning' onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                    </div>
                    </>
                ): (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                  <div className='mt-2'>
                    {
                        !clientToken || !cart?.length ? ('') : (
                            <>
                             <DropIn
                            options={{
                                authorization: clientToken,
                             paypal: {
                                flow: "vault",
                            },
                            }}
                             onInstance={(instance) => setInstance(instance)}/>
                        <button className='btn btn-primary' disabled={ !instance || !auth?.user?.address} onClick={handlePayment}>
                       {loading ? 'Processing...' : 'make payment'}</button>
                            </>
                        )
                    }
                 
                  </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage

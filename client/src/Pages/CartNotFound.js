import React from 'react'
import {Link} from 'react-router-dom'
import './CartNotFound.css'
import Footer from '../Components/Layout/Footer'

function CartNotFound() {
  return (
    <>
    <div className=' container-fluid cartnotfound'> 
    </div>
    <div className='text-center cartnotfoundheader'>
    <h2>Missing cart items?</h2>
      <h5>Login to see the items you added previously</h5>
      <Link to='/login'><button className='btn  mt-1 loginButton'>Login</button></Link>
    </div>
    <div className='footer1'>
        <Footer/>
    </div>
    </>
  )
}

export default CartNotFound

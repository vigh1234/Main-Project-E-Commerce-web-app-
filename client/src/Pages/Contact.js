import React from 'react'
import './Contact.css'
import Layout from '../Components/Layout/Layout'

function Contact() {
  return (
   <Layout title={'Contact Us'}>
    <div className='row contactus mt-5'>
      <div className='col-md-6'>
        <img src='/images/contact.jpg' width={'100%'}></img>
      </div>
      <div className="col-md-4 mt-5">
          <h1 className="bg-dark p-2 text-white text-center ">CONTACT US</h1>
          <p className="text-justify mt-2 ms-2">
            Any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
          <i class="fa-solid fa-envelope ms-2" style={{color: " #111213"}}></i> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
          <i class="fa-solid fa-phone ms-2" style={{color: " #111213"}}></i>  : 012-3456789
          </p>
          <p className="mt-3">
          <i class="fa-solid fa-headset ms-2" style={{color: " #111213"}}></i>  : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
   </Layout>
  )
}

export default Contact

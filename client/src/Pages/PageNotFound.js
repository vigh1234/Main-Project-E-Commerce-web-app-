import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css'
import Footer from '../Components/Layout/Footer'

function PageNotFound() {
  return (
      <>
        <div className='container-fluid pageNotfound'></div>
          <div className='text-center pageNotfoundHeader'>
          <h1 className='bold'>404</h1>
          <h2 className='pnf-heading'>Oops ! page Not Found</h2>
          <Link to='/' className='btn pnf-btn'>Go to Homepage</Link>
          </div>
          <div className='footer2'>
            <Footer/>
        </div>
      </>
  )
}

export default PageNotFound

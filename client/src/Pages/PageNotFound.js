import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css'

function PageNotFound() {
  return (
        <div className='pnff'>
          <nav className="navbar pnf nav-header navbar-expand-lg bg-body-tertiary"></nav>
          <div>
          <h1 className='pn-title'>404</h1>
          <h2 className='pnf-heading'>Oops ! page Not Found</h2>
          <Link to='/' className='pnf-btn'>Go Back</Link>
          </div>
          
        </div>
  )
}

export default PageNotFound

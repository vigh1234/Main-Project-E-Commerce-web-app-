import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import './Header.css'
import SearchInput from '../form/SearchInput'
import UseCategory from '../../hooks/useCategory'
import { useCart } from '../../context/Cart'
import {Badge} from 'antd'




function Header() {
  const [auth,setAuth]=useAuth()
  const [cart] =useCart()
  const categories = UseCategory()
  const handleLogout=() =>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    localStorage.removeItem('auth')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to='/contact' className="navbar-brand text-dark" href="#"><i class="fa-brands fa-shopify me-3"></i>Ecommerce App</Link>
            <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
              <SearchInput/>
              <li className="nav-item">
                <Link to='/' className="nav-link active text-dark me-3" aria-current="page" >Home</Link>
              </li>
              <li className="nav-item dropdown ">
                <Link
                  className="nav-link dropdown-toggle text-dark"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.name}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
                
              {
                !auth.user ? (<> <div class="dropdown">
                <button class="btn  dropdown-toggle" type="button"  data-bs-toggle="dropdown">Account</button>
                <ul class="dropdown-menu" >
                  <li><Link to='/login' class="dropdown-item" >Login</Link></li>
                  <li><Link to='/register' class="dropdown-item" >Register</Link></li>
                </ul>
              </div></>) : (<><div class="dropdown">
                <button class="btn  dropdown-toggle" type="button"  data-bs-toggle="dropdown">{auth?.user?.name}</button>
                <ul class="dropdown-menu" >
                <li><Link  to={`/dashboard/${auth?.user?.role === 1 ? 'admin' :'user'}`} class="dropdown-item" >Dashboard</Link></li>
                  <li><Link onClick={handleLogout} to='/login' class="dropdown-item" >Logout</Link></li>
                </ul>
              </div></>)
              }
             {!auth.user ? (<> <Link to='/cartnotfound' className="nav-link text-dark me-3"><i class="fa-sharp fa-solid fa-cart-shopping"></i></Link></>)
              : (<><li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <Link to='/cart' className="nav-link text-dark me-3"><i class="fa-sharp fa-solid fa-cart-shopping"></i></Link>
                </Badge> 
              </li></>)}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header

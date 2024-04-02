import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'
import UseCategory from '../hooks/useCategory'
import './Category.css'

function Categories() {
    const categories = UseCategory()
  return (
    <Layout>
      <div className='row'>
        {categories.map(c=>(
            <div className='col-md-4' key={c._id}>
              <div className='card ctgrycard'>
                  <Link to={`/category/${c.name}`}><h5 className='ctgrynme'>{c.name}</h5></Link>
              </div>
            {/* <button className='text-white btn'><Link className='btn btn-primary' to={`/category/${c.name}`}>{c.name}</Link></button> */}
        </div>
        ))}
        
      </div>
    </Layout>
  )
}

export default Categories

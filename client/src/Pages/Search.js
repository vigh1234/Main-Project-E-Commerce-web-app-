import React from 'react'
import Layout from './../Components/Layout/Layout'
import { useSearch } from '../context/Search'

function Search() {
    const [values,setValues]=useSearch()
  return (
    <Layout title={'search results'}>
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>{values?.results.length< 1 ? 'No products' : `Found ${values?.results.length}`}</h6>
                <div className='d-flex flex-wrap mt-4'>
              {values?.results.map((p) => (
                        <div className='card m-2' style={{width: '18rem'}}>
                        <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'30px'} height={'250px'}/>
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}</p>
                            <p className="card-text">${p.price}</p>
                            <button className='btn btn-primary me-2'>More Details</button>
                            <button className='btn btn-secondary me-2'>Add to Cart</button>
                        </div>
                    </div>     
                ))}
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search

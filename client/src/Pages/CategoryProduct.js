import Layout from '../Components/Layout/Layout'
import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'

function CategoryProduct() {
    const [products,setProducts]= useState([])
    const [category,setCategory]= useState([])
    const params = useParams()
    const navigate= useNavigate()

    useEffect(()=>{
        if(params?.name) getProductByCat()
    },[])

    const getProductByCat =async()=>{
        try {
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.name}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
      <div className='container'>
        <h4 className='text-center mt-3'>Catgegory -{category?.name}</h4>
        <h6 className='text-center mt-3'>{products?.length} result found</h6>
        <div className='row'>
        <div className='col-md-12'>
              <h2 className='text-center'>Products</h2>
              <div className='d-flex flex-wrap'>
              {products?.map((p) => (
                        <div className='card m-2' style={{width: '18rem'}}>
                        <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'10px'} height={'200px'}/>
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}</p>
                            <p className="card-text">${p.price}</p>
                            <button className='btn btn-primary me-2' onClick={()=>navigate(`/product/${p.name}`)}>More Details</button>
                            <button className='btn btn-secondary me-2'>Add to Cart</button>
                            
                        </div>
                    </div>     
                ))}
              </div>
              {/* <div className="m-2 p-3">
                {products && products.length <total && (
                  <button className="btn btn-warning" onClick={(e)=>{e.preventDefault(); setPage(page+1)}}>
                    {loading ? 'Loading' : 'load more'}
                  </button>
                )}
              </div> */}
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct

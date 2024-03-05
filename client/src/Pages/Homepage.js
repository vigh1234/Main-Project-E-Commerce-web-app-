import React, { useState, useEffect } from "react";
import Layout from "./../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Checkbox,Radio} from 'antd'
import { Prices } from "../Components/Prices";


function Homepage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)

  
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal()
  }, []);



  //get product
  const getAllProduct= async()=>{
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

   //get count
   const getTotal=async()=>{
    try {
      const {data}=await axios.get('http://localhost:8080/api/v1/product/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(page==1) return 
    loadMore()
  },{page})
  
  //load more
  const loadMore=async(req,res)=>{
    try {
      setLoading(true)
      const {data}=await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products,...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //filter by category
  const handleFilter=(value,id)=>{
    let all=[...checked]
    if(value){
      all.push(id)
    }
    else{
      all = all.filter(c => c!==id)
    }
    setChecked(all);
  }
  useEffect(()=>{
   if(!checked.length || !radio.length) getAllProduct()
  },[checked.length,radio.length])

  useEffect(()=>{
    if(checked.length || radio.length) filterProducts()
  },[checked,radio])
  
  //filtered product
  const filterProducts=async()=>{
    try {
      const {data} =await axios.post(`http://localhost:8080/api/v1/product/product-filter`,{checked,radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }
  return (
        <Layout title={'Shop Now'}>
          <div className='row mt-3'>
            <div className='col-md-3'>
              <div className='text-center'>
                <h4>Filter By Category</h4>
                <div className='d-flex flex-column'>
                {categories?.map(c=>(
                  <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked, c._id)}>
                    {c.name}
                  </Checkbox>
                ))}
                </div>
                <h4>Filter By Price</h4>
                <div className='d-flex flex-column mt-2'>
                    <Radio.Group onChange={e => setRadio(e.target.value)}>
                      {Prices?.map(p=>(
                        <div key={p._id}>
                          <Radio value={p.array}>{p.name}</Radio>
                        </div>   
                      ))}
                    </Radio.Group>
                </div>
                <div className="d-flex flex-column">
                  <button className="btn btn-danger mt-3" onClick={()=>window.location.reload()}>Reset Filter</button>
                </div>
              </div>
            </div>
            <div className='col-md-9'>
              <h2 className='text-center'>Products</h2>
              <div className='d-flex flex-wrap'>
              {products?.map((p) => (
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
              <div className="m-2 p-3">
                {products && products.length <total && (
                  <button className="btn btn-warning" onClick={(e)=>{e.preventDefault(); setPage(page+1)}}>
                    {loading ? 'Loading' : 'load more'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Layout>  
  )
}

export default Homepage

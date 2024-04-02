import React,{useState,useEffect} from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import {Select} from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const {Option}=Select

function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const [priceError,setPriceError] =useState('')
  const [quantityError,setQuantityError] =useState('')
  const navigate = useNavigate()

  //get category
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
  }, []);

  //create product
  const handleCreate = async (e) => {
     e.preventDefault()

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } =await axios.post("http://localhost:8080/api/v1/product/create-product",productData);
      
      if (data?.success) {
        navigate("/dashboard/admin/products");
      } else {
       console.log(error)
      }
    } catch (error){
      if(!name || !description || !price  || !quantity || !photo || !category){
        setError('All fields Required')
      }
      if(price <=0){
        setPriceError('Price must be a positive value')
      }
      if(quantity <=0){
        setQuantityError('Quantity must be a positive value')
      }
      if(!price){
        setPriceError('')
      }

      if(!quantity){
        setQuantityError('')
      }
     
    }
  };
  useEffect(()=>{
    if(error){
      setTimeout(()=>{
         setError('')
      },4000)
    }
  },[error])
  useEffect(()=>{
    if(priceError){
     setTimeout(()=>{
        setPriceError('')
     },4000)
    }
  },[priceError])

  useEffect(()=>{
    if(quantityError){
      setTimeout(()=>{
        setQuantityError('')
      },4000)
    }
  },[quantityError])



  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9'>
                <h1>Create Product</h1>
                <div className='m-1 w-75'>
                <Select bordered={false} placeholder="Select a category" size="large" showSearch
                className="form-select mb-3" onChange={(value) => {setCategory(value);}}>
                {categories?.map((c)=> (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className='mb-3'>
                <label className='btn btn-outline-secondary'>
                  {photo ? photo.name :'Upload Photo'}
                  <input type='file' name='photo' accept='image/*' onChange={(e)=> setPhoto(e.target.files[0])} hidden></input>
                </label>
              </div>
              <div className='mb-3'>
                  {photo && (
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='product image'
                       height={'200px'} className='img img-responsive'/>
                    </div>
                  )}
              </div>
              <div className='mb-3'>
                <input type='text-area' value={name} placeholder='Enter Name' 
                className='form-control' onChange={(e)=>setName(e.target.value)}></input>
              </div>
              </div>
              <div className="mb-3 w-75">
                <textarea
                  type="text" value={description}placeholder="Enter description"
                  className="form-control" onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3 w-75">
                <input
                  type="number" value={price} placeholder="Price"
                  className="form-control" onChange={(e) => setPrice(e.target.value)}
                />
                <div style={{color:'red'}}>{priceError}</div>
              </div>
              <div className="mb-3 w-75">
                <input
                  type="number" value={quantity} placeholder="Quantity"
                  className="form-control" onChange={(e) => setQuantity(e.target.value)}
                />
                <div style={{color:'red'}}>{quantityError}</div>
              </div>
              <div className="mb-3 w-75">
                <Select
                  bordered={false} placeholder="Select Shipping " size="large" showSearch
                  className="form-select mb-3" onChange={(value) => {setShipping(value);}}>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className='mb-3' style={{color:"red"}}>{error}</div>
              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handleCreate}>create Product</button>
              </div>
            </div>
          </div>
        </div> 
    </Layout>
  )
}

export default CreateProduct

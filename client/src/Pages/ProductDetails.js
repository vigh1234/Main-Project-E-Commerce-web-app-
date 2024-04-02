import React, {useState,useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom';


function ProductDetails() {
    const params = useParams()
    const [product,setProduct] =useState({})
    const [relatedProduct,setRelatedProducts] = useState([])
    
    useEffect(() => {
        if (params?.name) getProduct();
      }, [params?.name]);
      //getProduct
      const getProduct = async () => {
        try {
          const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.name}`);
          setProduct(data?.product);
          getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
          console.log(error);
        }
      };

      //get similar products
      const getSimilarProduct = async (pid,cid) => {
        try {
          const { data } = await axios.get(`http://localhost:8080/api/v1/product/related-products/${pid}/${cid}`);
          setRelatedProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
      };
      
  return (
    <Layout>
      <div className='row mt-5'>
        <div className='col-md-3 ms-5'><img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} width={'20px'} height={'230px'}/></div>
        
        <div className='col-md-7 '>
            <h1 className='text-center'>Product Details</h1>
            <h5 className='ms-5'>Name :{product.name}</h5>
            <h5 className='ms-5'>Description :{product.description}</h5>
            <h5 className='ms-5'>Price :{product.price}</h5>
            <h5 className='ms-5'>Category :{product.category?.name}</h5>
            <button className='btn btn-secondary me-2 ms-5'>Add to Cart</button>
            
        </div>
      </div>
      <div className='row ms-5 mt-5 container'>
        <h5>Similar Products</h5>
        {relatedProduct.length < 1 && <p className='text-center'>No similar Products</p>}
        {relatedProduct?.map((p) => (
                        <div className='card m-2' style={{width: '18rem'}}>
                        <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'10px'} height={'200px'}/>

                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}</p>
                            <p className="card-text">${p.price}</p>
                            {/* <button className='btn btn-primary me-2' onClick={()=>navigate(`/product/${p.name}`)}>More Details</button> */}
                            <button className='btn btn-secondary me-2'>Add to Cart</button>
                        </div>
                    </div>     
                ))}
              </div>
    </Layout>
  )
}

export default ProductDetails

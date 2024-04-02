const productModel = require("../models/productModel")
const categoryModel = require('../models/categoryModel')
const fs=require('fs')
const braintree = require('braintree')
const orderModel =require('../models/orderModel')
const dotenv=require('dotenv')

dotenv.config()

//payment
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// const createProductController=async(req,res)=>{
//   try {
//       const {name,description,price,category,quantity,shipping}=req.fields
//       const {photo}=req.files
//       //validation
//       switch (true) {
//           case !name:
//               return res.status(500).send({error:'Name is required'})

//           case !description:
//               return res.status(500).send({error:'description is required'})

//           case !price:
//               return res.status(500).send({error:'price is required'})

//           case !category:
//               return res.status(500).send({error:'category is required'})

//           case !quantity:
//               return res.status(500).send({error:'quantity is required'})

//           case photo && photo.size > 1000000:
//               return res.status(500).send({error:'Photo is required and should be less than 1mb'})
//       }
//       const products=new productModel({...req.fields})
//       if(photo){
//           products.photo.data=fs.readFileSync(photo.path)
//           products.photo.contentType= photo.type
//       }
//       await products.save()
//       res.status(201).send({
//           success:true,
//           message:'Product added successfully',
//           products
//       })
//   } catch (error) {
//       console.log(error)
//       res.status(500).send({
//           success:false,
//           error,
//           message:'error in creating products'
//       })
//   }
// }


const createProductController=async(req,res)=>{
    try {
        const {name,description,price,category,quantity,shipping}=req.fields
        const {photo}=req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({error:'Name is required'})

            case !description:
                return res.status(500).send({error:'description is required'})

            case !price:
                return res.status(500).send({error:'price is required'})
            
            case price <=0:
                return res.status(500).send({error:'price must be a positive value'})

            case !category:
                return res.status(500).send({error:'category is required'})

            case !quantity:
                return res.status(500).send({error:'quantity is required'})
            
            case quantity <=0:
                return res.status(500).send({error:'Quantity must be a positive value'})
            
            case !photo:
                return res.status(500).send({error:'Photo is required'})

            case photo && photo.size > 1000000:
                return res.status(500).send({error:'Photo is required and should be less than 1mb'})
        }
        const products=new productModel({...req.fields})
        if(photo){
            products.photo.data=fs.readFileSync(photo.path)
            products.photo.contentType= photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product added successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in creating products'
        })
    }
}

//get product
const  getproductController=async(req,res)=>{
    try {
        const products=await productModel.find({}).populate('category').select('-photo').limit(12).sort({createrAt:-1})
        res.status(200).send({
            success:true,
            count:products.length,
            message:'all products',
            products
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting prodcut',
            error
        })
    }
}
//get single product
const getSingleProduct=async(req,res)=>{
    try {
       const product=await productModel.findOne({name:req.params.name}).select('-photo').populate('category')
       res.status(200).send({
        success:true,
        message:'single product fetched',
        product
       })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while getting single product",
            error
        })
    }
}

//get photo
const productPhotoController=async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting photo',
            error
        })
    }
}

//delete product
const deleteProductController=async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success:true,
            message:'product deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deleting product',
            error
        })
    }
}

//update product
const updateProductController=async(req,res)=>{
  try {
      const {name,description,price,category,quantity,shipping}=req.fields
      const {photo}=req.files
      //validation
      switch (true) {
          case !name:
              return res.status(500).send({error:'Name is required'})

          case !description:
              return res.status(500).send({error:'description is required'})

          case !price:
              return res.status(500).send({error:'price is required'})

          case price <=0:
              return res.status(500).send({error:'price must be a positive value'})

          case !category:
              return res.status(500).send({error:'category is required'})

          case !quantity:
              return res.status(500).send({error:'quantity is required'})
          
          case quantity <=0:
              return res.status(500).send({error:'Quantity must be a positive value'})

          case photo && photo.size > 1000000:
              return res.status(500).send({error:'Photo is required and should be less than 1mb'})
      }
      const products= await productModel.findByIdAndUpdate(req.params.pid,{...req.fields},{new:true})
          
      if(photo){
          products.photo.data=fs.readFileSync(photo.path)
          products.photo.contentType= photo.type
      }
      await products.save()
      res.status(201).send({
          success:true,
          message:'Product updated successfully',
          products
      })
  } catch (error) {
      console.log(error)
      res.status(500).send({
          success:false,
          error,
          message:'error in updating products'
      })
  }
}
//filter
const productFilterController=async(req,res)=>{
    try {
        const {checked,radio}=req.body
        let args={}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price= {$gte: radio[0],$lte:radio[1]}
        const products =await productModel.find(args)
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'error while filtering product',
            error
        })
    }
}

//product count 
const productCountController=async(req,res)=>{
    try {
       const total = await productModel.find({}).estimatedDocumentCount() 
       res.status(200).send({
        success:true,
        total
       })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in message count',
            error
        })
    }
}
//product list base on page
const productListController=async(req,res)=>{
    try {
       const perPage = 7
       const page =req.params.page ? req.params.page :1
       const products =await productModel.find({}).select('-photo').skip((page-1)* perPage).limit(perPage).sort({createrAt:-1}) 
       res.status(200).send({
        success:true,
        products
       })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'error in per page ontroller',
            error
        })
    }
}//search product
 const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await productModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };
//related product

const relatedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const products = await productModel
        .find({
          category: cid,
          _id: { $ne: pid },
        })
        .select("-photo")
        .limit(12)
        .populate("category");
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error while geting related product",
        error,
      });
    }
  };

  //get product by category
  const productCategoryController=async(req,res)=>{
    try {
        const category= await categoryModel.findOne({name:req.params.name})
        const products = await productModel.find({category}).populate('category')
        res.status(200).send({
            success:true,
            category,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while fetching product by category',
            error
        })
    }
  }
//payment gateway
//token
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};


module.exports={createProductController,
    getproductController,
    getSingleProduct,
    productPhotoController,deleteProductController,updateProductController,
    productFilterController,productCountController,productListController,
    searchProductController,relatedProductController,productCategoryController,
    braintreeTokenController,braintreePaymentController}
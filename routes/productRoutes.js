const express=require('express')
const { requireSignIn, isAdmin } = require('../middleWares/authMidddleware')
const { createProductController, getproductController, getSingleProduct, 
    productPhotoController, deleteProductController, updateProductController, 
    productFilterController, productCountController, productListController, searchProductController, 
    relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController } = require('../controllers/productController')
const formidable=require('express-formidable')

const router=express.Router()

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//get products
router.get('/get-product', getproductController)

//single product
router.get('/get-product/:name',getSingleProduct)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete product
router.delete('/delete-product/:pid',deleteProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//filter route
router.post('/product-filter', productFilterController)

//product count
router.get('/product-count', productCountController)

//product per page
router.get('/product-list/:page',productListController)

//search product
router.get('/search/:keyword', searchProductController)

//similar products
router.get('/related-products/:pid/:cid', relatedProductController)

//category wise product
router.get('/product-category/:name',productCategoryController)

//payment
//token
router.get('/braintree/token', braintreeTokenController)

//payment
router.post('/braintree/payment',requireSignIn, braintreePaymentController)


module.exports=router
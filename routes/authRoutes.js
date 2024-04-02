const express=require('express')
const {registerController,loginController,testController, updateProfileController, getOrderController, getAllOrdersController, orderStatusController} =require('../controllers/authController')
const {isAdmin,requireSignIn}=require('../middleWares/authMidddleware')


const router=express.Router()

//register
router.post('/register',registerController)
//login
router.post('/login',loginController)
//get
router.get('/test', requireSignIn,isAdmin,testController)

//protected user route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
//protected admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//update profile
router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get('/orders', requireSignIn, getOrderController)

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);
  

module.exports=router
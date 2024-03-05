const express=require('express')
const {registerController,loginController,testController} =require('../controllers/authController')
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

module.exports=router
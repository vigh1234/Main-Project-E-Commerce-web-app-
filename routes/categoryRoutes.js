const express=require('express')
const { requireSignIn, isAdmin } = require('../middleWares/authMidddleware')
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteController } = require('../controllers/categoryController')

const router=express.Router()
//create category
router.post('/create-category', requireSignIn,isAdmin, createCategoryController)

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get all category
router.get('/get-category',categoryController)

//single category
router.get('/single-category/:name',singleCategoryController)

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin, deleteController)


module.exports=router
const { request } = require("express")
const categoryModel = require("../models/categoryModel")

const createCategoryController=async (req,res)=>{
    try {
        const {name}=req.body
        if(!name){
            return res.status(401).send({message:'name is required'})
        }
        const existingCategory =await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'Category already exist'
            })
        }
        const category= await new categoryModel({name}).save()
        res.status(201).send({
            success:true,
            message:'New category created',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in category'
        })
    }
}

const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params
        const category=await categoryModel.findByIdAndUpdate(id,{name},{new:true})
        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error while updating category'
        })
    }
}
//get all category
const categoryController=async(req,res)=>{
    try {
        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'All category List',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting categories"
        })
    }
}
//single category
const singleCategoryController=async(req,res)=>{
    try {
        const category=await categoryModel.findOne({name:req.params.name})
        res.status(200).send({
            success:true,
            message:'success',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            error,
            message:'Error while getting category'
        })
    }
}
//delete category
const deleteController=async(req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'category deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deleting category',
            error
            
        })
    }
}

module.exports={createCategoryController,
                updateCategoryController,
                categoryController,
                singleCategoryController,
                deleteController}
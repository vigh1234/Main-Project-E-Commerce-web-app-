const mongoose=require('mongoose')

const categoryScheme=new mongoose.Schema({
    name:{
       type:String,
    //    required:true,
    //    unique:true
    }
})
module.exports= mongoose.model('Category', categoryScheme)
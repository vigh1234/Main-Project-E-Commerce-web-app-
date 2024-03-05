const mongoose=require('mongoose')

const connectDB= async ()=>{
    try {
        const connect =await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongodB ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error in mongoDB ${error}`)
    }
}

module.exports=connectDB
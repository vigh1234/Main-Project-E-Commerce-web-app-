const express=require('express')
const connectDB=require('./config/db')
const dotenv=require('dotenv') .config()
const authRoutes=require('./routes/authRoutes')
const categoryRoutes=require('./routes/categoryRoutes')
const productRoutes=require('./routes/productRoutes')
const cors=require('cors')

const app=express()

connectDB()
app.use(cors())
app.use(express.json())

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

app.get('/',(req,res)=>{
    res.send("<h1>Welcome to Ecommerce app</h1>")
})

const PORT= process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})
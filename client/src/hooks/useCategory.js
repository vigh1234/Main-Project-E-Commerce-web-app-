import { useState, useEffect } from "react";
import axios from "axios";

export default function UseCategory(){
    const [categories,setCategories]= useState([])

    //get category
    const getCategory=async ()=>{
        try {
           const {data} =await axios .get('http://localhost:8080/api/v1/category/get-category') 
           setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategory()
    },[])

    return categories;
}
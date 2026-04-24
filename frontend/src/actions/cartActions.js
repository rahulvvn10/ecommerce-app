import axios from "axios"
import { addCartItemsRequest, addCartItemsSuccess } from "../slices/cartSlice"

export const addCartItems=(id,quantity)=>async(dispatch)=>{
    try{
        dispatch(addCartItemsRequest())
        const {data}=await axios.get(`/api/v1/products/${id}`)
        dispatch(addCartItemsSuccess({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            stock: data.product.stock,
            quantity: quantity
        
        })) 
    }
    catch(err){
       
  console.log("ADD TO CART ERROR:", err);


    }
}
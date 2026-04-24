import axios from 'axios';
import {productsRequest, productsSuccess, productsFail, adminProductsRequest, adminProductsSuccess, adminProductsFail} from '../slices/productsSlice';
import { adminOrdersSuccess } from '../slices/orderSlice';

export const getProducts=(keyword,price,category,rating,currentPage)=>async(dispatch)=>{
    try{
        dispatch(productsRequest());
        let link=`/api/v1/products?page=${currentPage}`;
        if(keyword){
            link+=`&keyword=${keyword}`;
        }
        if(price){
            link+=`&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        }
        if(category){
            link+=`&category=${category}`;
        }
        if(rating){
            link+=`&ratings=${rating}`;
        }
        const {data}=await axios.get(link);
        dispatch(productsSuccess(data));
    }
    catch(err){
        dispatch(productsFail(err.response.data.message));
    }
}
export const getAdminProducts  =  async (dispatch) => {

    try {  
        dispatch(adminProductsRequest()) 
        const { data }  =  await axios.get(`/api/v1/admin/products`);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.response.data.message))
    }
    
}
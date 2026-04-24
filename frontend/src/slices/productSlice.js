import { createSlice } from "@reduxjs/toolkit";
const productSlice=createSlice({
name: "product",

initialState:{
    loading: false,
    product:{},
    isReviewSubmitted:false
},
reducers:{
    productRequest(state,action){
        return{
            ...state,
            isReviewSubmitted:false,
            loading: true
    }
},
    productSuccess(state,action){
        return{
             ...state,
            loading: false,
            product: action.payload.product
        }
},
    productFail(state,action){
        return{
             ...state,
            loading: false,
            error: action.payload,
        }
},
 reviewsRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        reviewsSuccess(state, action){
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews
            }
        },
        reviewsFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        deleteReviewRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewDeleted: true
            }
        },
        deleteReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        },
        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            }
        },
        createReviewRequest(state, action){
            return {
                ...state,
                loading: true,
                isReviewSubmitted: false
            }
        },
        createReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true
            }
        },
        createReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },
        clearError(state, action) {
           return{ ...state,
            error: null
           }
        }}
    });

const {actions,reducer}=productSlice;
export const {productRequest,productSuccess,productFail,createReviewRequest, createReviewSuccess, createReviewFail, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail, clearReviewDeleted}=actions;
export default reducer;
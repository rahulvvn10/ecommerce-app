const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{type:String,required:[true,"Enter product name"],trim:true,maxLength:[100,"Product name cannot exceed 100 characters"]},
    price:{type:Number,required:true,default:0.0},
    description:{type:String,required:[true,"Enter product description"]},
    ratings:{type:Number,default:0},
    images:[
        {
            image:{
                type:String,
                required:true
            }
        }
    ],
    category:{type:String,required:[true,"Enter product category"],enum:{values:["Electronics","Mobile Phones","Laptops","Accessories","Headphones","Food","Books","Clothes/Shoes","Beauty/Health","Sports","Outdoor","Home"],message:"Please select correct category for product"}},
    seller:{type:String,required:[true,"Enter product seller"]},
    stock:{type:Number,required:[true,"Enter product stock"],maxLength:[20,"Product stock cannot exceed 20"],default:0},
    numOfReviews:{type:Number,default:0},
    reviews:[
        {
            user:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'user'
              
            },
            rating:{
                type:Number
            
            },
            comment:{
                type:String
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{type:Date,default:Date.now}
});
const productModel=mongoose.model('Product',productSchema);
module.exports=productModel;
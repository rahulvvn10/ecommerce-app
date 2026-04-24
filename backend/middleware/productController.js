const productModel = require("../models/productModel");

exports.createReviews=async(req,res)=>{
    const {productId,rating,comment}=req.body;
    const review={
        user:req.user.id,
        rating,
        comment
    }
    const product=await productModel.findById(productId);
    const isReviewed=product.reviews.find(review=>{
        return review.user.toString()==req.user.id.toString();
    }
    )
    if(isReviewed){
        product.reviews.forEach(review=>{
            if(review.user.toString()==req.user.id.toString()){
                review.comment=comment
                review.rating=rating
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length
    }
    product.ratings=product.reviews.reduce((acc,review)=>{
        return review.rating+acc;
    },0)/product.reviews.length;
    product.ratings=isNaN(product.ratings)?0:product.ratings;
    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true
    })
}

exports.getReviews=async(req,res)=>{
    const product=await productModel.findById(req.query.id);
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
}

exports.deleteReview = async (req, res, next) =>{
    const product = await productModel.findById(req.query.productId);
    
    const reviews = product.reviews.filter(review => {
       return review._id.toString() !== req.query.id.toString()
    });
    const numOfReviews = reviews.length;

    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    await productModel.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true})
};


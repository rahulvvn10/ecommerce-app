import {  useEffect, useState } from "react";
import { createReview, getProduct } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { Modal } from "react-bootstrap";
import { addCartItems } from "../actions/cartActions";
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";

export default function ProductDetail() {
  const {loading,product,isReviewSubmitted}=useSelector((state)=>state.productState)
  const {user}=useSelector((state)=>state.authState)
  const dispatch=useDispatch();
  const {id}=useParams()
  useEffect(()=>{
    dispatch(getProduct(id))
    if(isReviewSubmitted) {
            handleClose()
            toast('Review Submitted successfully',{
                type: 'success',
              position:"bottom-center"})}
  },[dispatch,id,isReviewSubmitted])
  const [quantity,setQuantity]=useState(1);
  const increaseQuantity=()=>{
    if(product.stock<=quantity) return;
    setQuantity(quantity+1);
  }
  const decreaseQuantity=()=>{
    if(quantity<=1) return;
    setQuantity(quantity-1);
  }
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const reviewHandler = () => {
        dispatch(createReview({
    rating,
    comment,
    productId: id
  }));
 setShow(false);
    }
  return (
    <>
    {loading?<Loader/>: 
    <div className="row f-flex justify-content-around">
      {/* Product Image */}
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
  
          <img
            className="d-block w-100"
            src={  "./images/products/3.jpg"}
            alt={product.name}
            height="500"
            width="500"
          />
       
      </div>

      {/* Product Details */}
      <div className="col-12 col-lg-5 mt-5">
        <h3>{product.name}</h3>
        <p id="product_id">Product # {product._id}</p>

        <hr />

        <div className="rating-outer">
          <div className="rating-inner" style={{width:`${product.ratings/5 *100}%`}}></div>
        </div>
        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

        <hr />

        <p id="product_price">${product.price}</p>

        {/* Quantity Counter */}
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus" onClick={decreaseQuantity}>-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            readOnly
          />
          <span className="btn btn-primary plus" onClick={increaseQuantity} >+</span>
        </div>

        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ml-4"
          disabled={product.stock===0}
          onClick={()=>dispatch(addCartItems(product._id,quantity))}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status: <span className={product.stock > 0 ? "GreenColor":"RedColor"} id="stock_status">{product.stock > 0 ? "In Stock":"Out of Stock"}</span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>
          {product.description}
        </p>

        <hr />

        <p id="product_seller" className="mb-3">
          Sold by: <strong>{product.seller}</strong>
        </p>
{user?
        
        <button onClick={handleShow}
          id="review_btn"
          type="button"
          className="btn btn-primary mt-4"
          data-toggle="modal"
          data-target="#ratingModal"
        >
          Submit Your Review
        </button>:<div class="alert alert-danger mt-5">login first</div>}

        {/* Review Modal */}
        <div className="row mt-2 mb-5">
          <div className="rating w-50">
            
             <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Submit Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ul className="stars" >
                                        {
                                            [1,2,3,4,5].map(star => (
                                                <li 
                                                value={star}
                                                onClick={()=>setRating(star)}
                                                className={`star ${star<=rating?'orange':''}`}
                                                onMouseOver={(e) => e.target.classList.add('yellow')}
                                                onMouseOut={(e) => e.target.classList.remove('yellow')}

                                                ><i className="fa fa-star"></i></li>
                                            ))
                                        }
                                       
                                       
                                    </ul>

                                    <textarea  onChange={(e)=>setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                    </textarea>
                                    <button disabled={loading} onClick={reviewHandler}   aria-label="Close" className="btn my-3 float-right review-btn px-4 text-white">Submit</button>
                                </Modal.Body>
                               
                            </Modal>
          </div>
        </div>
      </div> 
    </div>}
    {
                product.reviews && product.reviews.length > 0 ?
                <ProductReview reviews={product.reviews} /> : null
                }  
    </>
  );
}

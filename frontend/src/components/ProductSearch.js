import { useEffect,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getProducts } from '../actions/productActions';
import Loader from './Loader';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
export default function ProductSearch()
{
  const dispatch=useDispatch();
  const {products,loading,error,productsCount,resPerpage}=useSelector((state)=>state.productsState);
  const [currentPage,setCurrentPage]=useState(1);
  const [price,setPrice]=useState([1,1000]);
  const [priceChanged,setPriceChanged]=useState(price);
  const [category,setCategory]=useState(null);
  const [rating,setRating]=useState(0);
  const {keyword}=useParams();
const categories = [  
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];
  useEffect(()=>{
    if(error){
  return toast.error(error,{
      position: "bottom-center"
    })
    }
    
    dispatch(getProducts(keyword,price,category,rating,currentPage));
  },[error,dispatch,currentPage,keyword,priceChanged,category,rating])

    return(
      
      
        <>
        {loading?<Loader/>:
         <section id="products" className="container mt-5 ml-4">
      <div className="row">
        <div className='col-6 col-md-3 mb-5 mt-5'>
          <div className='px-5' onMouseUp={setPriceChanged}>
            <Slider range={true} marks={{0:'1$',1000:'1000$'}} min={0} max={1000} defaultValue={price}
            onChange={(price)=>{
              setPrice(price)
            }}
            handleRender={renderProps=>{
              return (
               <Tooltip  overlay={`$${renderProps.props['aria-valuenow']}`}  >
                                                         <div {...renderProps.props}>  </div>
                                                    </Tooltip>
              )
            }}
            />
          </div>
          <hr className='my-5'/>
          <div className="mt-5">
                                     <h3 className="mb-3">Categories</h3> 
                                       <ul className="pl-0">
                                        {categories.map(category =>
                                             <li
                                             style={{
                                                 cursor:"pointer",
                                                 listStyleType: "none"
                                             }}
                                             key={category}
                                             onClick={()=>{
                                                setCategory(category)
                                             }}
                                             >
                                                 {category}
                                             </li>
                                            
                                            )}
                                           
                                       </ul>
                                </div>
                                 <hr className='my-5'/>
                                 <hr className='my-5'/>
          <div className="mt-5">
                                     <h3 className="mb-3">Ratings</h3> 
                                       <ul className="pl-0">
                                        {[5,4,3,2,1].map(star =>
                                             <li
                                             style={{
                                                 cursor:"pointer",
                                                 listStyleType: "none"
                                             }}
                                             key={star}
                                             onClick={()=>{
                                                setRating(star)
                                             }}
                                             >
                                                 <div className="rating-outer">
                                                  <div className="rating-inner" style={{width:`${star/5*100}%`}}></div>
                                                 </div>
                                             </li>
                                            
                                            )}
                                           
                                       </ul>
                                </div>
                                 <hr className='my-5'/>
        </div>
       
        <div className='col-6 col-md-9'>
  <div className='row'>
    {products && products.map((product)=>(
      <div className="col-sm-12 col-md-6 col-lg-5 my-3" key={product._id}>
        <div className="card p-3 rounded">
          <img
            className="card-img-top mx-auto"
            src={product.images[0]}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </h5>
            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">{product.numOfReviews}</span>
            </div>
            <p className="card-text">${product.price}</p>
            <Link
              to={`/product/${product._id}`}
              id="view_btn"
              className="btn btn-block"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        
      </div>
    </section>
}
<div className="d-flex justify-content-center mt-5">
<ReactPaginate
  previousLabel={'Prev'}
  nextLabel={'Next'}
  pageCount={Math.ceil(productsCount / resPerpage)}
  onPageChange={({ selected }) => setCurrentPage(selected + 1)}
  containerClassName={'pagination justify-content-center'}
  pageClassName={'page-item'}
  pageLinkClassName={'page-link'}
  previousClassName={'page-item'}
  previousLinkClassName={'page-link'}
  nextClassName={'page-item'}
  nextLinkClassName={'page-link'}
  activeClassName={'active'}
  pageRangeDisplayed={3}       
  marginPagesDisplayed={1}
/>


</div>
    </>
    )
}
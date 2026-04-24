import { useEffect,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getProducts } from '../actions/productActions';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
export default function Home()
{
  const dispatch=useDispatch();
  const {products,loading,error,productsCount,resPerpage}=useSelector((state)=>state.productsState);
  const [currentPage,setCurrentPage]=useState(1);

  useEffect(()=>{
    if(error){
  return toast.error(error,{
      position: "bottom-center"
    })
    }
    
    dispatch(getProducts(null,null,null,null,currentPage));
  },[error,dispatch,currentPage])

    return(
      
        <>
        {loading?<Loader/>:
         <section id="products" className="container mt-5 ml-4">
      <div className="row">
       
          {products && products.map((product)=>(
             <div className="col-sm-12 col-md-6 col-lg-4 my-3"  key={product._id}>
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
                  <div className="rating-inner" style={{width:`${product.ratings/5 *100}%`}}></div>
                </div>
                <span id="no_of_reviews">{product.numOfReviews}</span>
              </div>
              <p className="card-text">${product.price}</p>
              <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
            </div>
          </div>
        </div>))}
          

        
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
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Search from "./Search"
import { useDispatch, useSelector } from "react-redux"
import { DropdownButton,Dropdown,Image } from "react-bootstrap"
import { logout } from "../actions/userActions"
export default function Header(){
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutHandler=()=>{
    dispatch(logout);
  }
  const {isAuthenticated,user}= useSelector((state)=>state.authState);
  const {items:cartItems}= useSelector((state)=>state.cartState);
    return (
        <>
         <nav class="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to='/'>
          <img width="150px" src="./images/logo.png" /></Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search/>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ?
        (
        <Dropdown className="d-inline">
          <Dropdown.Toggle variant="default white text-white" id="dropdown-basic">
            <img
        src="/images/1.png"
        alt="user"
        width="30"
        height="30"
        className="rounded-circle me-2"
      />
          {user.name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>{navigate('/myprofile')}}>Profile</Dropdown.Item>
            {user.role==='admin' && <Dropdown.Item onClick={()=>{navigate('/admin/dashboard')}}>Dashboard</Dropdown.Item>}
            <Dropdown.Item onClick={logoutHandler}className="text-danger">Logout</Dropdown.Item>
            
            </Dropdown.Menu>
        </Dropdown>
    ):
     <Link to='/login'> <button className="btn" id="login_btn">Login</button></Link>  
        }
       <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link> 
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
      </div>
    </nav>
        </>
    )
}
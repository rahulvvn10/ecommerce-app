import { useEffect, useState } from "react";
import {clearAuthErrors, login} from "../../actions/userActions";
import {useDispatch, useSelector} from "react-redux"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Login()
{
    
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const location=useLocation();
    const {loading,error,isAuthenticated}=useSelector((state)=>state.authState);
     const redirect = location.search?'/'+location.search.split('=')[1]:'/';
    const submitHandler=(e)=>{
        e.preventDefault();
       dispatch(login(email,password));
    }
    const navigate=useNavigate();
    useEffect(()=>{
        if(isAuthenticated){
            navigate(redirect);
        }
        if(error){
            toast(error,{
            position: "bottom-center",
            type: "error",
            onOpen: () => {dispatch(clearAuthErrors)}
        })
        return}
    },[error,isAuthenticated,dispatch])

    return(
        <>
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
                disabled={loading}
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
    </>
    )
}
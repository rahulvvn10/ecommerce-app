import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {register} from '../../actions/userActions'
import { toast } from "react-toastify";
import {clearAuthErrors} from '../../actions/userActions'
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const onChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  const navigate=useNavigate();
 const {loading,error,isAuthenticated}=useSelector(state=>state.authState)
   const submitHandler = (e) => {
        e.preventDefault();
         const data = {
    name: userData.name,
    email: userData.email,
    password: userData.password
  };
  dispatch(register(data));

    }

    useEffect(() => {
      if(isAuthenticated){
        toast.success("Registered Successfully",{
          position: "bottom-center",
        });
            navigate("/");
          
        }
        
       if(error){
                  toast(error,{
                  position: "bottom-center",
                  type: "error",
                  onOpen: () => {dispatch(clearAuthErrors)}
              })
              return
    }
    }, [error])
    return (
  
        <>
         <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" encType='multipart/form-data'>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label for="email_field">Name</label>
            <input name="name" onChange={onChange} type="name" id="name_field" className="form-control" value={userData.name} />
          </div>

            <div className="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                id="email_field" name="email" onChange={onChange}
                className="form-control"
                value={userData.email}
              />
            </div>
  
            <div className="form-group">
              <label for="password_field">Password</label>
              <input
                type="password" name="password" onChange={onChange}
                id="password_field"
                className="form-control"
                value={userData.password}
              />
            </div>

            <div className='form-group'>
             
              <div className='d-flex align-items-center'>
                  <div>
                  </div>
                  
                
              </div>
          </div>
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              onClick={submitHandler}
              disabled={loading}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
        </>
    )
}
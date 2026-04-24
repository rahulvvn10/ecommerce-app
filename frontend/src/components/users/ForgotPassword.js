import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../actions/userActions";
import { toast } from "react-toastify";

export default function ForgotPassword() {
    const [email,setEmail]=useState("")
         const dispatch=useDispatch();
         const {loading,error,message}=useSelector((state)=>state.authState);
    const submitHandler=(e)=>{
        e.preventDefault();
        const formData={
            email:email
        }
   
        dispatch(forgotPassword(formData))
    }

    useEffect(()=>{
        if(message){
            toast(message,{
                  position: "bottom-center",
                  type: "success"})
                    setEmail("");
        }
      
        
        if(error){
            toast(error,{
                  position: "bottom-center",
                  type: "error"
                 }
                )
            
            return;
        }
    },[message,error,dispatch])
  return (
   <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg">
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label for="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3" onClick={submitHandler}>
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
  )
}
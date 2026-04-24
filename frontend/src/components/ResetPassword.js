import { useEffect, useState } from "react"
import { clearAuthErrors, resetPassword } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function ResetPassword() {
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const dispatch=useDispatch();
    const {token}=useParams();
    const {isAuthenticated,error}=useSelector(state=>state.authState);
    const navigate=useNavigate();
    const submitHandler=(e)=>{
            e.preventDefault();
             if (!password || !confirmPassword) {
    toast("Both fields are required", {
      position: "bottom-center",
      type: "error",
    });
    return;
  }

  if (password !== confirmPassword) {
    toast("Passwords do not match", {
      position: "bottom-center",
      type: "error",
      
    })
return;}
            const formData={
                password:password,
                confirmPassword:confirmPassword
            }
            dispatch(resetPassword(formData,token))
        }
        useEffect(()=>{
            if(isAuthenticated){
                toast("Password reset successfully",{
                                  position: "bottom-center",
                                  type: "success"})
                navigate("/");
                return;
            }
        if(error){
                toast(error,{
                      position: "bottom-center",
                      type: "error",
                }
                    )
                }
            return},[isAuthenticated,error,navigate]
        )
                
           
    	return (<div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg">
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label for="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                      required  />
                    </div>

                    <div className="form-group">
                        <label for="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={e=>setConfirmPassword(e.target.value)}
                       required />
                    </div>

                    <button onClick={submitHandler}
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>)
}
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "../actions/userActions";
import { toast } from "react-toastify";

export default function UpdateProfile(){
    
    const {user,loading,eror,isUpdated}=useSelector((state)=>state.authState);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
         e.preventDefault();
                 const data = {
            name: name,
            email: email
          
          };
          dispatch(updateProfile(data));
    }
    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
        }
        if(isUpdated){
            toast.success("Profile Updated Successfully",{
                position:"bottom-center"
            })
            return;
        }
    },[user,isUpdated,dispatch])
    return(
        <>
         <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label for="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                      

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" onClick={submitHandler} >Update</button>
                    </form>
                </div>
            </div>
            </>
    )
}
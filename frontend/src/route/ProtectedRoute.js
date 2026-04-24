import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const {isAutheticated}=useSelector((state)=>state.authState);
    if(isAutheticated===false) {
        return <Navigate to="/login"/>
    }
    else{
        return children;
    }
}
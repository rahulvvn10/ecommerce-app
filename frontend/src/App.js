import Header from "./components/Header";
import './App.css'
import { useState } from "react";
import axios from "axios";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from "./components/ProductDetail";
import ProductSearch from "./components/ProductSearch";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/Profile";
import ProtectedRoute from "./route/ProtectedRoute";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/users/UpdatePassword";
import ForgotPassword from "./components/users/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrders from "./components/order/UserOrders";
import OrderDetail from "./components/order/OrderDetail";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("")
  useEffect(() => {
    store.dispatch(loadUser)
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])

  return (
    <Router>
    <div className="App">
     
      <Header/>
      <div className="container container-fluid">
      <ToastContainer theme="dark"/>
       <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<ProductDetail/>}/>
      <Route path='/search/:keyword' element={<ProductSearch/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
      <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
      <Route path='/password/forgot' element={<ForgotPassword/>}/>
      <Route path='/password/reset/:token' element={<ResetPassword/>}/>
       <Route path='/cart' element={<Cart/>}/>
       <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
        <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
      {stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute> } />} 
      <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
      <Route path="/orders" element={<ProtectedRoute><UserOrders/></ProtectedRoute>}/> 
      <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute>}/>  
       </Routes>
      </div>
      <Footer/>
      
    </div>
    </Router>
  );
}

export default App;

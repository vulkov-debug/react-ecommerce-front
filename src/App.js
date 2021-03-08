import React, {useEffect, lazy, Suspense} from 'react'
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import {currentUser} from './functions/auth'
import {LoadingOutlined} from '@ant-design/icons'

const Login = lazy(()=> import ("./pages/auth/Login")) ;
const Register = lazy(()=> import("./pages/auth/Register")) ;
const Home = lazy(()=> import("./pages/Home")) ;
const Header = lazy(()=> import('./components/nav/Header')) 
const SideDrawer = lazy(()=> import('./components/drawer/SideDrawer')) 
const RegisterComplete = lazy(()=> import('./pages/auth/RegisterComplete')) 
const ForgorPassword = lazy(()=> import('./pages/auth/ForgotPassword')) 
const History = lazy(()=> import('./pages/user/History')) 
const UserRoute = lazy(()=> import('./components/routes/UserRoute')) 
const AdminRoute = lazy(()=> import("./components/routes/AdminRoute")) 
const Password = lazy(()=> import('./pages/user/Password')) 
const Wishlist = lazy(()=> import("./pages/user/Wishlist")) ;
const AdminDashboard = lazy(()=> import('./pages/admin/AdminDashboard')) 
const CategoryCreate = lazy(()=> import("./pages/admin/category/CategoryCreate")) ;
const CategoryUpdate = lazy(()=> import("./pages/admin/category/CategoryUpdate")) ;
const SubCreate = lazy(()=> import("./pages/admin/sub/SubCreate")) ;
const SubUpdate = lazy(()=> import("./pages/admin/sub/SubUpdate")) ;
const ProductCreate = lazy(()=> import("./pages/admin/product/ProductCreate")) ;
const AllProducts = lazy(()=> import("./pages/admin/product/AllProducts")) ;
const ProductUpdate = lazy(()=> import("./pages/admin/product/ProductUpdate")) ;
const Product = lazy(()=> import('./pages/Product')) 
const CategoryHome = lazy(()=> import('./pages/category/CategoryHome')) 
const SubHome = lazy(()=> import('./pages/sub/SubHome')) 
const Shop = lazy(()=> import('./pages/Shop')) 
const Cart = lazy(()=> import('./pages/Cart')) 
const Checkout = lazy(()=> import('./pages/Checkout')) 
const Checkbox = lazy(()=> import('antd/lib/checkbox/Checkbox')) ;
const CreateCouponPage = lazy(()=> import('./pages/admin/coupon/CreateCouponPage')) 
const Payment = lazy(()=> import('./pages/Payment')) 




const App = () => {

  const dispatch = useDispatch()

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log(user)
     currentUser(idTokenResult.token)
       .then((res) => {
         dispatch({
           type: "LOGGED_IN_USER",
           payload: {
             name: res.data.name,
             email: res.data.email,
             token: idTokenResult.token,
             role: res.data.role,
             _id: res.data._id,
           },
         });
       })
       .catch(err=> console.log(err));
      }
    })
    return () => unsubscribe()
  },[dispatch])
  return (
    <Suspense fallback={
      <div className='col text-center p-5'>
        __ React Redux EC<LoadingOutlined />MMERCE __
      </div>
    }>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/register/complete" component={RegisterComplete} />
        <Route path="/forgot/password" component={ForgorPassword} />
        <UserRoute path="/user/history" component={History} />
        <UserRoute path="/user/password" component={Password} />
        <UserRoute path="/user/wishlist" component={Wishlist} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute path="/admin/category" component={CategoryCreate} exact />
        <AdminRoute path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute path="/admin/sub" component={SubCreate} exact />
        <AdminRoute path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute path="/admin/product" component={ProductCreate} exact />
        <AdminRoute path="/admin/products" component={AllProducts} />
        <AdminRoute path="/admin/product/:slug" component={ProductUpdate} />
        <Route path="/product/:slug" component={Product} />
        <Route path="/category/:slug" component={CategoryHome} />
        <Route path="/sub/:slug" component={SubHome} />
        <Route path="/shop" component={Shop} />
        <Route path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRoute path="/admin/coupon" component={CreateCouponPage} />
        <UserRoute exact path="/payment" component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;

import {Route,Routes} from 'react-router-dom'
import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import PageNotFound from './Pages/PageNotFound'
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/user/Dashboard';
import PrivateRoute from './Components/Routes/private';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Profile from './Pages/user/Profile';
import Orders from './Pages/user/Orders';
import Products from './Pages/Admin/Products';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Search from './Pages/Search';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProduct';
import CartPage from './Pages/CartPage';
import CartNotFound from './Pages/CartNotFound';
import AdminOrders from './Pages/Admin/AdminOrders';



function App() {
  return (
   <>
   
   <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/product/:name' element={<ProductDetails/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/cartnotfound' element={<CartNotFound/>}/>
      <Route path='/category/:name' element={<CategoryProduct/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard/>}/>
        <Route path='user/orders' element={<Orders/>}/>
        <Route path='user/profile' element={<Profile/>}/>
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/create-product' element={<CreateProduct/>}/>
        <Route path='admin/product/:name' element={<UpdateProduct/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/users' element={<Users/>}/>
        <Route path='admin/orders' element={<AdminOrders/>}/>
      </Route>
      <Route path='/about' element={<About/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
   </Routes>
   
   </>
  );
}

export default App;

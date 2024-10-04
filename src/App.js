
import './App.css';
import Home from './screens/Home';



import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import'../node_modules'
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import SignUp from './screens/SignUp';
import Login from './screens/Login';

import { CartProvider } from './components/ContextReducer';
import MyOrders from './screens/MyOrders';
import AdminPanel from './Admin/AdminPanel';


import CreateProduct from './Admin/CreateProduct'
import Products from './Admin/Products'
import Dashboard from './Admin/Dashboard';
// import { useEffect } from 'react';


let user;
function App() {
  // useEffect(() => {
  user = JSON.parse(localStorage.getItem('userData'))

// }, [])

  return (
    <CartProvider>
       <Router>
        <div>
          <Routes>
            <Route path="/createuser" element={<SignUp/>} />
            <Route path='/login' element={<Login/>}/>
            <Route exact path="/" element={<Home />} />
            <Route path='/myorders' element={<MyOrders/>}/>
            {
              !!user?.isAdmin &&  
            <>
            <Route path="/admin" element={<AdminPanel/>}>
              {/* replace by CreateProduct in line no 1 */}
              <Route index element={<Dashboard/>} />
               <Route path="create" element={<CreateProduct/>} />
              <Route path="update/:productId" element={<CreateProduct/>} />
              <Route path="Products" element={<Products/>} />
            </Route>
            </>
            }
          </Routes>
        </div>
      </Router>


    </CartProvider>
   


   
    
    
    
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import ProductList from './pages/ProductList'
import Navbar from './components/NavigationBar'
import Login from './pages/Login'
import NotFound from "./pages/404"
import CustomerList from './pages/CustomerList'
import CreateProduct from './pages/CreateProduct'
import CreateCustomer from './pages/CreateCustomer'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  
  return (
    <BrowserRouter>
         <Navbar/>
      <Routes>
       <Route path="/" element={<ProductList />} />
       <Route path='/login' element={<Login/>}/>
       <Route path='/product/create' element={<ProtectedRoute><CreateProduct/></ProtectedRoute>} />
        <Route path='/customers' element={<ProtectedRoute><CustomerList/></ProtectedRoute>}/>
        <Route path='/customer/create' element={<ProtectedRoute><CreateCustomer/></ProtectedRoute>}/>
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path="*" element={<NotFound />} /> 
      </Routes> 
    </BrowserRouter>
  )
}

export default App

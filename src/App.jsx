// import { useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductList from './pages/ProductList'
import Navbar from './components/NavigationBar'
import Login from './pages/Login'
import NotFound from "./pages/404"
import CustomerList from './pages/CustomerList'
import CreateProduct from './pages/CreateProduct'
import CreateCustomer from './pages/CreateCustomer'

function App() {
  return (
    <BrowserRouter>
         <Navbar/>
      <Routes>
       <Route path="/" element={<ProductList />} />
       <Route path='/login' element={<Login onLogin={()=>{console.log("Login function")}}/>}/>
       <Route path='/product/create' element={<CreateProduct/>} />
       <Route path='/customers' element={<CustomerList/>}/>
       <Route path='/customer/create' element={<CreateCustomer/>}/>
       <Route path="*" element={<NotFound />} />  
      </Routes> 
    </BrowserRouter>
  )
}

export default App

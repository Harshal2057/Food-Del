import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Route, Routes} from "react-router-dom";
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
     <Navbar />
     <ToastContainer position="top-right" autoClose={3000} />

     <div className='flex h-full'>

     <Sidebar />
     <Routes>
            <Route path='/add' element={<Add />} />
            <Route path='/list' element={<List />} />
            <Route path='/orders' element={<Orders />} />
     </Routes>
      
     </div>
    
    </>
  )
}

export default App

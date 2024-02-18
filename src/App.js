import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Add from './pages/Add';
import Products from './pages/Products';
// import Update from './pages/Update';
import Search from './pages/Search';
import Show from './pages/Show';
import UProducts from './page_user/U_products';
import ShowProduct from './page_user/show_product';
import USearch from './page_user/U_search';
import Dashboard from './pages/Dashboard';
const App = () => {
  //user or admin infos 
  const [user_infos, setUser_infos] = useState(JSON.parse(localStorage.getItem('user_infos')));
  return (
    < >
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/add'element={<Add />} />
          <Route path='/products' element={ <Products />} />
          <Route path='/search' element={<Search />} />
          <Route path='/show/:id' element={<Show />} />
          <Route path='/fadream_products' element={<UProducts />} />
          <Route path='/show_product/:id' element={<ShowProduct />} />
          <Route path='/U_search/:s_val' element={<USearch />} />
      </Routes>
    </BrowserRouter >
    </>
  );
}
export default App;

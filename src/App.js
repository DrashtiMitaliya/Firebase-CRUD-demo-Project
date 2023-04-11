import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
import AddEdit from './Pages/AddEdit';
import View from './Pages/View';
import About from './Pages/About';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer position='top-center'/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/add' element={<AddEdit/>}></Route>
          <Route path='/update/:id' element={<AddEdit/>}></Route>
          <Route path='/view/:id' element={<View/>}></Route>
          <Route path='/about' element={<About/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

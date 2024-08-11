import React from 'react';

import IndexTemplete from "./templete/IndexTemplete";
import { Route, Routes } from 'react-router-dom';
import Login from "./Login"
import Register from './Register';

import HomeIndex from './Components/Home/Index';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<IndexTemplete />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;

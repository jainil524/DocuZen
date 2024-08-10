import React from 'react';

import ScreenWrapper from './Components/ScreenWrapper';
import { Route, Routes } from 'react-router-dom';
import Login from "./Login"
import Register from './Register';



const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<ScreenWrapper />} />
      </Routes>

    </div>
  );
};

export default App;

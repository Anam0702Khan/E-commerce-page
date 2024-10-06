import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

const App = () => (
  
    <div className="app-bg">
        <BrowserRouter>
        <Routes>
         <Route path="/" element={<Home/>} />
        </Routes>
        </BrowserRouter>
      
    </div>

);

export default App;

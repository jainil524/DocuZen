import React, { useState } from 'react'

import ScreenWrapper from '../Components/ScreenWrapper';
import SideBar from '../Components/SideBar/SideBar';

import "./IndexTemplete.css"

function indexTemplete() {

  const [doc, setdoc] = useState([]);

  return (
    <div className="indexTemplete" style={{width:"100%"}}>
      <SideBar setDoc={setdoc} />
      <ScreenWrapper doc={doc} /> 
    </div>
  )
}

export default indexTemplete

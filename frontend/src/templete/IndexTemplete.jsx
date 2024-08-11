import React from 'react'

import ScreenWrapper from '../Components/ScreenWrapper';
import SideBar from '../Components/SideBar/SideBar';

import "./IndexTemplete.css"

function indexTemplete() {
  return (
    <div className="indexTemplete" style={{width:"100%"}}>
      <SideBar />
      <ScreenWrapper/> 
    </div>
  )
}

export default indexTemplete

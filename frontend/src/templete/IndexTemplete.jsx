import React from 'react'

import ScreenWrapper from '../Components/ScreenWrapper';
import SideBar from '../Components/SideBar/SideBar';

function indexTemplete() {
  return (
    <div style={{width:"100%", overflow: "hidden"}}>
      <SideBar />
      <ScreenWrapper/> 
    </div>
  )
}

export default indexTemplete

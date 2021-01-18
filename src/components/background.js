import React from 'react'
import "./background.css"

const Background = ({ bgImg, children }) => (

  // <div className="bg-container">
  <div style={
    {
      backgroundImage: `url(${bgImg})`,
      backgroundPosition: '50% 0',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
    {children}
  </div>
)


export default Background
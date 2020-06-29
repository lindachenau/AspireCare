import React from 'react'
import "./background.css"

const Background = ({ bgImg, children }) => (
  <div className="bg-container">
    {/* <img src={bgImg} /> */}
    {children}
  </div>
)


export default Background
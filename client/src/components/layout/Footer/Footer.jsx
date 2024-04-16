import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer>
      <div className="leftFooter">
        <h4>Download OUR APP</h4>
        <p>Download APP for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>
      <div className="midFooter">
      <h1>ShipShop</h1>
      <p>High Quality is our first priority</p>

      <p>Copyright 2024 &copy; MeAryanThakur</p>
      </div>
      <div className="rightFooter">
      <h4>Follow us</h4>
      <a href="https://www.instagram.com/itsme_aryan14/?next=%2F">Instagram</a>
      <a href="https://github.com/Aryan-Kumar-Thakur">Github</a>
      <a href="https://www.linkedin.com/in/aryan-kumar-thakur/">Linkdein</a>
      </div>
    </footer>
  )
}

export default Footer
import React, { useState } from 'react'
import { NavIcons, NavItems } from "./NavItems"
import './header.css'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx'

const Header = () => {
  const [clicked, setClicked] = useState(false)
  const hide = () => {
    setClicked(false)
  }
  const AllNavicons = NavIcons.map(({ logo, url }, ind) => {
    return (
      <li key={ind} onClick={hide}>
        <NavLink exact="true" to={url} activeclassname="active">{logo}</NavLink>
      </li>
    )
  })
  const AllNavitems = NavItems.map(({ title, url }, ind) => {
    return (
      <li key={ind} onClick={hide}>
        <NavLink exact="true" to={url} activeclassname="active">{title}</NavLink>
      </li>
    )
  })
  return (
    <nav>
      <div className="navbar1">
        <div className='left-menu'>
          <div className="logo">
            ShipShop
          </div>
          <div className='menu-icon' onClick={() => { setClicked(!clicked) }}>
            {
              (clicked) ? <RxCross1 /> : <GiHamburgerMenu />
            }
          </div>
          <ul className={clicked ? 'menu-list' : 'menu-list close'}>
            {AllNavitems}
          </ul>
        </div>
        <ul className='right-menu'>
          {AllNavicons}
        </ul>
      </div>
    </nav>
  )
}

export default Header
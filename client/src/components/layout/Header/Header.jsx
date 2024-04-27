import React, { useState } from 'react'
import { NavIcons, NavItems } from "./NavItems"
import './header.css'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx'
import UserOptions from './UserOptions';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  )

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
          {!isAuthenticated &&
            <li onClick={hide}>
              <NavLink exact="true" to="/login" activeclassname="active"><FaUserCircle/></NavLink>
            </li>
          }
        </ul>
        {isAuthenticated && <div className="right-icon">
          <UserOptions user={user} />
        </div>}
      </div>
    </nav>
  )
}

export default Header
import React, { useEffect } from 'react'
import "./profile.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {

  const navigate = useNavigate()

  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login")
    }
  }, [navigate, isAuthenticated])
  return (
    <>
      {
        (loading) ? <Loader /> :
          <>
            <MetaData title={`${user.name}'s Profile`}></MetaData>
            <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url} alt={user.name} />
                <Link to="/me/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </>
      }
    </>
  )
}

export default Profile
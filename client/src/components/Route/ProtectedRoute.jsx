import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children , isAdmin}) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    if(loading === false && isAdmin === true && user.role !== "admin"){
        return <Navigate to="/login" />
    }

    if(loading === false && isAuthenticated === false){
        return  <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)

    return(!loading &&  isAuthenticated ? children : <Navigate to="/login" />)
}

export default ProtectedRoute
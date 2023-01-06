import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Landing from './Landing'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="*" element={<Landing />} />
        </Routes>
    )
}

export default AppRoutes

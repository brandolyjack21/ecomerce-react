import { Outlet, Navigate } from "react-router-dom"

export const ProtectedRoutes = () => {

    const token = localStorage.getItem('token')
  if (token) {
    return <Outlet/>
  }else{
    return <Navigate to='/login'/>
  }
}


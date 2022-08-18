import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useAuthStatus} from  '../Hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {

    const {loggedIn, checkingStatus} = useAuthStatus()    

    if(checkingStatus) {
        return <Spinner message='Loading profile'/>
    }
    return (
        <div>
            {loggedIn ? <Outlet /> : <Navigate to='/signin' />}
        </div>
    )
}

export default PrivateRoute
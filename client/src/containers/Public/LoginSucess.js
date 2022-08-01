import React, { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useSelector, useDispatch } from 'react-redux'
import { loginSuccess } from '../../store/actions/authActions'

const LoginSucess = () => {
    const { userId } = useParams()
    console.log(1);
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    useEffect(() => {
        dispatch(loginSuccess(userId))
    }, [dispatch])

    return (
        <>
            {isLoggedIn && <Navigate to={path.HOME} />}
        </>
    )
}

export default LoginSucess
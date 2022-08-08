import React, { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useSelector, useDispatch } from 'react-redux'
import { loginSuccess } from '../../store/actions/authActions'

const LoginSucess = () => {
    const { userId, tokenLogin } = useParams()
    const dispatch = useDispatch()
    const { isLoggedIn, token } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(loginSuccess({ id: userId, tokenLogin }))
    }, [dispatch])
    useEffect(() => {
        if (isLoggedIn) {
            window.localStorage.setItem('token', token)
        }
    }, [isLoggedIn])

    return (
        <>
            {isLoggedIn && <Navigate to={path.HOME} />}
        </>
    )
}

export default LoginSucess
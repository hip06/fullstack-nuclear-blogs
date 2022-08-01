import React, { useState, useEffect, useRef } from 'react'
import videoLogin from '../../assets/login.mp4'
import logo from '../../assets/logowhite.png'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loading from '../../components/Loading'
import { apiRegister } from '../../services/authService'
import { path } from '../../ultils/constant'
import icons from '../../ultils/icons'

const { RiEyeOffFill, RiEyeFill } = icons

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [invalidFields, setInvalidFields] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isHidePassword, setIsHidePassword] = useState(true)
    const [isHidePassword2, setIsHidePassword2] = useState(true)
    const [firstTime, setFirstTime] = useState(true)
    const { currentLoggendIn } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitBtnRef = useRef()

    useEffect(() => {
        if (currentLoggendIn) {
            if (currentLoggendIn.err === 0) {
                setIsLoading(false)
                navigate(path.HOME)
            } else {
                if (!firstTime) {
                    setIsLoading(false)
                    Swal.fire('Oops!', currentLoggendIn.msg, 'error')
                }
            }
        }
    }, [currentLoggendIn])
    // COMPONENTDIDMOUNT
    useEffect(() => {
        window.google?.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleResponseGoogle
        })
        window.google?.accounts.id.renderButton(document.getElementById('google-btn'), { theme: 'outline', size: 'large', text: 'signin_with' })
        setFirstTime(false)
    }, [])
    const handleSubmit = (e) => {
        if (e.keyCode === 13) {
            isLogin ? handleLogin() : handleSignup()
        }
    }
    const handleResponseGoogle = async (response) => {
        const userInfo = jwt_decode(response?.credential)
        const payload = {
            id: userInfo?.sub,
            email: userInfo?.email,
            lastName: userInfo?.family_name,
            firstName: userInfo?.given_name,
            avatarUrl: userInfo?.picture
        }
        dispatch(actions.loginGoogle(payload))
    }
    const handleLogin = () => {
        let isValid = validateFields(email, password)
        if (isValid) {
            // LOGIC LOGIN
            setIsLoading(true)
            dispatch(actions.login({ email, password }))
            setEmail('')
            setPassword('')
        }
    }
    const handleSignup = async () => {
        let isValid = validateFields(email, password, password2)
        if (isValid) {
            // LOGIC REGISTER
            if (password === password2) {
                setIsLoading(true)
                let response = await apiRegister({ email, password })
                setIsLoading(false)
                if (response?.data?.err === 0) {
                    setIsLogin(true)
                    Swal.fire('Success!', response?.data?.msg, 'success')
                    setEmail('')
                    setPassword('')
                    setPassword2('')
                } else {
                    Swal.fire('Oops!', response?.data?.msg, 'error')
                }
            } else {
                setInvalidFields(prev => [...prev, 3])
            }
        }

    }
    const validateFields = (...argument) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let isEmail = argument[0] ? regexEmail.test(argument[0]) : false
        let isPasswordMore6 = argument[1] && argument[1].trim().length >= 6 ? true : false
        let invalidFields = []
        argument.forEach((item, index) => {
            if (item.trim() === '') invalidFields = [...invalidFields, index]
        })
        setInvalidFields(invalidFields)
        if (invalidFields.length === 0) {
            if (!isEmail) {
                setInvalidFields(prev => [...prev, 0])
            } else if (!isPasswordMore6) {
                setInvalidFields(prev => [...prev, 1])
            } else {
                return true
            }
        }
    }
    // console.log(get);
    return (
        <div className='relative flex justify-center items-center h-screen w-screen'>
            <video
                src={videoLogin}
                muted
                loop
                type='video/mp4'
                autoPlay
                className='w-full h-full object-cover'
            ></video>

            <div ref={submitBtnRef} className='absolute top-0 left-0 right-0 bottom-0 bg-blackOverlay flex justify-center items-center flex-col gap-5'>
                <img
                    src={logo}
                    alt="logo"
                    className='w-56 object-cover  mb-5'
                />
                <div className='w-4/5 md:w-3/5 lg:w-2/5 bg-white shadow-md rounded-md p-4 text-black'>
                    <h1 className='font-bold text-xl text-red-500 text-center'>{isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ TÀI KHOẢN'}</h1>
                    <div className='my-5 w-full'>
                        <input
                            type="email"
                            className='p-2 outline-none border-b-2 w-full placeholder:italic placeholder:text-sm'
                            placeholder='Enter email here ...'
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                                invalidFields.length !== 0 && setInvalidFields([])
                            }}
                            onFocus={() => setInvalidFields([])}
                            onKeyDown={handleSubmit}
                        />
                        {invalidFields.some(item => item === 0) && <small className='px-2 text-red-500'>Email không hợp lệ</small>}
                    </div>
                    <div className='my-5 w-full relative'>
                        <input
                            type={isHidePassword ? "password" : 'text'}
                            className='p-2 outline-none border-b-2 w-full placeholder:italic placeholder:text-sm'
                            placeholder='Enter password here ...'
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                                invalidFields.length !== 0 && setInvalidFields([])
                            }}
                            onFocus={() => setInvalidFields([])}
                            onKeyDown={handleSubmit}
                        />
                        {isHidePassword
                            ? <div
                                title='Hiện mật khẩu'
                                className='absolute right-0 top-0 w-10 h-10 flex items-center justify-center hover:bg-gray-200 hover:rounded-full cursor-pointer'
                                onClick={() => setIsHidePassword(false)}
                            >
                                <RiEyeOffFill size={17} />
                            </div>
                            : <div
                                title='Ẩn mật khẩu'
                                className='absolute right-0 top-0 w-10 h-10 flex items-center justify-center hover:bg-gray-200 hover:rounded-full cursor-pointer'
                                onClick={() => setIsHidePassword(true)}
                            >
                                <RiEyeFill size={17} />
                            </div>}
                        {invalidFields.some(item => item === 1) && <small className='px-2 text-red-500'>Mật khẩu phải ít nhất 6 kí tự</small>}
                    </div>
                    {!isLogin && <div className='my-5 w-full relative'>
                        <input
                            type={isHidePassword2 ? "password" : 'text'}
                            className='p-2 outline-none border-b-2 w-full placeholder:italic placeholder:text-sm'
                            placeholder='Retype password here ...'
                            value={password2}
                            onChange={e => {
                                setPassword2(e.target.value)
                                invalidFields.length !== 0 && setInvalidFields([])
                            }}
                            onFocus={() => setInvalidFields([])}
                            onKeyDown={handleSubmit}
                        />
                        {isHidePassword2
                            ? <div
                                title='Hiện mật khẩu'
                                className='absolute right-0 top-0 w-10 h-10 flex items-center justify-center hover:bg-gray-200 hover:rounded-full cursor-pointer'
                                onClick={() => setIsHidePassword2(false)}
                            >
                                <RiEyeOffFill size={17} />
                            </div>
                            : <div
                                title='Ẩn mật khẩu'
                                className='absolute right-0 top-0 w-10 h-10 flex items-center justify-center hover:bg-gray-200 hover:rounded-full cursor-pointer'
                                onClick={() => setIsHidePassword2(true)}
                            >
                                <RiEyeFill size={17} />
                            </div>}
                        {invalidFields.some(item => item === 2) && <small className='px-2 text-red-500'>Mật khẩu phải có ít nhất 6 kí tự</small>}
                        {invalidFields.length === 1 && invalidFields.some(item => item === 3) && <small className='px-2 text-red-500'>Mật khẩu không trùng khớp</small>}

                    </div>}
                    <div className='w-full flex items-center justify-center mt-10'>
                        {isLogin
                            ? <button
                                type='button'
                                className='outline-none w-full rounded-md py-2 bg-blue text-white'
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </button>
                            : <button
                                type='button'
                                className='outline-none w-full rounded-md py-2 bg-blue text-white'
                                onClick={handleSignup}
                            >
                                Đăng ký ngay
                            </button>}
                    </div>
                    <div className='text-black hover:text-blue-500 hover:underline text-center w-full my-5 cursor-pointer'>
                        {isLogin
                            ? <div onClick={() => setIsLogin(false)}>Chưa có tài khoản ? Đăng ký ngay</div>
                            : <div className='flex items-center justify-center gap-3' onClick={() => setIsLogin(true)}>Đi tới đăng nhập ? Go </div>}
                    </div>
                    <div className='my-5 flex justify-center items-center gap-2'>
                        <div className='line w-1/3 h-px bg-gray-300'></div>
                        <p>Hoặc</p>
                        <div className='line w-1/3 h-px bg-gray-300'></div>
                    </div>
                    <div id='google-btn' className='flex flex-col justufy-center items-center mb-5'></div>
                </div>
                <Link to={path.HOME} className='text-[white] hover:underline mt-7' >
                    Bỏ qua đăng nhập
                </Link>
            </div>
            {isLoading && <Loading top={'top-0'} />}

        </div>
    )
}

export default Login
import React, { useState, useEffect, useRef } from 'react'
import videoLogin from '../../assets/login.mp4'
import logo from '../../assets/logowhite.png'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loading from '../../components/Loading'
import { apiRegister } from '../../services/authService'
import { path, text } from '../../ultils/constant'
import icons from '../../ultils/icons'

const { RiEyeOffFill, RiEyeFill, FcGoogle, FaFacebook } = icons

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [invalidFields, setInvalidFields] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isHidePassword, setIsHidePassword] = useState(true)
    const [isHidePassword2, setIsHidePassword2] = useState(true)
    const { isLoggedIn, msg, isTryLogin, token } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitBtnRef = useRef()

    useEffect(() => {
        if (isLoggedIn) {
            window.localStorage.setItem('token', token)
            setIsLoading(false)
            navigate(path.HOME)
        } else {
            setIsLoading(false)
            msg && Swal.fire('Oops!', msg, 'error')
        }
    }, [isLoggedIn, msg, isTryLogin])
    const handleSubmit = (e) => {
        if (e.keyCode === 13) {
            isLogin ? handleLogin() : handleSignup()
        }
    }
    const handleLogin = () => {
        let isValid = validateFields(email, password)
        if (isValid) {
            setIsLoading(true)
            dispatch(actions.login({ email, password }))
            setEmail('')
            setPassword('')
        }
    }
    const handleSignup = async () => {
        let isValid = validateFields(email, password, password2)
        if (isValid) {
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
                <img src={logo} alt="logo" className='w-56 object-cover  mb-5' />
                <div className='w-4/5 md:w-3/5 lg:w-2/5 bg-white shadow-md rounded-md p-4 text-black'>
                    <h1 className='font-bold text-xl text-center'>{isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ TÀI KHOẢN'}</h1>
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
                        {invalidFields.some(item => item === 0) && <small className='px-2 text-[#dc3545] italic'>{text.INVALID_EMAIL}</small>}
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
                        {invalidFields.some(item => item === 1) && <small className='px-2 text-[#dc3545] italic'>{text.PASSWORD_6_LETTERS}</small>}
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
                        {invalidFields.some(item => item === 2) && <small className='px-2 text-[#dc3545] italic'>{text.PASSWORD_6_LETTERS}</small>}
                        {invalidFields.length === 1 && invalidFields.some(item => item === 3) && <small className='px-2 text-[#dc3545] italic'>{text.PASSWORD_NOT_SAME}</small>}

                    </div>}
                    <div className='w-full flex items-center justify-center mt-10'>
                        {isLogin
                            ? <button
                                type='button'
                                className='outline-none w-full rounded-md py-2 bg-blue text-white'
                                onClick={handleLogin}
                            >
                                {text.LOGIN}
                            </button>
                            : <button
                                type='button'
                                className='outline-none w-full rounded-md py-2 bg-blue text-white'
                                onClick={handleSignup}
                            >
                                {text.REGISTER}
                            </button>}
                    </div>
                    <div className='text-black hover:text-blue-500 hover:underline text-center w-full my-5 cursor-pointer'>
                        {isLogin
                            ? <div onClick={() => setIsLogin(false)}>{text.HAS_NOT_ACCOUNT}</div>
                            : <div className='flex items-center justify-center gap-3' onClick={() => setIsLogin(true)}>{text.GO_LOGIN}</div>}
                    </div>
                    <div className='my-5 flex justify-center items-center gap-2'>
                        <div className='line w-1/3 h-px bg-gray-300'></div>
                        <p>Hoặc</p>
                        <div className='line w-1/3 h-px bg-gray-300'></div>
                    </div>
                    <div className='flex flex-col justufy-center items-center mb-5 gap-5'>
                        <a href={`${process.env.REACT_APP_SERVER_URL}/api/auth/google`} className='flex gap-2 items-center justify-center p-2 border rounded-md w-64' >
                            <FcGoogle size={18} />
                            <span className='text-[15px] opacity-80 hover:opacity-100'>{text.LOGIN_GOOGLE}</span>
                        </a>
                        <a href={`${process.env.REACT_APP_SERVER_URL}/api/auth/facebook`} className='flex gap-2 items-center justify-center p-2 border rounded-md w-64' >
                            <FaFacebook size={18} color='blue' />
                            <span className='text-[15px] opacity-80 hover:opacity-100'>{text.LOGIN_FACEBOOK}</span>
                        </a>
                    </div>
                </div>
                <Link to={path.HOME} className='text-[white] hover:underline mt-7' >
                    {text.SKIP_LOGIN}
                </Link>
            </div>
            {isLoading && <Loading top={'top-0'} />}

        </div>
    )
}

export default Login
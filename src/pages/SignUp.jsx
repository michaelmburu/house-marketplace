import React, { useState } from 'react'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    
    const [formData, setFormData] = useState({name: '', email: '', password: ''})

    const {name, email, password} = formData

    const navigate  = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
  return (
    <>
        <div className="pageContainer">
            <header>
                <div className="pageHeader">
                    Welcome Back!
                </div>
            </header>
            <main>
                <form>
                    <input type="text" className="nameInput" placeholder='Name' id='name' value={name} onChange={onChange} /> 

                    <input type="text" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange} /> 

                    <div type="text" className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange} />
                        <img src={visibilityIcon} alt='show password' className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)} />
                    </div>
                    <Link to='/forgot-password' className='forgotPasswordLink'>
                        Forgot Password
                    </Link>
                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                        <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                        </button>
                    </div>
                 
                </form>

                {/* GOOGLE OAUTH */}
                <Link to='/signin' className='registerLink'>
                    Sign In Instead
                </Link>
            </main>
        </div>
    </>
  )
}

export default SignUp
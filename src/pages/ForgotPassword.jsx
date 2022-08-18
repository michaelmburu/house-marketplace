import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
        const auth = getAuth()
        await sendPasswordResetEmail(auth, email)
        toast.success('Password Reset Email Sent')
    } catch (error) {
      toast.error('Could not send password reset email.')
    }
  }


  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange}/>
          <Link  className='forgotPasswordLink' to='/signin'>Sign In</Link>
          <div className="signInBar">
            <div className="signInText">
              Send Reset Link
            </div>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'
const OAuth = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user  = result.user

            //Checkif user exists in firestore, if not add
            const userRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(userRef)

            // Add user in db if they don't exist
            if(!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
            toast.success('Sign In Sucessful')
        } catch (error) {
            toast.error("Unable to Sign In With Google.")
        }
    }
    return (
        <div className='socialLogin'>
            <p>Sign {location.pathname === '/signup' ? 'up' : 'in'} With </p>
            <button className="socialIconDiv" onClick={onGoogleClick}>
                <img className='socialIconImg' src={googleIcon} alt="google" />
            </button>
        </div>
    )
}

export default OAuth
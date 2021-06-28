import React, { useState } from 'react'
import axios from '../api'

import Logo from '../components/logo';
import SignInSec from '../components/signInSec';
import SignUpSec from '../components/signUpSec';

function StartPage({ setStart, setUser }) {
  const [signIn, setSignIn] = useState(true) //signIn, signUp

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const [attendCode, setAttendCode] = useState('')

  const handleSignIn = async () => {
    if (!username || !password) {
      alert("All fields above must be filled to sign up.")
    }
    else {
      const name = username
      const {
        data: { status, activities },
      } = await axios.get('/api/sign-in', { params: { name, password } });

      console.log(status, activities);
      if (status) {
        ///if success
        const curUser = {
          username: username,
          eventList: activities
        }
        setUser(curUser)
        setUserName('')
        setPassword('')
        setStart(false)
      }
      else {
        alert("You might be entering the wrong username or password.")
      }
    }
  }
  const handleSignUp = async () => {
    var e = document.getElementById('email')
    if (!username || !email || !password || !password2) {
      alert("All fields above must be filled to sign up.")
    }
    else if (!e.validity.valid){
      alert("Please enter a valid email address.")
    }
    else if (password !== password2) {
      alert("Your passwords does not match, please try again.")
    }
    else {
      ///if success
      const name = username
      console.log('sign up')

      if (window.confirm(`You are signing up as "${username}" with email: ${email}.`)) {
        console.log('sign up')
        const {
          data: { status },
        } = await axios.post('/api/sign-up', {
          name,
          password,
          email,
        });
        console.log(status);

        if (status) {
          setSignIn(true)
          setUserName('')
          setEmail('')
          setPassword('')
          setPassword2('')
        }
      }
    }

  }
  const handleBackToSignIn = () => {
    setSignIn(true)
  }
  return (
    <div className='startPage'>
      <div className='signIn-box'>
        <Logo />
        {
          signIn ?
          <SignInSec
          handleSignIn={handleSignIn}
          setSignIn={setSignIn}
          setUserName={setUserName}
          setPassword={setPassword}/> :
          <SignUpSec
          handleSignUp={handleSignUp}
          handleBackToSignIn={handleBackToSignIn}
          setUserName={setUserName}
          setPassword={setPassword}
          setPassword2={setPassword2}
          setEmail={setEmail}/>
        }
      </div>
    </div>
  )
}

export default StartPage;

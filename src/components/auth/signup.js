import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { Auth } from 'aws-amplify'
import NumberFormat from 'react-number-format'
import Button from '@material-ui/core/Button'
import Message from '../message'
import { AuthForm, Email, Password, TextInput, CustomAction } from './auth-forms'

const SignUp = () => {
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [firstname, setFirstname] = useState('')
  const [surname, setSurname] = useState('')
  const [triggerMessage, setTriggerMessage] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError('')
  }, [email, password, confirmedPassword, phoneNumber])

  // Checking re-typed password matches
  useEffect(() => {
    let matched = true
    for (let i = 0; i < confirmedPassword.length; i++) {
      if (confirmedPassword[i] !== password[i]) {
        matched = false
      }
    }

    if (!matched || confirmedPassword.length > password.length)
      setError("Re-typed password does not match. Please type again.")

  }, [password, confirmedPassword])   

  const missingData = () => {
    return !(firstname && surname && email && password && confirmedPassword && phoneNumber && !phoneNumber.includes('_') & password === confirmedPassword)
  }

  const signUp = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { 
          email: email, 
          phone_number: phoneNumber.replace(/ /g, ""),
          given_name: firstname,
          family_name: surname
        },
      })

      setTriggerMessage(true)
    } catch (err) {
      setError(err)
      setLoading(false)
      console.log('error signing up...', err)
    }
  }

  /* Currently, the default Input component is forcefully setting autoComplete="off" which doesn't disable Chrome's 
  * autofill functionality on latest browser versions. For achieving that, we need to pass autoComplete="new-password" 
  * https://github.com/JedWatson/react-select/issues/3500
  */
  return (
    <>
      <AuthForm title="Create a new account" error={error}>
        <TextInput
          required
          handleUpdate={(event) => setFirstname(event.target.value.trim())}
          textInput={firstname}
          autoComplete="new-password"
          placeholder="firstname"
        />
        <TextInput
          required
          handleUpdate={(event) => setSurname(event.target.value.trim())}
          textInput={surname}
          autoComplete="new-password"
          placeholder="surname"
        />
        <Email
          required
          handleUpdate={(event) => setEmail(event.target.value.trim())}
          email={email}
          autoComplete="new-password"
        />
        <Password
          required
          handleUpdate={(event) => setPassword(event.target.value.trim())}
          password={password}
          autoComplete="new-password"
        />
        <Password
          required
          handleUpdate={(event) => setConfirmedPassword(event.target.value.trim())}
          password={confirmedPassword}
          placeholder="confirm password"
          autoComplete="new-password"
        />
        <div className="form-group">
          <NumberFormat
            placeholder="+614xxxxxxxx*"
            onChange={(event) => setPhoneNumber(event.target.value.trim())}
            name="phone_number"
            value={phoneNumber}
            type="tel"
            className="form-control"
            format="+614########"
            mask="_"
          />
        </div>
        <Button
          onClick={signUp}
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          disabled={loading || missingData()}
        >
          {loading ? null : 'Create Account'}
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
        <CustomAction
          padding={10}
          question="Have an account?"
          action="Sign in"
          cb={() => navigate("/signin")}
        />          
      </AuthForm>
      <Message 
        triggerOpen={triggerMessage} 
        initOpen={false}
        message={"A confirmation link has been sent to your email. Once your email is confirmed, you can proceed to sign in. If you don't receive the confirmation email within a few seconds, please check your spam folder."}
        action="OK"
        cb={() => navigate('/signin')}
        disableClose={true}
      />        
    </>            
  )
}

export default SignUp

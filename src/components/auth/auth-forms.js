import React from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

export function AuthForm({ children, title='', instruction='', error }) {
  return (
    <Container maxWidth="xs" className="dark-grey-text">
      {title && <h2 className="pt-5 pb-3 text-center h2-responsive font-weight-bold" >{title}</h2>}
      {instruction && <p>{instruction}</p>}
      {error && (
        <p className="text-danger">
          {error.message ? error.message : JSON.stringify(error)}
        </p>
      )}
      {children}
    </Container>
  )
}

export function Email({ handleUpdate, email, autoComplete, placeholder='email', required=false }) {
  return (
    <div className="form-group">
      <input
        onChange={handleUpdate}
        name="email"
        type="email"
        value={email}
        className="form-control"
        autoComplete={autoComplete}
        id="enterEmailAddress"
        aria-describedby="emailHelp"
        placeholder={required ? `${placeholder}*` : placeholder}
      />
    </div>
  )
}

export function TextInput({ handleUpdate, disabled=false, textInput, autoComplete, placeholder, required=false }) {
  return (
    <div className="form-group">
      <input
        onChange={handleUpdate}
        disabled={disabled}
        name={placeholder}
        type="text"
        value={textInput}
        className="form-control"
        autoComplete={autoComplete}
        id={placeholder}
        aria-describedby={placeholder}
        placeholder={required ? `${placeholder}*` : placeholder}
      />
    </div>
  )
}

export function Password({ handleUpdate, password, autoComplete, name='password', placeholder='password (at least 8 chars with a-z and 0-9)', required=false }) {
  return (
    <div className="form-group">
      <input
        onChange={handleUpdate}
        autoComplete={autoComplete}
        name={name}
        value={password}
        type="password"
        className="form-control"
        placeholder={required ? `${placeholder}*` : placeholder}
        id={placeholder}
      />
    </div>
  )
}

export function ConfirmationCode({ handleUpdate, authCode, autoComplete }) {
  return (
    <div className="form-group">
      <label htmlFor="enterCode" className='mt-3' >Verification Code</label>
      <input
        onChange={handleUpdate}
        autoComplete={autoComplete}
        name="authCode"
        value={authCode}
        type="text"
        className="form-control"
        placeholder="######"
        id="enterCode"
      />
    </div>
  )
}

export function CustomAction({ padding, question, action, cb, disabled=false }) {
  return (
    <div
      style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: padding,
      paddingBottom: padding
    }}
    >
      <p style={{ marginTop: 10, marginBottom: 10 }}>{question}</p>
      <Button
        color="primary"
        onClick={cb}
        disabled={disabled}
      >
        {action}
      </Button>
  </div>
  )
}      
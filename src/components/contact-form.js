import React, { useEffect, useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import logo from '../images/logo.png'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    margin: 20
  },
  grow: {
    flexGrow: 1
  },
  button: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20
  },
  logo: {
    maxWidth: '50%',
    width: 'auto',
    maxHeight: 150,
    [theme.breakpoints.down('sm')]: {
      maxHeight: 100,
    }
  },
  close: {
    justifyContent: "flex-end"
  }  
}))

export default function ContactForm({theme, triggerOpen, initOpen}) {
  const [open, setOpen] = useState(false)
  const didMountRef = useRef(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const classes = useStyles(theme)

  useEffect(() => {
    if (didMountRef.current) {
      setOpen(true)
    }
    else {
      didMountRef.current = true
      setOpen(initOpen)
    }
  }, [triggerOpen, initOpen])

  const handleSend = async () => {

    const response = await fetch(process.env.GATSBY_DIGITF_EMAIL_SERVER, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: 'lindachenau@gmail.com',
        body: `<h3>Name: ${name}</h3>
          <h3>Phone: ${phone}</h3>
          <h3>Email: ${email}</h3>
          <h3>Message:</h3>
          <p>${message}</p>`,
        subject: 'Enquiry for DiGi Transform',
        source: 'sootyyu@gmail.com'   
      })
    })

    const {status} = await response.json()
    
    if (status === 'success') {
      alert("Enquiry email sent successfully!")
    }
    else {
      alert("Email sending failed")
    }

    setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onBackdropClick={() => setOpen(false)}>
        <IconButton edge="start" color="inherit" className={classes.close} onClick={() => setOpen(false)} aria-label="close">
          <CloseIcon />
        </IconButton>
        <div className={classes.container}>
          <div className={classes.grow} />
            <img className={classes.logo} src={logo} alt="Aspire Medical Centre Eastwood logo" />
          <div className={classes.grow} />
        </div>
        <DialogContent>
          <h1 className="pt-3 pb-2 text-center h1-responsive font-weight-bold" >Contact Us</h1>
          <Typography variant="body2" align="center" gutterBottom>
            Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>          
          <TextField
            required
            margin="dense"
            label="name"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
              required
              margin="dense"
              label="email"
              type="email"
              fullWidth
              variant="outlined"
              defaultValue={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          <TextField
              margin="dense"
              label="phone"
              type="tel"
              fullWidth
              variant="outlined"
              defaultValue={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          <TextField
              required
              margin="dense"
              label="message"
              type="text"
              multiline
              rows="5"
              fullWidth
              variant="outlined"
              paragraph
              defaultValue={message}
              onChange={(event) => setMessage(event.target.value)}
            />                                  
        </DialogContent>
        <DialogActions className={classes.button}>
          <Button 
            variant="contained" 
            onClick={handleSend} 
            color="primary" 
            disabled={name === '' || email === '' || message === ''}
            fullWidth
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
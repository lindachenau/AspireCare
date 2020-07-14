import React, { useEffect, useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    margin: 20
  },
  button: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20
  },
  close: {
    justifyContent: "flex-end"
  }  
}))

export default function Message({theme, message, action, cb, triggerOpen, initOpen, disableClose=false}) {
  const [open, setOpen] = useState(false)
  const didMountRef = useRef(false)

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

  const closeDialog = () => {
    if (disableClose)
      return

    setOpen(false)      
  }

  const doAction = () => {
    cb()
    setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onBackdropClick={closeDialog}>
        {!disableClose &&
          <IconButton edge="start" color="inherit" className={classes.close} onClick={() => setOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>}        
        <DialogContent>
          <Typography variant="body2" align="center" gutterBottom>
            {message}
          </Typography>          
        </DialogContent>
        <DialogActions className={classes.button}>
          <Button onClick={doAction} color="primary">
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
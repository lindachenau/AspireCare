import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Storage } from 'aws-amplify'
import showdown from 'showdown'
import axios from 'axios'
import logo from '../images/logo.png'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    margin: 20
  },
  grow: {
    flexGrow: 1
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

export default function Bulletin({theme}) {
  const [open, setOpen] = useState(false)
  const [noticeUrl, setNoticeUrl] = useState('')
  const [html, setHtml] = useState('')
  const converter = new showdown.Converter()
  
  const classes = useStyles(theme)

  useEffect(() => {
    Storage.get('notice.md')
      .then(data => {
        setNoticeUrl(data)
      })
      .catch(err => {
        console.log('error fetching notice.md')
      })
  }, [])

  useEffect(() => {
    const fetchNotice = async () => {
      if (noticeUrl) {
        try {
          const config = {
            method: 'get',
            headers: {
              "Content-Type": "application/json"
            },
            url: noticeUrl
          }
          const result = await axios(config)
          setHtml(converter.makeHtml(result.data))
          setOpen(true)
        }
        catch (err) {
          console.log('error reading notice.md')
        }
      }
    }

    fetchNotice()

  }, [noticeUrl])

  const closeDialog = () => {
    setOpen(false)      
  }

  return (
    <>
      <Dialog open={open} onBackdropClick={closeDialog}>
        <IconButton edge="start" color="inherit" className={classes.close} onClick={closeDialog} aria-label="close">
          <CloseIcon />
        </IconButton> 
        <div className={classes.container}>
          <div className={classes.grow} />
          <img className={classes.logo} src={logo} alt="Aspire Medical Centre Eastwood logo" />
          <div className={classes.grow} />
        </div>
        <DialogContent>    
          <div className='text-center' dangerouslySetInnerHTML={{ __html: html }} />
        </DialogContent>
      </Dialog>
    </>
  )
}
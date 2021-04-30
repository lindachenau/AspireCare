import React, { useEffect, useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import LocationSearchInput from './location-search-input'
import { saveContacts } from '../utils/booking-api'

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 20
  },
  close: {
    justifyContent: "flex-end"
  }  
}))

export default function PatientContactForm({theme, triggerOpen, initOpen, patientInfo}) {
  const [open, setOpen] = useState(false)
  const didMountRef = useRef(false)
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [homeNumber, setHomeNumber] = useState('')
  const [workNumber, setWorkNumber] = useState('')
  
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

  useEffect(() => {
    setAddress(`${patientInfo.address1}, ${patientInfo.city} ${patientInfo.postcode}`)
    setEmail(patientInfo.email)
    setMobile(patientInfo.mobilePhone)
    setHomeNumber(patientInfo.homePhone)
    setWorkNumber(patientInfo.workPhone)
  }, [patientInfo])

  const onChangeLocation = address => {
    setAddress(address.replace(', Australia', ''))
  }

  const parseAddress = (address) => {
    const comma = address.indexOf(',')
    let address1 = comma === -1 ? address : address.substring(0, comma)
    const stateList = ['NSW', 'QLD', 'VIC', 'WA', 'NT', 'TAS', 'SA', 'ACT', 'JBT']
    const states = stateList.filter(state => address.includes(state))
    let city = ""
    let postcode = ""

    if (states.length === 1) {
      const state = states[0]
      const statePos = address.indexOf(state)
      city = address.substring(comma + 1, statePos).trim()
      postcode = address.substring(statePos + state.length).trim()
    } else {
      // parsing failed. Just save everything to address1
      address1 = address
    }

    return {address1, city, postcode}
  }

  const handleSave = () => {
    const {address1, city, postcode} = parseAddress(address)
    saveContacts(patientInfo.patientID, homeNumber, workNumber, mobile, address1, city, postcode, email)
    setOpen(false)
  }

  return (
    <>
      <Dialog maxWidth='xs' open={open} onBackdropClick={() => setOpen(false)}>
        <IconButton edge="start" color="inherit" className={classes.close} onClick={() => setOpen(false)} aria-label="close">
          <CloseIcon />
        </IconButton>               
        <DialogContent>
          <h3 className="pt-3 pb-2 text-center h3-responsive font-weight-bold" >Address, Contact & Email</h3>
          <LocationSearchInput
              address={address} 
              changeAddr={onChangeLocation}
          />
          <TextField
            required
            margin="dense"
            label="Mobile phone number"
            type="tel"
            fullWidth
            defaultValue={mobile}
            onChange={(event) => setMobile(event.target.value.trim())}
          />
          <TextField
            margin="dense"
            label="email"
            type="email"
            fullWidth
            defaultValue={email}
            onChange={(event) => setEmail(event.target.value.trim())}
          />
          <TextField
            margin="dense"
            label="Home phone number"
            type="tel"
            fullWidth
            defaultValue={homeNumber}
            onChange={(event) => setHomeNumber(event.target.value.trim())}
          />
          <TextField
            margin="dense"
            label="Work phone number"
            type="tel"
            fullWidth
            defaultValue={workNumber}
            onChange={(event) => setWorkNumber(event.target.value.trim())}
          />                              
        </DialogContent>
        <DialogActions className={classes.button}>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            color="primary" 
            fullWidth
            disabled={!(address && mobile)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
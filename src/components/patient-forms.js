import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import PatientProfile from './patient-profile'
import MedicareForm from './medicare-form'
import PatientContactForm from './patient-contact-form'

const useStyles = makeStyles(theme => ({
  pointer: {  
    '&:hover': {
      cursor: 'pointer'
  }}
}))

const PatientForms = ({patient}) => {
  const classes = useStyles()
  const [triggerProfile, setTriggerProfile] = useState(false)
  const [triggerMedicare, setTriggerMedicare] = useState(false)
  const [triggerContact, setTriggerContact] = useState(false)
  const patientHeading = patient ? `Edit ${patient}'s patient information` : "Create a new patient profile and edit patient information"

  const checkVerified = () => {
    return false
  }

  const editMedicareInfo = () => {
    if (!checkVerified())
      setTriggerMedicare(!triggerMedicare)
  }

  const editContactInfo = () => {
    if (!checkVerified())
      setTriggerContact(!triggerContact)
  }
  
  return (
    <>
      <h3 className={'h3-responsive font-weight-bold text-center pt-5'} >{patientHeading}</h3>
      <List>
        {!patient && 
        <ListItem className={classes.pointer} alignItems="flex-start" onClick={() => setTriggerProfile(!triggerProfile)}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Profile"
            secondary="Mandatory patient identity"
          />
        </ListItem>}
        <Divider variant="inset" component="li" />
        <ListItem className={classes.pointer} alignItems="flex-start" onClick={editMedicareInfo}>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Medicare"
            secondary="Optional Medicare details"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem className={classes.pointer} alignItems="flex-start" onClick={editContactInfo}>
          <ListItemIcon>
            <ContactPhoneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Address & Contact"
            secondary="Optional address & contact details"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem className={classes.pointer} alignItems="flex-start">
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Pensioner"
            secondary="Optional pensioner details"
          />
        </ListItem>                  
      </List>
      <PatientProfile triggerOpen={triggerProfile} initOpen={false} />
      <MedicareForm triggerOpen={triggerMedicare} initOpen={false} />
      <PatientContactForm triggerOpen={triggerContact} initOpen={false} />
    </>
  )
}

export default PatientForms
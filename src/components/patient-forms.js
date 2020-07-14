import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import PatientProfile from './patient-profile'

const useStyles = makeStyles(theme => ({
  pointer: {  
    '&:hover': {
      cursor: 'pointer'
  }}
}))

const PatientForms = () => {
  const classes = useStyles()
  const [triggerProfile, setTriggerProfile] = useState(false) 
  
  return (
    <>
      <List>
        <ListItem className={classes.pointer} alignItems="flex-start" onClick={() => setTriggerProfile(!triggerProfile)}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Profile"
            secondary="Mandatory patient identity"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem className={classes.pointer} alignItems="flex-start">
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Medicare"
            secondary="Optional Medicare details"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem className={classes.pointer} alignItems="flex-start">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Address"
            secondary="Optional address details"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem className={classes.pointer} alignItems="flex-start">
          <ListItemIcon>
            <ContactPhoneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Contact"
            secondary="Optional contact details"
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
    </>
  )
}

export default PatientForms
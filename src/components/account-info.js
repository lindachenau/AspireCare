import React from 'react'
import Paper from '@material-ui/core/Paper' 
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'
import EditIcon from '@material-ui/icons/Edit'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EventIcon from '@material-ui/icons/Event'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    [theme.breakpoints.up('sm')]: {
      marginTop: 30,
      marginBottom: 30,
      padding: 30
    }
  }
}))

const AccountInfo = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={3}>
      <List>
      <ListItem>
          <ListItemIcon>
            <AccountCircleIcon color="primary"/>
          </ListItemIcon>
          <ListItemText
            primary="Our online booking allows you to book on behalf of your family members. 
            Each login is a booking proxy. A patient can be managed by more than one proxy. For example, both
            parents can be a booking proxy for their children."
          />
        </ListItem>        
        <ListItem>
          <ListItemIcon>
            <PeopleIcon color="primary"/>
          </ListItemIcon>
          <ListItemText
            primary="To book for a consultation, you first need to create a record for each patient, including yourself. 
            Click the Patients button to add patients. Please ensure you are authorised to book on their behalves. 
            New patients are required to show a photo ID on their first appointment."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EditIcon color="primary"/>
          </ListItemIcon>
          <ListItemText
            primary="If you book new patients to our clinic, we encourage you to fill in their patient information online 
            before their appointment and submit to our Practice Management System to speed up the paper work required for their 
            first appointment. Our website does not keep your data. All information is encrypted before submitting to our Practice 
            Management System."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EventIcon color="primary"/>
          </ListItemIcon>               
          <ListItemText
            primary="Once appointments are booked, you can cancel the appointments online if the patient cannot attend their appointments.
            A booking for a child created by the father can be cancelled by the mother and vice versa."
          />
        </ListItem>
      </List>
    </Paper>    
  )
}

export default AccountInfo

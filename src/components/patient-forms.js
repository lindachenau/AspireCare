import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import PatientProfile from './patient-profile'
import MedicareForm from './medicare-form'
import PatientContactForm from './patient-contact-form'
import PensionForm from './pension-form'
import { 
  getPatientInfoURL, 
  updatePatientMedicareURL, 
  updatePatientPensionURL, 
  updatePatientContactsURL, 
  updatePatientAddressURL, 
  updatePatientEmailURL} from '../utils/booking-api'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  pointer: {  
    '&:hover': {
      cursor: 'pointer'
  }},
  flex: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1,
  }  
}))

const PatientForms = ({patient, setPatient, doneEdit, bpId, setBpId}) => {
  const classes = useStyles()
  const [triggerProfile, setTriggerProfile] = useState(false)
  const [triggerMedicare, setTriggerMedicare] = useState(false)
  const [triggerContact, setTriggerContact] = useState(false)
  const [triggerPension, setTriggerPension] = useState(false)
  const [patientInfo, setPatientInfo] = useState({})
  //A new patient is someone who's never visited Aspire Medical Centre.
  const patientHeading = patient ? `Edit ${patient}'s patient information` : "Create a patient profile and edit patient information"

  useEffect(() => {
    const fetchPatientInfo = async (patientID) => {
      try {
        const config = {
          method: 'post',
          headers: {"Content-Type": "application/json"},
          url: getPatientInfoURL,
          data: {
            patientID       
          }
        }
        const result = await axios(config)
        setPatientInfo(result.data)
      } catch(err) {
        console.log('BP_GetPatientByInternalID error', err)
      }
 
    }

    if (bpId)
      fetchPatientInfo(bpId)
  }, [bpId])

  const editMedicareInfo = () => {
    if (!patient)
      alert('Please create a patient profile first.')
    else
      setTriggerMedicare(!triggerMedicare)
  }

  const editContactInfo = () => {
    if (!patient)
      alert('Please create a patient profile first.')
    else      
      setTriggerContact(!triggerContact)
  }

  const editPensionInfo = () => {
    if (!patient)
      alert('Please create a patient profile first.')
    else      
      setTriggerPension(!triggerPension)
  }

  const saveMedicare = async (patientID, medicareNo, medicareLineNo, medicareExpiry) => {
    try {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: updatePatientMedicareURL,
        data: {
          patientID, 
          medicareNo, 
          medicareLineNo, 
          medicareExpiry          
        }
      }
      await axios(config)
    } catch(err) {
      console.log('BP_UpdatePatientMedicare error', err)
    }
  }
  
  const saveContacts = async (patientID, homePhone, workPhone, mobilePhone, address1, city, postcode, email) => {
    try {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: updatePatientContactsURL,
        data: {
          patientID, 
          homePhone, 
          workPhone, 
          mobilePhone         
        }
      }
      axios(config)
    } catch(err) {
      console.log('BP_UpdatePatientContacts error', err)
    }

    try {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: updatePatientAddressURL,
        data: {
          patientID,
          address1, 
          city, 
          postcode
        }
      }
      axios(config)
    } catch(err) {
      console.log('BP_UpdatePatientAddress error', err)
    }

    try {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: updatePatientEmailURL,
        data: {
          patientID, 
          email
        }
      }
      await axios(config)
    } catch(err) {
      console.log('BP_UpdatePatientEmail error', err)
    }
  }
  
  const savePension = async (patientID, pensionCode, pensionNo, pensionExpiry) => {
    try {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: updatePatientPensionURL,
        data: {
          patientID, 
          pensionCode, 
          pensionNo, 
          pensionExpiry
        }
      }
      await axios(config)
    } catch(err) {
      console.log('BP_UpdatePatientPension error', err)
    }
  }
  
  return (
    <div>
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
            secondary="Optional Medicare information"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem className={classes.pointer} alignItems="flex-start" onClick={editContactInfo}>
          <ListItemIcon>
            <ContactPhoneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Address, Contact & Email"
            secondary="Optional address, contact & email information"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem className={classes.pointer} alignItems="flex-start" onClick={editPensionInfo}>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Pension"
            secondary="Optional pension information"
          />
        </ListItem>                  
      </List>
      <PatientProfile triggerOpen={triggerProfile} initOpen={false} setPatient={setPatient} doneEdit={doneEdit} setBpId={setBpId}/>
      <MedicareForm triggerOpen={triggerMedicare} initOpen={false} saveMedicare={saveMedicare} patientInfo={patientInfo}/>
      <PatientContactForm triggerOpen={triggerContact} initOpen={false} saveContacts={saveContacts} patientInfo={patientInfo}/>
      <PensionForm triggerOpen={triggerPension} initOpen={false} savePension={savePension} patientInfo={patientInfo}/>
      <div className={classes.flex}>
        <div className={classes.grow} />
        <Button 
          variant="contained" 
          onClick={doneEdit} 
          color="primary"
          aria-label="done with patient forms"
          startIcon={<EditIcon />}
        >
          Done
        </Button>
      </div>
    </div>
  )
}

export default PatientForms
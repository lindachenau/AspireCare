import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper' 
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CancelIcon from '@material-ui/icons/Cancel'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import Typography from '@material-ui/core/Typography'
import Message from '../components/message'
import { getUser as getAppUser} from './auth/app-user'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser, getPatient }  from '../graphql/queries'
import { updateAppointment } from '../graphql/mutations'
import { getPatientAptsURL, cancelAppointmentURL, arriveAppointmentURL, appointmentWaitingCode } from '../utils/booking-api'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    maxWidth: 600,
    [theme.breakpoints.up('sm')]: {
      margin: "auto",
      padding: 30
    }
  },
  flex: {
    display: 'flex',
    justifyContent: "space-around"
  },
  norecord: {
    margin: 30
  },
  iconColor: {
    color: theme.palette.primary.main
  }  
}))

const Legend = () => {
  const classes = useStyles()
  return (
    <>
      <ListItem>
        <ListItemIcon className={classes.iconColor} >
          <CancelIcon />
        </ListItemIcon>      
        <ListItemText
          primary="Cancel an appointment"
        />
      </ListItem> 
      <ListItem>
        <ListItemIcon className={classes.iconColor}>
          <EmojiPeopleIcon />
        </ListItemIcon>      
        <ListItemText
          primary="Tell our reception you have arrived for your appointment"
        />
      </ListItem>    
    </>             
  )
}

const Appointment = ({
  appointment, 
  setAptId, 
  setAptDescription, 
  triggerCancelMessage, 
  setTriggerCancelMessage, 
  triggerCheckinMessage, 
  setTriggerCheckinMessage, 
  appointmentStatus
}) => {
  const now = new Date().getTime()
  const slot = new Date(`${appointment.aptDate} ${appointment.aptTime}`).getTime()
  const twoHours = 2 * 3600000
  const disableCancel = (slot - now) < twoHours ? true : false
  const fourHours = 4 * 3600000
  const disableCheckin = Math.abs(slot - now) > fourHours || appointment.status === appointmentWaitingCode ? true: false
  const [checkedin, setCheckedin] = useState(false)

  const cancelAppointment = () => {
    setAptId(appointment.aptID)
    setAptDescription(`${appointment.provider} on ${appointment.aptDate} at ${appointment.aptTime}`)
    setTriggerCancelMessage(!triggerCancelMessage)
  }

  const arriveAppointment = () => {
    setAptId(appointment.aptID)
    setAptDescription(`${appointment.provider} on ${appointment.aptDate} at ${appointment.aptTime}`)
    setTriggerCheckinMessage(!triggerCheckinMessage)
    setCheckedin(true)
  }

  return (
    <ListItem>
      <ListItemText
        primary={`${appointment.aptDate} ${appointment.aptTime} ${appointment.provider}`}
      />
      {appointmentStatus === 'current' &&
      <>
        <ListItemIcon>
          <IconButton edge="end" aria-label="cancel" onClick={cancelAppointment} disabled={disableCancel}>
            <CancelIcon />
          </IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton edge="end" aria-label="cancel" onClick={arriveAppointment} disabled={disableCheckin || checkedin}>
            <EmojiPeopleIcon />
          </IconButton>
        </ListItemIcon>
      </>
      }
    </ListItem>
  )
}

const Appointments = () => {
  const userInfo = getAppUser()
  const [patients, setPatients] = useState([])
  const [curPatient, setCurPatient] = useState(userInfo.patientIndex ? userInfo.patientIndex : 0)
  const [aptId, setAptId] = useState(null)
  const [aptDescription, setAptDescription] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [appointmentStatus, setAppointmentStatus] = useState("current")
  const [triggerFetchPatients, setTriggerFetchPatients] = useState(false)
  const [triggerCancelMessage, setTriggerCancelMessage] = useState(false)
  const cancelMessage = `You are cancelling the appointment with ${aptDescription}.`  
  const [triggerCheckinMessage, setTriggerCheckinMessage] = useState(false)
  const checkinMessage = `You are checking in the appointment with ${aptDescription}.`  
  const classes = useStyles()
  const username = getAppUser().username
  
  useEffect(() => {
    const getPatientsByUser = async () => {
      try {
        const user = await API.graphql(graphqlOperation(getUser, {id: username}))
        const members = user.data.getUser.patients.items
        const patientIds = members.map(member => member.memberID)
        
        Promise.allSettled(patientIds.map(id => {
          return API.graphql(graphqlOperation(getPatient, {id: id}))
        }))
        .then((results) => {
          let pats = []
          results.forEach(result => {
            if (result.status === 'fulfilled') {
              pats.push(result.value.data.getPatient)
            }
          })
          setPatients(pats)
        })
      } catch (err) {
        console.log('Amplify getUser error...: ', err)
      }
    }

    getPatientsByUser()

  }, [username])  

  const getPatientAptsFromBP = async (patientID) => {
    try {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: getPatientAptsURL,
        data: {
          patientID
        }
      }
      const result = await axios(config)

      return result.data
    } catch(err) {
      console.log('BP_AddAppointment error', err)
    }
  }

  useEffect(() => {
    const getAppointmentsByPatient = async () => {
      // console.log('Patients', patients)
      const patient = patients.length > 0 ? patients[curPatient] : null
      if (patient) {
        try {
          const appointments = await getPatientAptsFromBP(patient.bpPatientId)

          // Today at 0:0 am
          let today = new Date()
          today.setHours(0, 0, 0)
          setAppointments(appointments.filter(appointment => {
            const slot = new Date(`${appointment.aptDate} ${appointment.aptTime}`)

            // Current radio button pressed
            if (appointmentStatus === 'current')
              return (slot > today) ? appointment : null
            else
              return (slot <= today) ? appointment : null
          }))            
        } catch (err) {
          console.log('BP_GetPatientAppointments error...: ', err)
        }          
      }
    }
    
    getAppointmentsByPatient()

  }, [patients, curPatient, triggerFetchPatients, appointmentStatus] )

  const cancelBPAppointment = async (aptID) => {
    try {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: cancelAppointmentURL,
        data: {
          aptID
        }
      }
      const result = await axios(config)

      return result.data
    } catch(err) {
      console.log('BP_CancelAppointment error', err)
    }
  }  

  const confirmCancelling = async () => {
    try {
      cancelBPAppointment(aptId)
      await API.graphql(graphqlOperation(updateAppointment, {
        input: {
          id: aptId.toString(),
          canceledBy: username
        }
      }))
    } catch (err) {
      console.log('Amplify updateAppointment error...: ', err)
    }
    setTriggerFetchPatients(!triggerFetchPatients)
  }

  const confirmCheckin = async () => {
    try {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: arriveAppointmentURL,
        data: {
          aptID : aptId
        }
      }
      const result = await axios(config)

      return result.data
    } catch(err) {
      console.log('BP_ArriveAppointment error', err)
    }
  }

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.flex}>
        <FormControl required>
          <InputLabel id="patient-select-label">Patient</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={curPatient}
            onChange={event => setCurPatient(event.target.value)}
          >          
            {patients.map((patient, index) => {
              return (
                <MenuItem key={patient.bpPatientId} value={index}>
                  {`${patient.firstname} ${patient.lastname}`}
                </MenuItem>
              )}
            )}
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <RadioGroup 
            row
            aria-label="status" 
            name="status" 
            value={appointmentStatus} 
            onChange={(event) => setAppointmentStatus(event.target.value)}
          >
            <FormControlLabel value="current" control={<Radio />} label="Current" />
            <FormControlLabel value="history" control={<Radio />} label="History" />
          </RadioGroup>
        </FormControl>
      </div>
      {appointments.length === 0 && <Typography className={classes.norecord}>No records found</Typography>}
      {appointments.length > 0 && appointmentStatus === 'current' && <Legend/>}                
      <List>
        {appointments.map(appointment => {
          return (
            <Appointment key={appointment.aptID}
              appointment={appointment}
              setAptId={setAptId}
              setAptDescription={setAptDescription}
              triggerCancelMessage={triggerCancelMessage}
              setTriggerCancelMessage={setTriggerCancelMessage}
              triggerCheckinMessage={triggerCheckinMessage}
              setTriggerCheckinMessage={setTriggerCheckinMessage}
              appointmentStatus={appointmentStatus}
            />
          )}
        )}
      </List>
      <Message 
        triggerOpen={triggerCancelMessage} 
        initOpen={false}
        message={cancelMessage}
        action="confirm"
        cb={confirmCancelling}
      />
      <Message 
        triggerOpen={triggerCheckinMessage} 
        initOpen={false}
        message={checkinMessage}
        action="confirm"
        cb={confirmCheckin}
      />              
    </Paper>
  )
}

export default Appointments
import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
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
import FormLabel from '@material-ui/core/FormLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CancelIcon from '@material-ui/icons/Cancel'
import Message from '../components/message'
import { getUser } from './app-user'
import { API, graphqlOperation } from 'aws-amplify'
import { listPatients, listAppointments }  from '../graphql/queries'
import { deleteAppointment } from '../graphql/mutations'

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
  }
}))

const Appointment = ({id, appointmentDate, setAppId, triggerMessage, setTriggerMessage}) => {
  const cancelAppointment = () => {
    setAppId(id)
    setTriggerMessage(!triggerMessage)
  }

  return (
    <ListItem>
      <ListItemText
        primary={appointmentDate}
      />
      <ListItemIcon>
        <IconButton edge="end" aria-label="cancel" onClick={cancelAppointment}>
          <CancelIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  )
}

const Appointments = ({}) => {
  const userInfo = getUser()
  const [patients, setPatients] = useState([])
  const [curPatient, setCurPatient] = useState(userInfo.patientIndex ? userInfo.patientIndex : 0)
  const [appId, setAppId] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [appointmentStatus, setAppointmentStatus] = useState("current")
  const [triggerMessage, setTriggerMessage] = useState(false)
  const [triggerFetchPatients, setTriggerFetchPatients] = useState(false)
  const message = `You are cancelling appointment with ${appId}.`  
  const classes = useStyles()

  useEffect(() => {
    const getPatientsByUser = async () => {
      const username = userInfo.username
      try {
        const patients = await API.graphql(graphqlOperation(listPatients, {
          filter: {
            userID: {
              eq: username
            }
          }
        }))
        
        setPatients(patients.data.listPatients.items)

      } catch (err) {
        console.log(console.log('Amplify listPatients error...: ', err))
      }
    }

    getPatientsByUser()

  }, [])

  useEffect(() => {
    const getAppointmentsByPatient = async () => {
      const patient = patients.length > 0 ? patients[curPatient] : null
      if (patient) {
        try {
          const appointments = await API.graphql(graphqlOperation(listAppointments, {
            filter: {
              patientID: {
                eq: patient.id
              }
            },
            limit: 20
          }))

          setAppointments(appointments.data.listAppointments.items)

        } catch (err) {
          console.log(console.log('Amplify listAppointments error...: ', err))
        }
      }
    }
    
    getAppointmentsByPatient()

  }, [patients, curPatient, triggerFetchPatients])

  const confirmCancelling = async () => {
    try {
      await API.graphql(graphqlOperation(deleteAppointment, {
        input: {
          id: appId
        }
      }))
    } catch (err) {
      console.log(console.log('Amplify deleteAppointment error...: ', err))
    }
    setTriggerFetchPatients(!triggerFetchPatients)
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
                <MenuItem value={index}>
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
      <List>
        {appointments.map(appointment => {
          return (
            <Appointment key={appointment.booking_date} 
              appointmentDate={appointment.booking_date} 
              id={appointment.id}
              setAppId={setAppId}
              triggerMessage={triggerMessage}
              setTriggerMessage={setTriggerMessage}
            />
          )}
        )}
      </List>
      <Message 
        triggerOpen={triggerMessage} 
        initOpen={false}
        message={message}
        action="confirm"
        cb={confirmCancelling}
      />              
    </Paper>
  )
}

export default Appointments
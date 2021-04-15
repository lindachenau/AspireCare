import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import Typography from '@material-ui/core/Typography'
import Layout from '../components/layout'
import Content from '../components/content'
import Paper from '@material-ui/core/Paper' 
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Message from '../components/message'
import { getUser, setUser } from '../components/auth/app-user'
import { API, graphqlOperation } from 'aws-amplify'
import { createAppointment }  from '../graphql/mutations'
import { addAppointmentURL } from '../utils/booking-api'
import titleImg from '../images/bg7.jpg'
import { consultationTypes } from "../utils/bp-codes"
import axios from "axios"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    maxWidth: 600,
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      margin: "auto",
      padding: 30
    }
  },
  radio: {
    marginTop: 10
  },
  flex: {
    display: 'flex',
    marginTop: 30
  },
  grow: {
    flexGrow: 1
  }
}))

const PageBook = () => {
  const [conTypeIndex, setConTypeIndex] = useState(0)
  const [patient, setPatient] = useState(null)
  const [patientId, setPatientId] = useState(null)
  const [bpPatientId, setBpPatientId] = useState(null)
  const [drId, setDrId] = useState(null)
  const [appId, setAppId] = useState(null)
  const [appTime, setAppTime] = useState(null)
  const [email, setEmail] = useState(null)
  const [triggerMessage, setTriggerMessage] = useState(false)
  const message = `You have booked ${patient} with ${appId} for a ${consultationTypes[conTypeIndex].label}. An email has been sent to you for confirmation. If you don't receive it in a few seconds, please check your Spam folder.`  
  const classes = useStyles()

  useEffect(() => {
    const userInfo = getUser()
    setPatient(userInfo.patientName)
    setPatientId(userInfo.patientId)
    setBpPatientId(userInfo.bpPatientId)
    setDrId(userInfo.drId)
    setAppId(userInfo.appId)
    setAppTime(userInfo.appTime)
    setEmail(userInfo.email)
  }, [])

  const handleChange = (event) => {
    setConTypeIndex(event.target.value)
  }  

  const addAppointmentToBP = async (aptDate, aptTime, aptType, practitionerID, patientID) => {
    try {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: addAppointmentURL,
        data: {
          aptDate, 
          aptTime, 
          aptType, 
          practitionerID, 
          patientID
        }
      }
      const result = await axios(config)

      return result.data
    } catch(err) {
      console.log('BP_AddAppointment error', err)
    }
  }

  const addAppointment = async (username) => {
    try {
      const bpAptId = await addAppointmentToBP(appTime.substring(0, 10), appTime.substring(10), consultationTypes[conTypeIndex].code, drId, bpPatientId)
      console.log("BP appointment ID", bpAptId)
      
      API.graphql(graphqlOperation(createAppointment, {
        input: {
          id: appId,
          time: appTime,
          patientID: patientId,
          status: {
            category: 'booked'
          },
          bookedBy: username,
          bpAppointmentId: bpAptId
        }
      }))
    } catch (err) {
      console.log('Amplify createAppointment error...: ', err)
    }
  }

  const book = () => {
    setTriggerMessage(!triggerMessage)
    addAppointment(getUser().username)
 
    //send confirmation email
    const patient = getUser().patientName
    fetch(process.env.GATSBY_DIGITF_EMAIL_SERVER, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: email,
        body: `You have booked ${patient} with ${appId} for a ${consultationTypes[conTypeIndex].label}.`,
        subject: 'Your booking is confirmed!',
        source: 'sootyyu@gmail.com'   
      })
    })

    //clear patient and appId
    const updatedUserInfo = getUser()
    delete updatedUserInfo.patientName
    delete updatedUserInfo.patientId
    delete updatedUserInfo.bpPatientId
    delete updatedUserInfo.drId
    delete updatedUserInfo.appId
    updatedUserInfo.checkingBookingStatus = true
    setUser(updatedUserInfo)
  }

  return (
    <Layout>
      <Content title='Booking appointment' titleImg={titleImg}>
        <Paper className={classes.root} elevation={3}>
          <Typography variant="h6" align="left" gutterBottom>
            {`For ${patient} with ${appId} for a`}
          </Typography>
          <FormControl className={classes.radio} component="fieldset">
            <FormLabel component="legend">Consultation type</FormLabel>
            <RadioGroup aria-label="consultation type" name="consultation" value={conTypeIndex} onChange={handleChange}>
              {consultationTypes.map((item, index) => 
                <FormControlLabel value={index} control={<Radio />} label={item.label} />)}
            </RadioGroup>
          </FormControl>
        </Paper>
        <div className={classes.flex} >
          <div className={classes.grow} />
          <Button variant='contained' onClick={book} color="primary">
              confirm booking
          </Button>
          <div className={classes.grow} /> 
        </div>       
        <Message 
          triggerOpen={triggerMessage} 
          initOpen={false}
          message={message}
          action="OK"
          cb={() => navigate('/my-account')}
          disableClose={true}
        />        
      </Content>    
    </Layout>
  )
}

export default PageBook
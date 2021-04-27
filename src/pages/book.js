import React, { useState, useMemo } from 'react'
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
import { useAppointmentProfiles } from '../utils/useAppointmentProfiles'
import { useEmailConfirmation } from '../utils/useEmailConfirmation'
import TermsConditions from '../components/terms-and-conditions'
import axios from "axios"
import { google, outlook, office365 } from "calendar-link"

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
  const { allMarkdownRemark } = useAppointmentProfiles()
  const doctorTitles = {}
  const consultationGroups = {}
  const tcs = {}
  const emailTemplateTags = {}
  allMarkdownRemark.edges.forEach(({node}) => {
    doctorTitles[node.frontmatter.bpid] = node.frontmatter.title
    consultationGroups[node.frontmatter.bpid] = parseInt(node.frontmatter.consultationGroup)
    tcs[node.frontmatter.bpid] = node.frontmatter.terms
    emailTemplateTags[node.frontmatter.bpid] = node.frontmatter.emailConfirmation
  })

  const emailTemplates = {}
  const { allMarkdownRemark: emailTemps } = useEmailConfirmation()
  emailTemps.edges.forEach(({node}) => {
    emailTemplates[node.frontmatter.emailConfirmation] = node.html
  })

  const [conTypeIndex, setConTypeIndex] = useState(0)
  const userInfo = getUser()
  const [patientName] = useState(userInfo.patientName)
  const [appId] = useState(userInfo.appId)
  const { patientId, bpPatientId, drId, appTime, appDuration, email } = userInfo
  const [conTypeList] = useState(consultationTypes[consultationGroups[drId]])
  const [triggerMessage, setTriggerMessage] = useState(false)
  const [stage, setStage] = useState(0)
  const classes = useStyles()

  const message = useMemo(() => {
    return `You have booked ${patientName} with ${appId} for a ${conTypeList[conTypeIndex].label}. An email has been sent to you for confirmation. If you don't receive it in a few seconds, please check your Spam folder.`
  }, [patientName, appId, conTypeList, conTypeIndex])
  
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
      const bpAptId = await addAppointmentToBP(appTime.substring(0, 10), appTime.substring(11), conTypeList[conTypeIndex].code, drId, bpPatientId)
      // Someone has taken this slot one step ahead
      if (bpAptId === 0) {
        alert("Sorry, someone just booked an appointment at the same time before you. Please try another appointment time.")
        return 0
      }

      console.log("BP appointment ID", bpAptId)
      
      API.graphql(graphqlOperation(createAppointment, {
        input: {
          id: bpAptId.toString(),
          time: appTime,
          patientID: patientId,
          bookedBy: username,
          provider: doctorTitles[drId]
        }
      }))

      return bpAptId
    } catch (err) {
      console.log('Amplify createAppointment error...: ', err)
    }
  }

  const ConfirmDetails = () => {
    return (
      <>
        <Paper className={classes.root} elevation={3}>
        <Typography variant="h6" align="left" gutterBottom>
          {`Booking ${patientName} with ${appId} for a`}
        </Typography>
        <FormControl className={classes.radio} component="fieldset">
          <FormLabel component="legend">Consultation type</FormLabel>
          <RadioGroup 
            aria-label="consultation type" 
            name="consultation" 
            value={conTypeIndex} 
            onChange={event => setConTypeIndex(parseInt(event.target.value))}
          >
            {conTypeList.map((item, index) => 
              <FormControlLabel key={index} value={index} control={<Radio />} label={item.label} />)}
          </RadioGroup>
        </FormControl>
        </Paper>
        <div className={classes.flex} >
          <div className={classes.grow} />
          <Button variant='contained' onClick={() => setStage(1)} color="primary">
              confirm appointment details
          </Button>
          <div className={classes.grow} /> 
        </div>       
      </>
    )
  }

  const emailConfirmation = () => {
    const event = {
      title: `Appointment with ${appId}`,
      description: "Be there!",
      start: appTime,
      duration: [appDuration, "m"],
      location: "2 Hillview Rd, Eastwood NSW 2122"
    }

    const outlookLink = outlook(event)
    const googleLink = google(event)
    const office365Link = office365(event)
    
    const calendarLinks = `<p style="font-family: Helvetica, Arial, sans-serif; color: #4bb0c2; font-size: 16px; line-height: 20px; margin: 20px 0 0 0;">
    Click the links below to add the appointment to your calendar
    </p>
    <p style="font-family: Helvetica, Arial, sans-serif; color: #4bb0c2; font-size: 16px; line-height: 20px; margin: 10px 0 0 0;">
      <a style="color: #4bb0c2" href=${outlookLink}>Outlook.com</a>
      &nbsp;
      <a style="color: #4bb0c2" href=${office365Link}>Office 365</a>
      &nbsp;
      <a style="color: #4bb0c2" href=${googleLink}>Google</a>
    </p>`

    //send confirmation email
    fetch(process.env.GATSBY_DIGITF_EMAIL_SERVER, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: email,
        body: `<p>You have booked ${patientName} with ${appId} for a ${conTypeList[conTypeIndex].label}</p>.
        ${emailTemplates[emailTemplateTags[drId]]}
        ${calendarLinks} <br>
        This is an automatically generated email. Please DO NOT reply to this email.`,
        subject: 'Your booking with Aspire Medicare Centre is confirmed!',
        source: 'sootyyu@gmail.com'   
      })
    })
  }

  const book = async () => {
    const bpAptId = await addAppointment(getUser().username)

    if (bpAptId === 0) {
      navigate('/appointment-browser')
      return
    }

    setTriggerMessage(!triggerMessage)

    emailConfirmation()

    //clear patient and appId
    const updatedUserInfo = getUser()
    delete updatedUserInfo.patientName
    delete updatedUserInfo.drId
    delete updatedUserInfo.appId
    updatedUserInfo.checkingBookingStatus = true
    setUser(updatedUserInfo)
  }

  return (
    <Layout>
      <Content title='Booking appointment' titleImg={titleImg}>
        {stage === 0 && <ConfirmDetails/>}
        {stage === 1 && <TermsConditions terms={tcs[drId]} book={book}/>}
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
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
import { getUser, setUser } from '../components/app-user'
import { API, graphqlOperation } from 'aws-amplify'
import { createAppointment }  from '../graphql/mutations'

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

export default () => {
  const consultationType = {
    standard: "Standard consultation",
    video: "Video consultation",
    immunisation: "Immunisation",
    pap: "Pap smear"
  }

  const [value, setValue] = useState('standard')
  const [patient, setPatient] = useState(null)
  const [patientId, setPatientId] = useState(null)
  const [appId, setAppId] = useState(null)
  const [email, setEmail] = useState(null)
  const [triggerMessage, setTriggerMessage] = useState(false)
  const message = `You have booked ${patient} with ${appId} for ${consultationType[value]}. An email has been sent to you for confirmation. If you don't receive it in a few seconds, please check your Spam folder.`  
  const classes = useStyles()

  useEffect(() => {
    const userInfo = getUser()
    setPatient(userInfo.patientName)
    setPatientId(userInfo.patientId)
    setAppId(userInfo.appId)
    setEmail(userInfo.email)
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }  

  const addAppointment = async (username) => {
    try {
      await API.graphql(graphqlOperation(createAppointment, {
        input: {
          id: appId,
          time: appId.slice(-19),
          patientID: patientId,
          status: {
            category: 'booked'
          },
          bookedBy: username
        }
      }))
    } catch (err) {
      console.log(console.log('Amplify createAppointment error...: ', err))
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
        body: `You have booked ${patient} with ${appId} for a ${consultationType[value]}.`,
        subject: 'Your booking is confirmed!',
        source: 'sootyyu@gmail.com'   
      })
    })

    //clear patient and appId
    const updatedUserInfo = getUser()
    delete updatedUserInfo.patientName
    delete updatedUserInfo.patientId
    delete updatedUserInfo.appId
    updatedUserInfo.checkingBookingStatus = true
    setUser(updatedUserInfo)
  }

  return (
    <Layout>
      <Content title='Booking appointment'>
        <Paper className={classes.root} elevation={3}>
          <Typography variant="h6" align="left" gutterBottom>
            {`For ${patient} with ${appId} for a`}
          </Typography>
          <FormControl className={classes.radio} component="fieldset">
            <FormLabel component="legend">Consultation type</FormLabel>
            <RadioGroup aria-label="consultation type" name="consultation" value={value} onChange={handleChange}>
              <FormControlLabel value="standard" control={<Radio />} label={consultationType['standard']} />
              <FormControlLabel value="video" control={<Radio />} label={consultationType['video']} />
              <FormControlLabel value="immunisation" control={<Radio />} label={consultationType['immunisation']} />
              <FormControlLabel value="pap" control={<Radio />} label={consultationType['pap']} />
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
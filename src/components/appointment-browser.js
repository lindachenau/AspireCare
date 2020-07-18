import React, { useEffect, useLayoutEffect, useState } from 'react'
import { navigate } from 'gatsby'
import DrAppCard from './doctor-app-card'
import { MDBRow } from 'mdbreact'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import CircularProgress from '@material-ui/core/CircularProgress'
import moment from 'moment'
import axios from "axios"
import { doctors } from '../utils/booking-helper'
import Message from './message'
import { isLoggedIn, setUser, getUser } from './app-user'

const useStyles = makeStyles(theme => ({
  leftMiddle: {
    position: "fixed",
    top: "50vh",
    left: "0",
    zIndex: "999",
    opacity: 0.5
  },
  rightMiddle: {
    position: "fixed",
    top: "50vh",
    right: "0",
    zIndex: "999",
    opacity: 0.5  
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    padding: 40
  }  }))

const AppBrowser = () => {
  // const bp_server = process.env.GATSBY_BP_SERVER
  const bp_server = process.env.GATSBY_AWS_BP_SIMULATOR
  const classes = useStyles()
  const [appData, setAppData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [numDays, setNumDays] = useState(0)
  const [disablePrev, setDisablePrev] = useState(true)
  const [loading, setLoading] = useState(true)
  const [appId, setAppId ] = useState("")
  const [triggerMessage, setTriggerMessage] = useState(false)
  const message = `You need to login to book ${appId}. Press the Proceed button to Login or Create new account.`
  
  useLayoutEffect(() => {
    const fetchApps = async () => {
      const config = {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        url: bp_server,
        data: {
          startDate: moment(startDate).format("YYYY-MM-DD"),
          numDays: numDays
        }
      }

      const response = await axios(config)
      setAppData(response.data)
    }
    setLoading(true)
    fetchApps()
    setLoading(false)

  }, [startDate, numDays, bp_server])

  useLayoutEffect(() => {
    //narrow screen display 4 columns only. Need to check whether it works for iPad or not
    setImmediate(() => setNumDays(window.innerWidth >= 992 ? 5 : 4))
  }, [])

  useEffect(() => {
    setDisablePrev(moment(startDate).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD"))
  }, [startDate])

  const handlePrev = () => {
    setStartDate(new Date(startDate.getTime() - 86400000 * numDays))
  }

  const handleNext = () => {
    setStartDate(new Date(startDate.getTime() + 86400000 * numDays))
  }
  
  const openMessage = appId => {
    setAppId(appId)

    //Save the chosen slot
    const userInfo = {
      ...getUser(),
      appId: appId,
    }
    setUser(userInfo)
    
    if (isLoggedIn()) {
      //Selected patient already, go straight to booking. Otherwise send user to my-account.
      if (userInfo.patientId)
        navigate("/book")
      else 
        navigate('/my-account')
    } else {
      setTriggerMessage(!triggerMessage)
    }
  }

  return (
    <div>
      <IconButton
        onClick={handlePrev}
        aria-label="prev"
        className={classes.leftMiddle}
        color="primary"
        variant="contained"
        disabled={disablePrev}
      >
        <ArrowBackIosIcon />
      </IconButton> 
      <IconButton
        onClick={handleNext}
        aria-label="next"
        className={classes.rightMiddle}
        color="primary"
        variant="contained"
      >
        <ArrowForwardIosIcon />
      </IconButton>
      {loading && <div className={classes.progress}><CircularProgress color='primary' /></div>}             
      <MDBRow>
        {appData.map(doctor => (
          <DrAppCard 
            key={doctor.bpId}
            isLoading={loading}
            drId={doctor.bpId}
            title={doctors[doctor.bpId].title}
            avatar={doctors[doctor.bpId].avatar}
            job={doctors[doctor.bpId].job}
            appointments={doctor.appointments}
            setAppId={id => openMessage(id)}
          />
        ))}
      </MDBRow>
      <Message 
        triggerOpen={triggerMessage} 
        initOpen={false}
        message={message}
        action="Proceed"
        cb={() => navigate('/signin')}
      />
    </div>
  )
}

export default AppBrowser

import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import DrAppCard from './doctor-app-card'
import { MDBRow } from 'mdbreact'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import moment from 'moment'
import Message from './message'
import { isLoggedIn, setUser, getUser } from './auth/app-user'
import { useAppointmentProfiles } from '../utils/useAppointmentProfiles'
import { fetchApps } from '../utils/booking-api'

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
  const classes = useStyles()
  const { allMarkdownRemark, allFile } = useAppointmentProfiles()
  const [appData, setAppData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [numDays, setNumDays] = useState(0)
  const [disablePrev, setDisablePrev] = useState(true)
  const [loading, setLoading] = useState(true)
  const [appId, setAppId ] = useState("")
  const [triggerMessage, setTriggerMessage] = useState(false)
  const message = `You need to login to book ${appId}. Press the Proceed button to Login or Create new account.`
  const doctorProfiles = {}

  // Format the data for easy access
  const doctorProfilePhotos = {}
  const doctorList = []
  allFile.nodes.forEach(({id, childImageSharp}) => {
    doctorProfilePhotos[id] = {
      fluid: childImageSharp.fluid
    }
  })  
  allMarkdownRemark.edges.forEach(({node}) => {
    doctorProfiles[node.frontmatter.bpid] = {
      title: node.frontmatter.title,
      job: node.frontmatter.job,
      avatar: doctorProfilePhotos[node.frontmatter.image.id].fluid.src
    }
    doctorList.push(node.frontmatter.bpid)
  })

  useEffect(() => {
    /*
     * appData:
     * bpId
     * appointments {
     *   date
     *   slots
     * }
     */
    fetchApps(startDate, numDays, doctorList, setLoading, setAppData)
  // Do not include doctorList in the dependency list. It caused firing fetchApps indefinitely even when it is derived from another useEffect with [] dependency.
  }, [startDate, numDays])

  useEffect(() => {
    //narrow screen display 4 columns only. Need to check whether it works for iPad or not
    setNumDays(window.innerWidth >= 992 ? 5 : 4)
    console.log("Setting column width")
  }, [])

  useEffect(() => {
    setDisablePrev(moment(startDate).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD"))
  }, [startDate])

  const handlePrev = () => {
    const time = startDate.getTime() - 86400000 * numDays
    const curTime = new Date().getTime()
    if (time <= curTime)
      setStartDate(new Date(curTime))
    else
      setStartDate(new Date(time))
  }

  const handleNext = () => {
    // Get the last date of the current window
    let lastDate = appData[0].appointments.slice(-1)[0].date
    lastDate = new Date(lastDate)
    let date = new Date(lastDate.getTime() + 86400000)
    if (date.getDay() === 0) {
      date = new Date(date.getTime() + 86400000)
    }
    setStartDate(date)
  }
  
  const openMessage = appId => {
    setAppId(appId)

    //Save the chosen slot
    const userInfo = {
      ...getUser(),
      appId: appId
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
      <MDBRow>
        {appData.map(doctor => (
          <DrAppCard 
            key={doctor.bpId}
            isLoading={loading}
            drId={doctor.bpId}
            title={doctorProfiles[doctor.bpId].title}
            avatar={doctorProfiles[doctor.bpId].avatar}
            job={doctorProfiles[doctor.bpId].job}
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

import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
import Layout from '../components/layout'
import AccountNav from '../components/account-nav'
import AccountInfo from '../components/account-info'
import Patients from '../components/patients'
import Appointments from '../components/appointments'
import { setUser, getUser as getAppUser, isLoggedIn } from '../components/auth/app-user'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser }  from '../graphql/queries'
import UpdateUser from '../components/auth/update-user'
//Need Amplify configuration here in case user refresh my-account page. Without it, login session will not persist
import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

const MyAccount = () => {
  const [value, setValue] = useState(0)
  //0 : Display patients; 1: add or edit patient
  const [patStage, setPatStage] = useState(0)

  useEffect(() => {
    const getPatientsByUser = async () => {
      const userInfo = getAppUser()
      try {
        const user = await API.graphql(graphqlOperation(getUser, {id: userInfo.username}))
        const patients = user.data.getUser.patients.items

        if (userInfo.checkingBookingStatus) {
          setValue(1)
          delete userInfo.checkingBookingStatus
          setUser(userInfo)
        } else {
          //Only go to Info tab when first time login
          if (patients.length > 0)
            setValue(2)
          else
            setValue(0)
        }

      } catch (err) {
        console.log('Amplify getUser error...: ', err)
      }
    }

    if (!isLoggedIn()) 
      navigate("/signin")
    else 
      getPatientsByUser()

  }, [])

   return (
    <Layout>
      <MDBContainer maxWidth="md" style={{paddingTop: "5vh", paddingBottom: "10vh"}}>
        <MDBRow >
          <MDBCol md="12" className="dark-grey-text text-left">
            <AccountNav value={value} setValue={setValue} />
            {value === 0 && <AccountInfo />}
            {value === 1 && <Appointments />}
            {value === 2 && <Patients patStage={patStage} setPatStage={setPatStage}/>}
            {value === 3 && <UpdateUser />}
          </MDBCol>
        </MDBRow>
      </MDBContainer>      
    </Layout>
  )
}

export default MyAccount
import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import Content from '../components/content'
import AccountNav from '../components/account-nav'
import AccountInfo from '../components/account-info'
import Patients from '../components/patients'
import Appointments from '../components/appointments'
import { setUser, getUser } from '../components/app-user'
import { API, graphqlOperation } from 'aws-amplify'
import { listPatients }  from '../graphql/queries'
import UpdateUser from '../components/update-user'

export default () => {
  const [value, setValue] = useState(-1)
  //0 : Display patients; 1: add or edit patient
  const [patStage, setPatStage] = useState(0)

  useEffect(() => {
    const getPatientsByUser = async () => {
      const userInfo = getUser()
      try {
        const patients = await API.graphql(graphqlOperation(listPatients, {
          filter: {
            userID: {
              eq: userInfo.username
            }
          }
        }))

        if (userInfo.checkingBookingStatus) {
          setValue(1)
          delete userInfo.checkingBookingStatus
          setUser(userInfo)
        } else {
          //Only go to Info tab when first time login
          if (patients.data.listPatients.items.length > 0)
            setValue(2)
          else
            setValue(0)
        }

      } catch (err) {
        console.log(console.log('Amplify listPatients error...: ', err))
      }
    }

    getPatientsByUser()

  }, [])

   return (
    <Layout>
      <Content title='My account'>
        <AccountNav value={value} setValue={setValue} />
        {value === 0 && <AccountInfo />}
        {value === 1 && <Appointments />}
        {value === 2 && <Patients patStage={patStage} setPatStage={setPatStage}/>}
        {value === 3 && <UpdateUser />}
      </Content>    
    </Layout>
  )
}
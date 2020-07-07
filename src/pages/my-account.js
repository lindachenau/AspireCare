import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import Content from '../components/content'
import AccountNav from '../components/account-nav'
import AccountInfo from '../components/account-info'
import Patients from '../components/patients'

export default () => {
  const [value, setValue] = useState(0)
  //0 : Display patients; 1: add or edit patient
  const [patStage, setPatStage] = useState(0)

  useEffect(() => {
    setPatStage(0)
  }, [value])

  return (
    <Layout>
      <Content title='My account'>
        <AccountNav value={value} setValue={setValue} />
        {value === 0 && <AccountInfo />}
        {value === 2 && <Patients patStage={patStage} setPatStage={setPatStage}/>}

      </Content>    
    </Layout>
  )
}
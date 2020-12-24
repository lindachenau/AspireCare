import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import InfoIcon from '@material-ui/icons/Info'
import EventIcon from '@material-ui/icons/Event'
import PeopleIcon from '@material-ui/icons/People'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export default ({value, setValue}) => {

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
    >
      <BottomNavigationAction label="Info" icon={<InfoIcon />} />
      <BottomNavigationAction label="Appointments" icon={<EventIcon />} />
      <BottomNavigationAction label="Patients" icon={<PeopleIcon />} />
      <BottomNavigationAction label="Login update" icon={<AccountCircleIcon />} />
    </BottomNavigation>
  )
}
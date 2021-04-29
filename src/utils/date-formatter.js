import moment from 'moment'
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const getWeekDay = date => {
  const today = moment(new Date()).format("YYYY-MM-DD")
  const day = moment(date).format("YYYY-MM-DD") === today ? "Today" : days[date.getDay()]
  return day
}

export const getDateMonth = date => {
  return `${date.getDate()} ${months[date.getMonth()]}`
}

function limit(val, max) {
  if (val.length === 1 && val[0] > max[0]) {
    val = '0' + val
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '01'

    //this can happen when user paste number
  } else if (val > max) {
      val = max
    }
  }

  return val
}

export function monthExpiry(val) {
  const month = limit(val.substring(0, 2), '12')
  const year = val.length >= 2 ? val.substring(2, 6) : ''
  
  return month + '/' + year
}

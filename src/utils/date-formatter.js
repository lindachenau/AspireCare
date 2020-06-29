import moment from 'moment'
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const getWeekDay = date => {
  const today = moment(new Date()).format("YYYY-MM-DD")
  const day = moment(date).format("YYYY-MM-DD") == today ? "Today" : days[date.getDay()]
  return day
}

export const getDateMonth = date => {
  return `${date.getDate()} ${months[date.getMonth()]}`
}
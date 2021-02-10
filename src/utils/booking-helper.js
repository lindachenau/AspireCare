import kaiProfile from "../images/kai.jpg"
import dennisProfile from "../images/dennis.jpg"
import lindaProfile from "../images/linda.jpg"
import michProfile from "../images/mich.jpg"

export const doctors = {
  "0001": {
    title: "Dr Kai Yu",
    avatar: kaiProfile,
    job: "General Practitioner"
  },
  "0002": {
    title: "Dr Dennis Yu",
    avatar: dennisProfile,
    job: "General Practitioner"
  },
  "0003": {
    title: "Dr Linda Chen",
    avatar: lindaProfile,
    job: "General Practitioner"
  },
  "0004": {
    title: "Dr Michellenne Yu",
    avatar: michProfile,
    job: "General Practitioner"
  }
}

export const bookingMessage = id => {
  return `${doctors[id.slice(0, 4)].title} at ${id.slice(4)}`
}
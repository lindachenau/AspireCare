export const doctors = {
  "0001": {
    title: "Dr Kai Yu",
    avatar: require("../images/kai.jpg"),
    job: "General Practitioner"
  },
  "0002": {
    title: "Dr Dennis Yu",
    avatar: require("../images/dennis.jpg"),
    job: "General Practitioner"
  },
  "0003": {
    title: "Dr Linda Chen",
    avatar: require("../images/linda.jpg"),
    job: "General Practitioner"
  },
  "0004": {
    title: "Dr Michellenne Yu",
    avatar: require("../images/mich.jpg"),
    job: "General Practitioner"
  }
}

export const bookingMessage = id => {
  return `${doctors[id.slice(0, 4)].title} at ${id.slice(4)}`
}
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      patients {
        items {
          id
          title
          firstname
          lastname
          dob
          gender
          userID
        }
        nextToken
      }
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      patients {
        items {
          id
          title
          firstname
          lastname
          dob
          gender
          userID
        }
        nextToken
      }
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      patients {
        items {
          id
          title
          firstname
          lastname
          dob
          gender
          userID
        }
        nextToken
      }
    }
  }
`;
export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient {
    onCreatePatient {
      id
      title
      firstname
      lastname
      dob
      gender
      userID
      user {
        id
        patients {
          nextToken
        }
      }
      appointments {
        items {
          id
          booking_date
          patientID
        }
        nextToken
      }
    }
  }
`;
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient {
    onUpdatePatient {
      id
      title
      firstname
      lastname
      dob
      gender
      userID
      user {
        id
        patients {
          nextToken
        }
      }
      appointments {
        items {
          id
          booking_date
          patientID
        }
        nextToken
      }
    }
  }
`;
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient {
    onDeletePatient {
      id
      title
      firstname
      lastname
      dob
      gender
      userID
      user {
        id
        patients {
          nextToken
        }
      }
      appointments {
        items {
          id
          booking_date
          patientID
        }
        nextToken
      }
    }
  }
`;
export const onCreateAppointment = /* GraphQL */ `
  subscription OnCreateAppointment {
    onCreateAppointment {
      id
      booking_date
      patientID
      patient {
        id
        title
        firstname
        lastname
        dob
        gender
        userID
        user {
          id
        }
        appointments {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateAppointment = /* GraphQL */ `
  subscription OnUpdateAppointment {
    onUpdateAppointment {
      id
      booking_date
      patientID
      patient {
        id
        title
        firstname
        lastname
        dob
        gender
        userID
        user {
          id
        }
        appointments {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteAppointment = /* GraphQL */ `
  subscription OnDeleteAppointment {
    onDeleteAppointment {
      id
      booking_date
      patientID
      patient {
        id
        title
        firstname
        lastname
        dob
        gender
        userID
        user {
          id
        }
        appointments {
          nextToken
        }
      }
    }
  }
`;

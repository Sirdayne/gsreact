import React, { Component } from 'react'
import http from '../../services/http'

class ProgressNotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patients: [],
      doctors: [],
      progressNotes: []
    }
  }
  fetchDoctors () {
    const endpoint = 'doctors/'
    http.get(endpoint).then(res => {
      if (res && res.data && res.data.length > 0) {
        this.setState({ doctors: res.data })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  fetchPatients () {
    const endpoint = 'patients/'
    http.get(endpoint).then(res => {
      if (res && res.data && res.data.length > 0) {
        this.setState({ patients: res.data })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  componentDidMount() {
    this.fetchDoctors()
    this.fetchPatients()
  }
  render() {
    return (
      <div>
        <p>Doctors:</p>
        <ul>
          {this.state.doctors && this.state.doctors.length
            ? this.state.doctors.map((doctor, index) => {
              return <div key={index}>{doctor.firstName} {doctor.lastName}</div>
            })
            : "No doctors"}
        </ul>
        <p>Patients:</p>
        <ul>
          {this.state.patients && this.state.patients.length
            ? this.state.patients.map((patient, index) => {
              return <div key={index}>{patient.firstName} {patient.lastName}</div>
            })
            : "No patients"}
        </ul>
      </div>
    )
  }
}

export default ProgressNotes;

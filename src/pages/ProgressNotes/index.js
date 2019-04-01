import React, { Component } from 'react'
import http from '../../services/http'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class ProgressNotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patients: [],
      doctors: [],
      progressNotes: [],
      patientId: null
    }
  }
  componentDidMount() {
    this.fetchDoctors()
    this.fetchPatients()
  }
  handleChangeSelect = event => {
    this.setState({ patientId: event.target.value })
    if (this.state.patientId) {
      this.fetchProgressNotes(this.state.patientId)
    }
  }
  fetchDoctors() {
    const endpoint = 'doctors/'
    http.get(endpoint).then(res => {
      if (res && res.data && res.data.length > 0) {
        this.setState({ doctors: res.data })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  fetchPatients() {
    const endpoint = 'patients/'
    http.get(endpoint).then(res => {
      if (res && res.data && res.data.length > 0) {
        this.setState({ patientId: res.data[0].id })
        this.setState({ patients: res.data })
        this.fetchProgressNotes(this.state.patientId)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  fetchProgressNotes(patientId) {
    const endpoint = `patients/${patientId}/progressNotes`
    http.get(endpoint).then(res => {
      if (res && res.data && res.data.length > 0) {
        this.setState({ progressNotes: res.data })
        console.log(this.state.progressNotes)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    return (
      <div className="app-container" style={{ marginTop: '20px', maxWidth: '700px' }}>
        <p>Seleted Patient:</p>
        { this.state.patients.length > 0 ?
          <Select
            value={this.state.patientId}
            onChange={this.handleChangeSelect}
          >
            {
              this.state.patients.map((patient, index) => {
                return <MenuItem key={index} value={patient.id}>{patient.firstName} {patient.lastName}</MenuItem>
              })
            }
          </Select> : "No patients"
        }
        { this.state.progressNotes.length > 0 ?
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.progressNotes.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.noteView.note}</TableCell>
                  <TableCell>{row.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> : 'No progress-notes'
        }
      </div>
    )
  }
}

export default ProgressNotes;

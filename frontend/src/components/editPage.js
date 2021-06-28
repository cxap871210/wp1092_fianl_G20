import React, { useState } from 'react'
import BlankCalendar from './blankCalendar'
import moment from 'moment'

export default function EditPage ({ curEvent, handleBack, handleSubmit, availableTime, setAvailableTime, setTempAvailableTime }) {
  const startDate = new Date(`${curEvent.start_date}T00:00:00`)
  const endDate = new Date(`${curEvent.end_date}T00:00:00`)
  const duration = moment(endDate).diff(moment(startDate), 'days') + 1
  const minTime = Number(curEvent.start_time.split(":")[0])
  const maxTime = Number(curEvent.end_time.split(":")[0])

  const ownToSchedule = (availableTime) => {
    //console.log(availableTime)
    let result = []
    availableTime.forEach((day, i) => {
      day.forEach((period, j) => {
        if (period) {
          let newItem = moment(startDate).add(i, 'days').toDate()
          newItem = moment(newItem).add(minTime, 'h').toDate()
          newItem = moment(newItem).add(j * 30, 'm').toDate()
          //console.log(newItem)
          result.push(newItem)
        }
      });

    });
    //console.log(result) availabletime 出去再update
    return result
  }

  const [schedule, setSchedule] = useState(ownToSchedule(availableTime))

  const handleClear = () => {
    setSchedule([])
  }

  return (
    <div className='editPage'>
      <div className='editPage-top'>
        <span
        className='back-button text-button'
        onClick={handleBack}>
          <i class="fas fa-backward"></i> Back to Main Page
        </span>
        <div className='editPage-title'>
          <h3>Select your available times for "{curEvent.name}"</h3>
        </div>
      </div>
      <div className='calendar'>
        <BlankCalendar
        curEvent={curEvent}
        schedule={schedule}
        setSchedule={setSchedule}
        setTempAvailableTime={setTempAvailableTime}/>
      </div>
      <div className='editPage-bottom'>
        <span
        className='clear-button text-button'
        onClick={handleClear}>
          Clear
        </span>
        <span
        className='submit-button text-button'
        onClick={handleSubmit}>
          Submit
        </span>
      </div>
    </div>
  )
  //return (<BlankCalendar />)

}

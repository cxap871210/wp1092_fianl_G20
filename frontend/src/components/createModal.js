import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react'

export default function CreateModal ({ closeCreateModal, handleCreate }) {
  const handleChange = (func) => (event) => {
    func(event.target.value)
  }
  const [activityName, setActivityName] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  //console.log(startTime)
  return (
    <div className='modal' id='createModal'>
      <span
      className='close-button'
      onClick={closeCreateModal}>
        &times;
      </span>
     <div className='modal-content'>
       <div className='modal-title'>
        Create an Event
       </div>
       <div className='createModal-input-wrapper'>
        <div className='createModal-name-input'>
          <span className='createModal-input'>
            <label for='eventName'>Event Name</label>
            <input
              type="text"
              id="eventName"
              onChange={handleChange(setActivityName)} />
          </span>
        </div>
        <div className='createModal-time-input'>
          <span className='createModal-input'>
            From
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              dateFormat="yyyy M/d"
              placeholderText='Start Date' />
          </span>
          <span className='createModal-input'>
            To
            {
              startDate === null?
              <DatePicker
                placeholderText='End Date'
                disabled /> :
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                dateFormat="yyyy M/d"
                placeholderText='End Date' />
            }
          </span>
        </div>
        <div className='createModal-time-input'>
          <span className='createModal-input'>
            Not earlier than
            <DatePicker
              placeholderText="Start Time"
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"

            />
          </span>
          <span className='createModal-input'>
            Not later than
            {startTime === null?
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText='End Time'
                disabled
              />:
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText='End Time'
              />}
          </span>
        </div>
       </div>
       <span
        className='create-button text-button'
        onClick={() => handleCreate(activityName, startDate, startTime, endDate, endTime)}>
        Create
       </span>
     </div>
    </div>
  )
}

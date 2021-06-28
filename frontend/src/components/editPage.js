//import React, { useState } from 'react'
import BlankCalendar from './blankCalendar'

export default function EditPage ({ curEvent, handleBack, handleClear, handleSubmit, availableTime, setAvailableTime, setTempAvailableTime }) {
  return (
    <div className='editPage'>
      <div className='editPage-top'>
        <span
        className='back-button icon-button'
        onClick={handleBack}>
          <i class="fas fa-undo-alt"></i>
        </span>
        <div className='editPage-title'>
          <h3>Select your available times for "{curEvent.name}"</h3>
        </div>
      </div>
      <div className='calendar'>
        <BlankCalendar
        curEvent={curEvent}
        availableTime={availableTime}
        setAvailableTime={setAvailableTime}
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

import React, { useState } from 'react'

export default function JoinModal ({ closeJoinModal, handleJoin }) {
  const handleChange = (func) => (event) => {
    func(event.target.value)
  }
  const [attendCode, setAttendCode] = useState('')
  return (
    <div className='modal' id='joinModal'>
      <span
      className='close-button'
      onClick={closeJoinModal}>
        &times;
      </span>
     <div className='modal-content'>
       <div className='modal-title'>
        Join an Event
       </div>
       <div className='joinModal-input-wrapper'>
         <span className='joinModal-input'>
           <label for='eventCode'>Event Code:</label>
           <input
             type="text"
             id="eventCode"
             onChange={handleChange(setAttendCode)}/>
         </span>
       </div>
       <div className='joinModal-button-wrapper'>
         <span
         className='join-button text-button'
         onClick={() => handleJoin(attendCode)}>
           Join
         </span>
       </div>
     </div>
    </div>
  )
}

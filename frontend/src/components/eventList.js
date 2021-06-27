import React, { useState } from 'react'
import Event from './event'


export default function EventList ({ eventList, openEditPage, openViewPage, openShareModal, handleLeave }) {
return (
    <div className='eventList-wrapper'>
      <div className='eventList-title'>
        <h2>My Events</h2>
      </div>
      <div className='eventList-list'>
        {eventList.map(event => (
          <Event
          event={event}
          openEditPage={openEditPage}
          openViewPage={openViewPage}
          openShareModal={openShareModal}
          handleLeave={handleLeave}/>
        ))}
      </div>
    </div>
  )
}
/*
*/

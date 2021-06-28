import React, { useState } from 'react'
import Event from './event'


export default function EventList ({ username, eventList, openEditPage, openViewPage, openShareModal, handleDelete, handleQuit }) {
return (
    <div className='eventList-wrapper'>
      <div className='eventList-title'>
        <h2>My Events</h2>
      </div>
      <div className='eventList-list'>
        {eventList.length === 0?
          <div className='blank-text'>You don't have any events for now. You can create or join an event.</div>:
          eventList.map(event => (
          <Event
          username={username}
          event={event}
          openEditPage={openEditPage}
          openViewPage={openViewPage}
          openShareModal={openShareModal}
          handleDelete={handleDelete}
          handleQuit={handleQuit}/>
        ))}
      </div>
    </div>
  )
}
/*
*/

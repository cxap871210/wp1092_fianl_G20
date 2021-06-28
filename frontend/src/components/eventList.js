import React, { useState } from 'react'
import Event from './event'


export default function EventList ({ username, eventList, openEditPage, openViewPage, openShareModal, handleDelete, handleQuit }) {
return (
    <div className='eventList-wrapper'>
      <div className='eventList-title'>
        <h2>My Events</h2>
      </div>
      <div className='eventList-list'>
        {eventList.map(event => (
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

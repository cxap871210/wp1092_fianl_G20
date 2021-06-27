import React, { useState } from 'react'
//import axios from 'axios'

import StartPage from './startPage'
import MainPage from './mainPage'

function MeetApp() {
  const [start, setStart] = useState(true) //start
  const [user, setUser] = useState({
    username: '',
    eventList: [
      {
        name: '',
        creator: '',
        code: '',
        end_date: "2021-07-23",
        end_time: "17:30",
        start_date: "2021-07-02",
        start_time: "09:00",
        users: []
      },
    ]
  })

  return (
    <div className='meetApp'>
      {(start)?
        (<StartPage setStart={setStart} setUser={setUser}/>) :
        (<MainPage setStart={setStart} user={user} setUser={setUser}/>)
      }
    </div>
  )
}

export default MeetApp;

import AvailableCalendar from './availableCalendar'
import NameList from './nameList'
import React, { useState, useEffect } from 'react'

export default function ViewPage ({ viewEvent, handleBack, allAvailableTime }) {
  const [list, setList] = useState(null)
  const [showList, setShowList] = useState(false)
  //const [u_users, setU_users] = useState([])
  const name_list = ['a', 'b', 'c', 'd']
  const getUserList = (col_id, row_id) => {
    //console.log(allAvailableTime[col_id][row_id])
    const a_list = allAvailableTime[col_id][row_id]
    let a = []
    let u = []
    if (a_list !== undefined) {
      name_list.forEach((name, i) => {
        if (a_list.includes(name)) {
          a.push(name)
        }
        else {
          u.push(name)
        }
      })
    }

    setList({
      a: a.sort(),
      u: u.sort()
    })
    console.log(a)
    console.log(u)
  }
  useEffect(() => {
    if (list !== null) {
      setShowList(true)
    }
  }, list)
  return (
    <div className='viewPage'>
      <div className='viewPage-wrapper'>
        <div className='editPage-top'>
          <span
          className='back-button icon-button'
          onClick={handleBack}>
            <i class="fas fa-undo-alt"></i>
          </span>
          <div className='editPage-title'>
            Available time for all attendents of "{viewEvent.name}"
          </div>
        </div>
        <div className='viewPage-calendar'>
          <AvailableCalendar
          viewEvent={viewEvent}
          allAvailableTime={allAvailableTime}
          getUserList={getUserList}/>
        </div>
      </div>
      <div className='viewPage-box'>
        <h3>Result</h3>
        <div id='viewPage-result'>
        {showList? <NameList list={list} /> : null}
        </div>
        <h3>Filter</h3>
        <div className='viewPage-filter'>

        </div>
      </div>
    </div>
  )
}

import AvailableCalendar from './availableCalendar'
import NameList from './nameList'
import React, { useState, useEffect } from 'react'

export default function ViewPage ({ username, viewEvent, handleBack, handleFilter, handleNotify, result, filterDisplay }) {
  const [list, setList] = useState(null)
  const [showList, setShowList] = useState(false)
  const [curBlock, setCurBlock] = useState('')

  const showNoteButton = username === viewEvent.creator
  const memberCnt = result.nameList.length
  const nameListBool_arr = []
  const memberCnt_arr = [] //最少出席人數
  for (let i = memberCnt; i > 0; i--) {
    memberCnt_arr.push(i)
    nameListBool_arr.push(true)
  }

  const [initCheckBox, setInitCheckBox] = useState(nameListBool_arr)

  const hourCnt = Number(viewEvent.end_time.split(":")[0]) - Number(viewEvent.start_time.split(":")[0])
  const hourCnt_arr = []
  for (let i = 0; i < hourCnt; i++) {
    hourCnt_arr.push(i + 0.5)
    hourCnt_arr.push(i + 1)
  }

  const getUserList = (col_id, row_id) => {
    //console.log(allAvailableTime[col_id][row_id])
    const a_list = result.availableList[col_id][row_id]
    let a = []
    let u = []
    if (a_list !== undefined) {
      result.nameList.forEach((name, i) => {
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
      if (list.a === [] & list.u === []) {
        setShowList(false)
      } else {
        setShowList(true)
      }
    }
  }, list)

  return (
    <div className='viewPage'>
      <div className='viewPage-wrapper'>
        <div className='editPage-top'>
          <span
          className='back-button text-button'
          onClick={handleBack}>
            <i class="fas fa-backward"></i> Back to Main Page
          </span>
          <div className='editPage-title'>
            <h3>Available time for all attendents of "{viewEvent.name}"</h3>
          </div>
        </div>
        <div className='viewPage-calendar'>
          <AvailableCalendar
          viewEvent={viewEvent}
          allAvailableTime={result.availableList}
          getUserList={getUserList}
          setCurBlock={setCurBlock}/>
        </div>
      </div>
      <div className='viewPage-box'>
        {curBlock === ''? <h3>Result</h3> : <h3>Result for {curBlock}</h3>}
        <div className='viewPage-result'>
        {showList? <NameList list={list} /> : <div className='name-list'>Click on a time block to view the result.</div>}
        </div>
        <h3>Filter</h3>
        <div className='viewPage-filter-conditions'>
          <div className='filter-text-wrapper'>
            <label for="minMemCnt">Minimum number of attendents: </label>
            <select name="minMemCnt" id="minMemCnt">
              {memberCnt_arr.map((num) => (
                <option value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className='filter-text-wrapper'>
            <label for="minHourCnt">Minimum duration of event: </label>
            <select name="minHourCnt" id="minHourCnt">
              {hourCnt_arr.map((num) => (
                <option value={num}>{num}</option>
              ))}
            </select><span> hours</span>
          </div>
          <div className='filter-text-wrapper'>
            Attendents who must show up:
            {result.nameList.map((name, i) => (
              <span className='mustShow-names'>
                <input
                className='names-checkbox'
                type="checkbox"
                id={name}
                name={name}
                value={name}
                checked={initCheckBox[i]}
                onClick={() => {initCheckBox[i] = !initCheckBox[i]}}/>
                <label for={name}>{name}</label>
              </span>
            ))}
          </div>
        </div>
        <span
        className='filter-button text-button'
        onClick={handleFilter}>
          Filter
        </span>
        <div className='viewPage-filter'>
          <div className='filter-result'>
          {
            filterDisplay.map((line) => (
              <div>{line}</div>
            ))
          }
          </div>
          {showNoteButton?
            <span
            className='notify-button text-button'
            onClick={handleNotify}>
              Notify all Attendents
            </span> :
            null
          }
        </div>
      </div>
    </div>
  )
}

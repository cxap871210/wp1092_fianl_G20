import React, { useState, useEffect } from 'react'
import ScheduleSelector from 'react-schedule-selector'
import moment from 'moment'

export default function BlankCalendar ({ curEvent, schedule, setSchedule, setTempAvailableTime }) {
  const startDate = new Date(`${curEvent.start_date}T00:00:00`)
  const endDate = new Date(`${curEvent.end_date}T00:00:00`)
  const duration = moment(endDate).diff(moment(startDate), 'days') + 1
  const minTime = Number(curEvent.start_time.split(":")[0])
  const maxTime = Number(curEvent.end_time.split(":")[0])

  /*const ownToSchedule = (availableTime) => {
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
  }*/

  const timeToIndex = (time) => {
    const curPeriod = moment(time)
    const col_id = curPeriod.diff(moment(startDate), 'days')
    //console.log(col_id)
    let curDate = moment(startDate).add(col_id, 'days').toDate()
    //console.log(curDate)
    curDate = moment(curDate).add(minTime, 'h').toDate()
    //console.log(curDate)
    const minDiff = curPeriod.diff(moment(curDate), 'm')
    //console.log(minDiff)
    const row_id = minDiff / 30
    //console.log(row_id)
    return {col_id, row_id}
  }

  const scheduleToOwn = (schedule) => {
    const blockCnt = (maxTime - minTime) * 2
    let arr = []
    for (let i = 0; i < duration; i++) {
      arr[i] = []
      for (let j = 0; j < blockCnt; j++) {
        arr[i][j] = 0
      }
    }
    schedule.forEach((period, i) => {
      const {col_id, row_id} = timeToIndex(period)
      arr[col_id][row_id] = 1
    })
    return arr
  }

  const handleChange = newSchedule => {
    setSchedule(newSchedule)
    setTempAvailableTime(scheduleToOwn(newSchedule))
  }

  const renderCustomDateCell = (time, selected, innerRef) => {
    return (
      selected?
      <div className='calendar-cell' style={duration > 15? {width: '90px'} : null} id='cell-selected' ref={innerRef}>
      </div> :
      <div className='calendar-cell' style={duration > 15? {width: '90px'} : null} id={time.getMinutes() === 0? 'cell-1': 'cell-2'} ref={innerRef}>
      </div>
    )
  }

  const renderCustomDateLabel = (time) => {
    const day = moment(time).format('ddd')
    const dateForm = time.getMonth() === 1 & time.getDate() === 1 ? moment(time).format('YYYY M/D') : moment(time).format('M/D')
    return (
      <div className='calendar-label' id={time.getDay() === 0 | time.getDay() === 6? 'weekend' : 'weekday'}>
        <div>{dateForm}</div>
        <div>{day}</div>
      </div>
    )
  }

  const renderCustomTimeLabel = (time) => {
    const timeForm = moment(time).format('HH:mm')
    return (
      <div className='calendar-label' id='time'>
        {timeForm}
      </div>
    )
  }

  return (
    <ScheduleSelector
      selection={schedule}
      startDate={startDate}
      numDays={duration}
      minTime={minTime}
      maxTime={maxTime}
      hourlyChunks={2}
      renderDateLabel={renderCustomDateLabel}
      renderTimeLabel={renderCustomTimeLabel}
      renderDateCell={renderCustomDateCell}
      onChange={handleChange}
    />
  )
}

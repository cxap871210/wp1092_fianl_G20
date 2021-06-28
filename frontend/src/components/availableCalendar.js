import React, { useState } from 'react'
import moment from 'moment'
import ScheduleSelector from 'react-schedule-selector'

export default function AvailableCalendar ({ viewEvent, allAvailableTime, getUserList, setCurBlock }) {
  const color1 = [22, 160, 166]
  const color2 = [196, 245, 247]
  let max = 0
  allAvailableTime.forEach((day, i) => {
    day.forEach((period, j) => {
      if (period.length > max) {
        max = period.length
      }
      //console.log(period)
    });
  });

  const startDate = new Date(`${viewEvent.start_date}T00:00:00`)
  const endDate = new Date(`${viewEvent.end_date}T00:00:00`)
  const duration = moment(endDate).diff(moment(startDate), 'days') + 1
  const minTime = Number(viewEvent.start_time.split(":")[0])
  const maxTime = Number(viewEvent.end_time.split(":")[0])

  const getColor = (weight) => {
    var w1 = weight;
    var w2 = 1 - w1;
    var result = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    let color = 'rgb('+result.join()+')'
    return color;
  }

  const timeToIndex = (time) => {
    const curPeriod = moment(time)
    const col_id = curPeriod.diff(moment(startDate), 'days')
    let curDate = moment(startDate).add(col_id, 'days').toDate()
    curDate = moment(curDate).add(minTime, 'h').toDate()
    const minDiff = curPeriod.diff(curDate, 'm')
    const row_id = minDiff / 30
    return {col_id, row_id}
  }
  const [schedule, setSchedule] = useState([])

  const handleChange = newSchedule => {
    //console.log(newSchedule)
    if (newSchedule.length !== 0) {
      console.log(newSchedule)
      const {col_id, row_id} = timeToIndex(newSchedule[0])
      const time1 = moment(newSchedule[0]).format('YYYY-MM-DD HH:mm')
      const time2 = moment(newSchedule[0]).add(30, 'm').format('HH:mm')
      setCurBlock(`${time1} ~ ${time2}`)
      getUserList(col_id, row_id)
    }
    //setSchedule(newSchedule)
  }

  const renderCustomDateCell = (time, selected, innerRef) => {
    let {col_id, row_id} = timeToIndex(time)
    //console.log(col_id, row_id)
    const cnt = allAvailableTime[col_id][row_id].length
    //console.log(max)
    if (cnt !== 0) {
      const color = getColor(cnt / max)
      //console.log(color)
      return (
        <div className='calendar-cell' style={duration > 15? {width: '90px', background: color} : {background: color}} id={time.getMinutes() === 0? 'cell-1': 'cell-2'} ref={innerRef}>
        </div>
      )
    }
    else {
      return (
        <div className='calendar-cell' style={duration > 15? {width: '90px'} : null} id={time.getMinutes() === 0? 'cell-1': 'cell-2'} ref={innerRef}>
        </div>
      )
    }

  }

  const renderCustomDateLabel = (time) => {
    const day = moment(time).format('ddd')
    const dateForm = time.getMonth() === 1 & time.getDate() === 1 ? moment(time).format('YYYY MM/DD') : moment(time).format('MM/DD')
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

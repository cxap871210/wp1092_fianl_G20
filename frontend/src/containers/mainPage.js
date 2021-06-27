import React, { useState, useEffect } from 'react'
import axios from '../api'

import Logo from '../components/logo';
import EventList from '../components/eventList';
import InfoBar from '../components/infoBar';
import EditPage from '../components/editPage';
import ViewPage from '../components/viewPage';
import CreateModal from '../components/createModal';
import JoinModal from '../components/joinModal';
import ShareModal from '../components/shareModal';
import moment from 'moment';


function MainPage({ setStart, user, setUser }) {
  const [page, setPage] = useState('main') //main, edit, view
  const [curEvent, setCurEvent] = useState(null)
  const [shareEvent, setShareEvent] = useState(null)
  const [viewEvent, setViewEvent] = useState(null)
  const [availableTime, setAvailableTime] = useState([])
  const [tempAvailableTime, setTempAvailableTime] = useState([])
  const [allAvailableTime, setAllAvailableTime] = useState([[['a'], ['a', 'b'], ['a', 'b', 'c', 'd'], []], [[], [], [], []]])

  const handleSignOut = () => {
    console.log('signout')
    setUser(null)
    setStart(true)
  }
  const handleBack = () => {
    setPage('main')
  }

  const handleGetActivity = async () => {
    const name = user.username
    const {
      data: { status, activities },
    } = await axios.get('/api/get-activity', { params: { name } });

    //console.log(status, activities);
    setUser((prevState) => ({
      ...prevState,
      eventList: activities
    }))
  };

  useEffect(() => {
    handleGetActivity()
  })

  const handleCreate = async (activityName, startDate, startTime, endDate, endTime) => {
    //create new event
    startDate = moment(startDate).format('YYYY-MM-DD')
    endDate = moment(endDate).format('YYYY-MM-DD')
    startTime = moment(startTime).format('HH:mm')
    endTime = moment(endTime).format('HH:mm')
    const name = user.username
    if (!activityName || !startDate || !startTime || !endDate || !endTime) {
      alert("All fields must be filled to create an event.")
    }
    else {
      const {
        data: { status },
      } = await axios.post('/api/create-activity', {
        activityName,
        name,
        startDate,
        startTime,
        endDate,
        endTime
      });

      console.log(status);
      if (status) {
        if (window.confirm(`You are creating an event "${activityName}", starting on ${startDate}, ending on ${endDate}, from ${startTime} to ${endTime} each day. `))
        closeCreateModal()
        console.log('created!')
        //handleGetActivity()
      }
      else {
        alert("Something went wrong!")
      }
    }

  }
  const handleJoin = async (attendCode) => {
    const name = user.username
    if (!attendCode) {
      alert("Please enter event code to join.")
    } else {
      const {
        data: { status },
      } = await axios.post('/api/attend', {
        name,
        attendCode,
      });

      console.log(status);
      if (status) {
        window.confirm(`Successfully joined event with code ${attendCode}`)
        //join event
        closeJoinModal()
        console.log('joined')
      }
      else {
        alert("Something went wrong, please try again.")
      }
    }
  }
  const handleCopy = () => {
    var copyTextarea = document.querySelector('.event-code');
    console.log('copied!')
    /*copyTextarea.focus();
    copyTextarea.select();
    try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }*/
  }
  const handleLeave = () => {
    //leave event
    console.log('left')
  }
  const handleClear = () => {
    console.log('clear')
    setAvailableTime([])
  }
  const handleSubmit = async () => {
    //submit new user timeout
    console.log(tempAvailableTime)
    //setAvailableTime(tempAvailableTime)
    const time = tempAvailableTime
    const name = user.username
    const attendCode = curEvent.code
    const {
      data: { status },
    } = await axios.post('/api/send-time', {
      name,
      attendCode,
      time,
    });
    if (status) {
      //setPage('view')
      console.log('submit')
    } else {
      alert("Something went wrong, please try again.")
    }

  }

  const getUserTime =  async (code) => {
    ///
    const name = user.username
    const attendCode = code
    const {
      data: { status, result, time_list },
    } = await axios.get('/api/edit-time', { params: { name, attendCode } });

    //console.log(status, result, time_list)
    //console.log('get user time')
    setAvailableTime(result)
  }

  const getAllTime = async (code) => {
    const attendCode = code
    /*const {
      data: { available_list, name_list, time_list },
    } = await axios.get('/api/result', { params: { attendCode } });
*/
    try {
      await axios.get('/api/result', { params: { attendCode } })
      .then(res => {
        console.log(res.data.available_list)
      })
    }
    catch (error) {
      if (error.response) {
        console.log("Request made and server responded")
      }
      else if (error.request) {
        console.log("The request was made but no response was received")
      }
    }
    //console.log('get all available time')
    //console.log(available_list, name_list, time_list)
  }

  useEffect(() => {
    if (curEvent !== null) {
      getUserTime(curEvent.code)
      console.log(availableTime)
    }
  }, [curEvent])

  useEffect(() => {
    if (availableTime !== [] & curEvent !== null) {
      setPage('edit')
      //test
      //setAllAvailableTime(availableTime)
    }
  }, [availableTime])

  const openEditPage = (event) => {
    setCurEvent(event)
  }

  useEffect(() => {
    if (viewEvent !== null) {
      //getAllTime(viewEvent.code)
      setPage('view')
    }
  }, [viewEvent])

  /*useEffect(() => {
    if (allAvailableTime !== [] & viewEvent !== null) {
      //setPage('view')
    }
  }, [allAvailableTime])*/

  const openViewPage = (event) => {
    setViewEvent(event)
    //console.log(event.code)
    //getAllTime(event.code)
    //setPage('view')
  }
  const openCreateModal = () => {
    closeJoinModal()
    closeShareModal()
    const modal = document.querySelector("#createModal")
    modal.style.display = 'block'
  }
  const closeCreateModal = () => {
    const modal = document.querySelector("#createModal")
    modal.style.display = 'none'
  }
  const openJoinModal = () => {
    closeShareModal()
    closeCreateModal()
    const modal = document.querySelector("#joinModal")
    modal.style.display = 'block'
  }
  const closeJoinModal = () => {
    const modal = document.querySelector("#joinModal")
    modal.style.display = 'none'
  }
  const openShareModal = (event) => {
    closeJoinModal()
    closeCreateModal()
    const modal = document.querySelector("#shareModal")
    modal.style.display = 'block'
    setShareEvent(event)
  }
  const closeShareModal = () => {
    const modal = document.querySelector("#shareModal")
    modal.style.display = 'none'
  }

  return (
      <div className='mainPage'>
        {
          page === 'main' ?
          <>
            <div className='mainPage-wrapper'>
              <EventList
              eventList={user.eventList}
              openEditPage={openEditPage}
              openViewPage={openViewPage}
              openShareModal={openShareModal}
              handleLeave={handleLeave}/>
              <InfoBar
              username={user.username}
              handleSignOut={handleSignOut}
              openCreateModal={openCreateModal}
              openJoinModal={openJoinModal}/>
              <CreateModal
              closeCreateModal={closeCreateModal}
              handleCreate={handleCreate}/>
              <JoinModal
              closeJoinModal={closeJoinModal}
              handleJoin={handleJoin}/>
              <ShareModal
              shareEvent={shareEvent}
              closeShareModal={closeShareModal}
              handleCopy={handleCopy}/>
            </div>
          </> :
          page === 'edit' ?
          <EditPage
          curEvent={curEvent}
          handleBack={handleBack}
          handleClear={handleClear}
          handleSubmit={handleSubmit}
          availableTime={availableTime}
          setAvailableTime={setAvailableTime}
          setTempAvailableTime={setTempAvailableTime}/> :
          page === 'view' ?
          <ViewPage
          viewEvent={viewEvent}
          handleBack={handleBack}
          allAvailableTime={allAvailableTime}/> :
          null
        }
      </div>
    )
}

export default MainPage;

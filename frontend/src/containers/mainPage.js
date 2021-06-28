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
  const [result, setResult] = useState(null)

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
      openViewPage(curEvent)
    } else {
      alert("Something went wrong, please try again.")
    }
  }

  const handleFilter = async () => {
    var e = document.getElementById("minMemCnt")
    var minMemCnt = e.value
    var f = document.getElementById("minHourCnt")
    var minHourCnt = f.value
    console.log(minMemCnt, minHourCnt)
    var checkedNames = [];
    var g = document.getElementsByClassName('names-checkbox');
    for (let i = 0; g[i]; i++) {
      if (g[i].checked) {
        checkedNames.push(g[i].value)
      }
    }
    console.log(checkedNames)

    ///
  }

  const handleNotify = async () => {
    const attendCode = viewEvent.code
    const {
      data: { mails, actName },
    } = await axios.get('/api/get-mails', { params: { attendCode } });

    // console.log(mails);

    let content = "The arrangement of activity [ " + actName + " ] is done! <br><br>Available times are as below:<br><br>";
    for(let i = 0 ; i < result.result1.length ; i++){
      content = content + result.result1[i] + "<br>" ;
    }

    console.log(content) ;
    let confirmMsg = `Sending emails to ${mails.join()}, with content: ${content}.`
    if (window.confirm(confirmMsg)) {
      for(let i = 0 ; i < mails.length ; i ++){
        if(i !== mails.length -1){
          window.Email.send({
            Host : "smtp.gmail.com",
            Username : "cxapwebfinal@gmail.com",
            Password : "password1092",
            To : mails[i],
            From : "Web1092FinalG24<cxapwebfinal@gmail.com>",
            Subject : "偽 when2meet 活動成立通知",
            Body : content
          })
        }
        else{
          window.Email.send({
            Host : "smtp.gmail.com",
            Username : "cxapwebfinal@gmail.com",
            Password : "password1092",
            To : mails[i],
            From : "Web1092FinalG24<cxapwebfinal@gmail.com>",
            Subject : "偽 when2meet 活動成立通知",
            Body : content
          })
          .then(
            message => alert(message)
          );
        }

      }
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

  useEffect(() => {
    if (curEvent !== null) {
      getUserTime(curEvent.code)
      console.log(availableTime)
    }
  }, [curEvent])

  useEffect(() => {
    if (availableTime !== [] & curEvent !== null) {
      setPage('edit')
    }
  }, [availableTime])

  const openEditPage = (event) => {
    setCurEvent(event)
  }


  const getAllTime = async (code) => {
    const attendCode = code
    const {
      data: { available_list, name_list, time_list },
    } = await axios.get('/api/result', { params: { attendCode } });

    //setAllAvailableTime(available_list)
    //setNameList(name_list)
    console.log(time_list)

    let temp = []
    let all_len = name_list.length ;


    for(let i = 0 ; i < available_list.length ;  i++){

      let startD = time_list[0].split("-");
      let startD2 = new Date(startD[0]+ "/" + startD[1] + "/" + startD[2])
      startD2.setDate(startD2.getDate() + i + 1);
      startD2 = startD2.toISOString().substring(0, 10) ;
      console.log(startD2) ;

      let startT = parseInt(time_list[2].split(":")[0]) + parseInt(time_list[2].split(":")[1])/60 ;
      // console.log(startT);

      for (let j = 0 ; j < available_list[i].length ; j++){
        let cnt = 0 ;
        while(j + cnt < available_list[i].length && available_list[i][j+cnt].length === all_len){
          // console.log(j+cnt) ;
          cnt = cnt + 1 ;
        }

        if(cnt !== 0){

          let fromM = (startT + 0.5 * j) % 1 * 60;
          if(fromM === 0){fromM = "00"}
          let fromT  = parseInt(startT + 0.5 * j ) + ":" + fromM;

          let toM = (startT + 0.5 * j + cnt * 0.5) % 1 * 60;
          if(toM === 0){toM = "00"}
          let toT =  parseInt(startT + 0.5 * j + cnt * 0.5) + ":" + toM;

          console.log(startD2 + ", " + fromT + " ~ " + toT) ;
          temp.push(startD2 + ", " + fromT + " ~ " + toT) ;
        }

        j = j + cnt ;
      }

    }

    console.log(temp) ;


    setResult({
      availableList: available_list,
      nameList: name_list,
      result1: temp,
      //result2: temp2
    })

    console.log(available_list, name_list, time_list);
  }

  useEffect(() => {
    if (viewEvent !== null) {
      getAllTime(viewEvent.code)
      //setPage('view')
    }
  }, [viewEvent])

  useEffect(() => {
    if (result !== null & viewEvent !== null) {
      console.log(result.availableList)
      console.log(result.nameList)
      setPage('view')
    }
  }, [result])

  const openViewPage = (event) => {
    setViewEvent(event)
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
          username={user.username}
          viewEvent={viewEvent}
          handleBack={handleBack}
          handleFilter={handleFilter}
          handleNotify={handleNotify}
          result={result}/> :
          null
        }
      </div>
    )
}

export default MainPage;

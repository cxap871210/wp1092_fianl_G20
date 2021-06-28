import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [attendCode, setAttendCode] = useState('');

  const [activityName, setActivityName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');


  const [timeInterval, setTimeInterval] = useState(0) ;
  const [mustAppear, setMustAppear] = useState("");
  const [minPeople, setMinPeople] = useState(0);
  const [filterDisplay, setFilterDisplay] = useState([]);

  const [del_mails, setDel_mails] = useState([]);
  const [del_actName, setDel_actName] = useState("");
  const [del_creator, setDel_creator] = useState("");



  const [T0_0, setT0_0] = useState();
  const [T0_1, setT0_1] = useState();
  const [T0_2, setT0_2] = useState();
  const [T0_3, setT0_3] = useState();
  const [T0_4, setT0_4] = useState();

  const [T1_0, setT1_0] = useState();
  const [T1_1, setT1_1] = useState();
  const [T1_2, setT1_2] = useState();
  const [T1_3, setT1_3] = useState();
  const [T1_4, setT1_4] = useState();

  const [T2_0, setT2_0] = useState();
  const [T2_1, setT2_1] = useState();
  const [T2_2, setT2_2] = useState();
  const [T2_3, setT2_3] = useState();
  const [T2_4, setT2_4] = useState();




  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleSignUp = async () => {
    const {
      data: { status },
    } = await axios.post('/api/sign-up', {
      name,
      password,
      email,
    });

    console.log(status);
  };

  const handleSignIn = async () => {

    const {
      data: { status, activities },
    } = await axios.get('/api/sign-in', { params: { name, password } });

    console.log(status, activities);
  };

  const handleGetActivity = async () => {
    const {
      data: { status, activities },
    } = await axios.get('/api/get-activity', { params: { name } });

    console.log(status, activities);
  };

  const handleCreat = async () => {
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
  };

  const handleAttend = async () => {
    const {
      data: { status },
    } = await axios.post('/api/attend', {
      name,
      attendCode,
    });

    console.log(status);
  };


  const handleEdit = async () => {

    const {
      data: { status, result, time_list },
    } = await axios.get('/api/edit-time', { params: { name, attendCode } });

    console.log(status, result, time_list);
  };

  const handleSubmit = async () => {

    let time =    [[T0_0, T0_1, T0_2, T0_3, T0_4],
                   [T1_0, T1_1, T1_2, T1_3, T1_4],
                   [T2_0, T2_1, T2_2, T2_3, T2_4]] ;
    console.log(time);

    const {
      data: { status },
    } = await axios.post('/api/send-time', {
      name,
      attendCode,
      time,
    });

    console.log(status);
  };

  const handleResult = async () => {

    const {
      data: { available_list, name_list, time_list },
    } = await axios.get('/api/result', { params: { attendCode } });

    console.log(available_list, name_list, time_list);

  };

  const handleFilter = async () => {

    const {
      data: { available_list, name_list, time_list },
    } = await axios.get('/api/result', { params: { attendCode } });

    let temp = []
    let MA = mustAppear.split(",") ;
    // console.log(MA) ;
  

    for(let i = 0 ; i < available_list.length ;  i++){

      let startD = time_list[0].split("-");
      let startD2 = new Date(startD[0]+ "/" + startD[1] + "/" + startD[2])
      startD2.setDate(startD2.getDate() + i + 1); 
      startD2 = startD2.toISOString().substring(0, 10) ;
      // console.log(startD2) ;

      let startT = parseInt(time_list[2].split(":")[0]) + parseInt(time_list[2].split(":")[1])/60 ;
      // console.log(startT);
      

      for (let j = 0 ; j < available_list[i].length ; j++){
        let cnt = 0 ;
        let fine = true;
        while(j + cnt < available_list[i].length && available_list[i][j+cnt].length >= minPeople && fine){
          // console.log(j+cnt) ;
          // console.log(MA.length) ;
          if(MA.length !== 1 || MA[0] !== ""){
            for(let k = 0 ; k < MA.length ; k++){
              if(available_list[i][j+cnt].includes(MA[k]) === false){
                fine = false ;
                break ;
              }
            }
          }
          if(fine === true){
            cnt = cnt + 1 ;
          }
        }
        
      
        if(cnt !== 0 && cnt >= timeInterval * 2){
          
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
    setFilterDisplay(temp) ;

  };


  const handleEmail = async () => {

    const {
      data: { mails, actName },
    } = await axios.get('/api/get-mails', { params: { attendCode } });

    // console.log(mails);

    let content = "The arrangement of activity [ " + actName + " ] is done! <br><br>Available times are as below:<br><br>";
    for(let i = 0 ; i < filterDisplay.length ; i++){
      content = content + filterDisplay[i] + "<br>" ;
    }
    

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


  };

  const handleDeleteEmail = async () => {

    

    // console.log(mails);

    let content = "The activity [ " + del_actName + " ] has been cancelled by the creator " + del_creator + ". <br>";
    
    

    for(let i = 0 ; i < del_mails.length ; i ++){
      if(i !== del_mails.length -1){
        window.Email.send({
          Host : "smtp.gmail.com",
          Username : "cxapwebfinal@gmail.com",
          Password : "password1092",
          To : del_mails[i],
          From : "Web1092FinalG24<cxapwebfinal@gmail.com>",
          Subject : "偽 when2meet 活動取消通知",
          Body : content
        })
      }
      else{
        window.Email.send({
          Host : "smtp.gmail.com",
          Username : "cxapwebfinal@gmail.com",
          Password : "password1092",
          To : del_mails[i],
          From : "Web1092FinalG24<cxapwebfinal@gmail.com>",
          Subject : "偽 when2meet 活動取消通知",
          Body : content
        })
        .then(
          message => alert(message)
        );
      }

    }


  };

  

  const handleDelete = async () => {
    
    const {
      data: { mails, actName, creator_name },
    } = await axios.get('/api/get-delete-mails', { params: { attendCode } });

    setDel_mails(mails) ;
    setDel_actName(actName) ;
    setDel_creator(creator_name) ;
    
    const {
      data: { status },
    } = await axios.post('/api/delete', {
      attendCode,
    });

    console.log(status);
  };

  const handleQuit = async () => {
    const {
      data: { status },
    } = await axios.post('/api/quit', {
      name,
      attendCode,
    });

    console.log(status);
  };





  return (
    <Wrapper>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Password"
          style={{ width: 240 }}
          value={password}
          onChange={handleChange(setPassword)}
        />
        <TextField
          className={classes.input}
          placeholder="Email"
          style={{ width: 240 }}
          value={email}
          onChange={handleChange(setEmail)}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !password}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !password}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !password}
          onClick={handleGetActivity}
        >
          Get Act
        </Button>
      </Row>
      <Row>
        <TextField
          placeholder="attend code"
          value={attendCode}
          onChange={handleChange(setAttendCode)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!attendCode}
          onClick={handleAttend}
        >
          Attend
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!attendCode}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!attendCode}
          onClick={handleQuit}
        >
          Quit
        </Button>
      </Row>
        
      <Row>
        <TextField
          placeholder="Act name"
          value={activityName}
          onChange={handleChange(setActivityName)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="Start Date"
          value={startDate}
          onChange={handleChange(setStartDate)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="Start Time"
          value={startTime}
          onChange={handleChange(setStartTime)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="End Date"
          value={endDate}
          onChange={handleChange(setEndDate)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="End Time"
          value={endTime}
          onChange={handleChange(setEndTime)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!activityName || !startDate || !startTime || !endDate|| !endTime}
          onClick={handleCreat}
        >
          Creat
        </Button>
      </Row>
      <Row>
        <h3>|</h3>
        <TextField
          placeholder="0-0"
          value={T0_0}
          onChange={handleChange(setT0_0)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="1-0"
          value={T1_0}
          onChange={handleChange(setT1_0)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="2-0"
          value={T2_0}
          onChange={handleChange(setT2_0)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
      </Row>
      <Row>
        <h3>|</h3>
        <TextField
          placeholder="0-1"
          value={T0_1}
          onChange={handleChange(setT0_1)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="1-1"
          value={T1_1}
          onChange={handleChange(setT1_1)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="2-1"
          value={T2_1}
          onChange={handleChange(setT2_1)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
      </Row>
      <Row>
        <h3>|</h3>
        <TextField
          placeholder="0-2"
          value={T0_2}
          onChange={handleChange(setT0_2)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="1-2"
          value={T1_2}
          onChange={handleChange(setT1_2)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="2-2"
          value={T2_2}
          onChange={handleChange(setT2_2)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
      </Row>
      <Row>
        <h3>|</h3>
        <TextField
          placeholder="0-3"
          value={T0_3}
          onChange={handleChange(setT0_3)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="1-3"
          value={T1_3}
          onChange={handleChange(setT1_3)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="2-3"
          value={T2_3}
          onChange={handleChange(setT2_3)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
      </Row>
      <Row>
        <h3>|</h3>
        <TextField
          placeholder="0-4"
          value={T0_4}
          onChange={handleChange(setT0_4)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="1-4"
          value={T1_4}
          onChange={handleChange(setT1_4)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="2-4"
          value={T2_4}
          onChange={handleChange(setT2_4)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
      </Row>
      <Row>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleResult}
        >
          result
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleEmail}
        >
          Email
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleDeleteEmail}
        >
          D-Email
        </Button>
      </Row>
      <Row>
        <h3>Min Time Interval: (hrs)</h3>
        <TextField
          placeholder="Time Interval"
          value={timeInterval}
          onChange={handleChange(setTimeInterval)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <h3>Min people:</h3>
        <TextField  
          placeholder="Min people"
          value={minPeople}
          onChange={handleChange(setMinPeople)}
          style={{ flex: 1 }}
        />
        <h3>|</h3>
        <TextField
          placeholder="Only Must Appear (Ray,Ben ...)"
          value={mustAppear}
          onChange={handleChange(setMustAppear)}
          style={{ flex: 1 }}
        />
      </Row>
      <Row>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleFilter}
        >
          Filter
        </Button>

      </Row>

      <ContentPaper variant="outlined">
        <h2>filter:</h2>
        {filterDisplay.map((e) => (
          <h3>{e}</h3>
        ))}
      </ContentPaper>



    </Wrapper>
  );
};

export default Body;

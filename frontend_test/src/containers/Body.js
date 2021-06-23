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
  const [attendCode, setAttendCode] = useState('');

  const [activityName, setActivityName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');


  const [T0_0, setT0_0] = useState();
  const [T0_1, setT0_1] = useState();
  const [T0_2, setT0_2] = useState();
  const [T0_3, setT0_3] = useState();
  
  const [T1_0, setT1_0] = useState();
  const [T1_1, setT1_1] = useState();
  const [T1_2, setT1_2] = useState();
  const [T1_3, setT1_3] = useState();
  
  const [T2_0, setT2_0] = useState();
  const [T2_1, setT2_1] = useState();
  const [T2_2, setT2_2] = useState();
  const [T2_3, setT2_3] = useState();

  


  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleSignUp = async () => {
    const {
      data: { status },
    } = await axios.post('/api/sign-up', {
      name,
      password,
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
      data: { result },
    } = await axios.get('/api/edit-time', { params: { name, attendCode } });

    console.log(result);
  };

  const handleSubmit = async () => {
    
    let time =    [[T0_0, T0_1, T0_2, T0_3],
                   [T1_0, T1_1, T1_2, T1_3],
                   [T2_0, T2_1, T2_2, T2_3]] ;
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
      data: { result },
    } = await axios.get('/api/result', { params: { attendCode } });

    console.log(result);
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
      </Row>
      
    
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;
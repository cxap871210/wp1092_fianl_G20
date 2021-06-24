import { Router } from 'express';
import db from '../../models/db';

const router = Router();

/*-----------------------------------------------*/
router.post('/sign-up', async function (req, res) {
  const { name, password } = req.body;
  const exist = await db.UserModel.findOne({ name: name })

  if(!exist){
    const user = await new db.UserModel({ name: name, password: password, activities:[] });
    await user.save();
    res.send({ status: true });
  } else{
    res.send({ status: false });
  }
});

router.get('/sign-in', async function (req, res) {
  const { name, password } = req.query;
  const exist = await db.UserModel.findOne({ name: name, password: password }).populate('activities');

  if(!exist){
    res.send({ status: false, activities:[] });
  } else{
    res.send({ status: true, activities: exist.activities});
  }
});

router.post('/create-activity', async function (req, res) {
  const { activityName, name, startDate, endDate, startTime, endTime } = req.body;
  const exist = await db.ActivityModel.findOne({ name: activityName, creator: name })

  if(!exist){
    const user = await db.UserModel.findOne({ name: name });
    const user_id = user._id;

    let toFind = true;
    let code = "";
    let exist = "";
    while(toFind){
      const code1 = Math.floor(Math.random()*9000) + 1000;
      const code2 = Math.floor(Math.random()*9000) + 1000;
      code = code1.toString() + "-" + code2.toString();
      exist = await db.ActivityModel.findOne({ code: code });
      if(exist === null){
        toFind = false;
      }
    }

    const activity = await new db.ActivityModel({
      name: activityName,
      creator: name,
      code: code,
      users: [user_id],
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
    });
    const activity_result = await activity.save();
    const activity_id = activity_result._id;
    await db.UserModel.updateOne({ name: name }, { $push: { activities: activity_id } });
    res.send({ status: true });
  } else{
    res.send({ status: false });
  }
});

router.get('/get-activity', async function (req, res) {
  const { name } = req.query;
  const exist = await db.UserModel.findOne({ name: name }).populate('activities');

  if(!exist){
    res.send({ status: false, activities:[] });
  } else{
    res.send({ status: true, activities: exist.activities});
  }
});

router.post('/attend', async function (req, res) {
  const { name, attendCode } = req.body;
  const activity = await db.ActivityModel.findOne({ code: attendCode })
  const user = await db.UserModel.findOne({ name: name });
  const user_id = user._id;

  if(!activity || activity.users.includes(user_id) === true){
    res.send({ status: false });
  } else{
    const activity_id = activity._id;
    await db.ActivityModel.updateOne({ code: attendCode }, { $push: { users: user_id } });
    await db.UserModel.updateOne({ name: name }, { $push: { activities: activity_id } });
    res.send({ status: true });
  }
});

router.get('/edit-time', async function (req, res) {
  const { name, attendCode } = req.query;
  const user = await db.UserModel.findOne({ name: name });
  const user_id = user._id;
  const activity = await db.ActivityModel.findOne({ code: attendCode });
  const activity_id = activity._id;
  const exist = await db.TimeModel.findOne({ sender: user_id, activity: activity_id });

  if(exist){
    let time_list = [];
    time_list.push(activity.start_date, activity.end_date, activity.start_time, activity.end_time);

    res.send({ status: true, result: exist.available_time, time_list: time_list });
  } else{
    const startD = activity.start_date.split("-");
    const endD = activity.end_date.split("-");
    const start_date = startD[1] + "/" + startD[2] + "/" + startD[0];
    const end_date = endD[1] + "/" + endD[2] + "/" + endD[0];
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const diff_date = endDate.getTime() - startDate.getTime();
    const days = diff_date / (1000 * 3600 * 24) + 1;

    const startT = activity.start_time.split(":");
    const endT = activity.end_time.split(":");
    const start_time = parseInt(startT[0]) * 60 + parseInt(startT[1]);
    const end_time = parseInt(endT[0]) * 60 + parseInt(endT[1]);
    const diff_time = end_time - start_time;
    const times = diff_time / 30;

    let arr = new Array(days);
    for(let i = 0 ; i < days ; i++) {
        arr[i] = new Array(times).fill(0);
    }

    const time = await new db.TimeModel({ sender: user_id, activity: activity_id, available_time: arr })
    const time_result = await time.save();

    let time_list = [];
    time_list.push(activity.start_date, activity.end_date, activity.start_time, activity.end_time);

    res.send({ status: true, result: time_result.available_time, time_list: time_list });
  }
});

router.post('/send-time', async function (req, res) {
  const { name, attendCode, time } = req.body;
  const user = await db.UserModel.findOne({ name: name });
  const user_id = user._id;
  const activity = await db.ActivityModel.findOne({ code: attendCode });
  const activity_id = activity._id;
  const result = await db.TimeModel.updateOne({ sender: user_id, activity: activity_id }, { available_time: time });

  if(result){
    res.send({ status: true });
  } else{
    res.send({ status: false });
  }
});

router.get('/result', async function (req, res) {
  const { attendCode } = req.query;
  const activity = await db.ActivityModel.findOne({ code: attendCode });
  const activity_id = activity._id;
  const user_result = await db.UserModel.find({ activities: activity_id })
  const time_result = await db.TimeModel.find({ activity: activity_id }).populate("sender");

  const startD = activity.start_date.split("-");
  const endD = activity.end_date.split("-");
  const start_date = startD[1] + "/" + startD[2] + "/" + startD[0];
  const end_date = endD[1] + "/" + endD[2] + "/" + endD[0];
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const diff_date = endDate.getTime() - startDate.getTime();
  const days = diff_date / (1000 * 3600 * 24) + 1;

  const startT = activity.start_time.split(":");
  const endT = activity.end_time.split(":");
  const start_time = parseInt(startT[0]) * 60 + parseInt(startT[1]);
  const end_time = parseInt(endT[0]) * 60 + parseInt(endT[1]);
  const diff_time = end_time - start_time;
  const times = diff_time / 30;

  let name_list = [];
  let available_list = [];
  for(let i = 0 ; i < days ; i++) {
    let temp_time = [] ;
    for(let j = 0 ; j < times ; j++) {
      temp_time.push([]) ;
    }
    available_list.push(temp_time) ;
  }

  user_result.map(({ name }) => {
    name_list.push(name);
  })

  time_result.map(({ available_time, sender }) => {
    const name = sender.name;
    for(let i = 0 ; i < days ; i++) {
      for(let j = 0 ; j < times ; j++) {
        if(available_time[i][j] === 1) {
          available_list[i][j].push(name);
        }
      }
    }
  })

  let time_list = [];
  time_list.push(activity.start_date, activity.end_date, activity.start_time, activity.end_time);

  res.send({ available_list: available_list, name_list: name_list, time_list: time_list });
});
/*-----------------------------------------------*/

export default router;

import { Router } from 'express';
import db from '../../models/db';

const router = Router();


router.post('/sign-up', async function (req, res) {
  const {name, password} = req.body;
  const exist = await db.UserModel.findOne({ name: name })
  // console.log(exist);
  if(!exist){
    const user = await new db.UserModel({ name: name, password: password, activities:[] });
    await user.save();
    res.send({ status: true });
  } else{
    res.send({ status: false });
  }
});

router.get('/sign-in', async function (req, res) {
  const {name, password} = req.query;
  
  const exist = await db.UserModel.findOne({ name: name, password: password }).populate('activities');
  

  if(!exist){
    res.send({ status: false, activities:[] });
  } else{
    res.send({ status: true, activities: exist.activities});
  }
});

router.get('/get-activity', async function (req, res) {
  const {name} = req.query;
  
  const exist = await db.UserModel.findOne({ name: name }).populate('activities');
  

  if(!exist){
    res.send({ status: false, activities:[] });
  } else{
    res.send({ status: true, activities: exist.activities});
  }
});


router.post('/create-activity', async function (req, res) {
  const {activityName, name, startDate, startTime, endDate, endTime} = req.body;
  // console.log(req.body);

  const exist = await db.ActivityModel.findOne({ name: activityName, creator: name })
  // console.log(exist);
  if(!exist){
    const user = await db.UserModel.findOne({ name: name });
    const user_id = user._id ;

    let fine = true;
    let str = "";
    while(fine === true){
      const code1 = Math.floor(Math.random()*9000) + 1000;
      const code2 = Math.floor(Math.random()*9000) + 1000;
      str = code1.toString() + "-" + code2.toString();
      const found = await db.ActivityModel.findOne({ code: str });
    
      if(found === null){
        fine = false;
      }
    }
    
    const activity = await new db.ActivityModel({
      name: activityName,
      creator: name,
      code: str,
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



router.post('/attend', async function (req, res) {
  const {name, attendCode} = req.body;
  
  const exist = await db.ActivityModel.findOne({ code: attendCode })
  
  const user_to_add = await db.UserModel.findOne({ name: name });
  const id_to_add = user_to_add._id;

  // console.log(exist.users.includes(user_to_add._id));

  if(!exist || exist.users.includes(user_to_add._id) === true){
    res.send({ status: false });
  } else{
    const exist_id = exist._id;
    await db.ActivityModel.updateOne({ code: attendCode }, { $push: { users: id_to_add } });
    await db.UserModel.updateOne({ name: name }, { $push: { activities: exist_id } });

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
    res.send({ status: true, result: exist.available_time });
  } else{
    const days = activity.end_date - activity.start_date + 1;
    const times = (activity.end_time - activity.start_time) * 2;

    var arr = new Array(days);
    for (var i = 0 ; i < days ; i++) {
        arr[i] = new Array(times).fill(0);
    }

    const time = await new db.TimeModel({ sender: user_id, activity: activity_id, available_time: arr })
    const time_result = await time.save();
    res.send({ status: true, result: time_result.available_time });
  }
});

router.post('/send-time', async function (req, res) {
  const { name, attendCode, time } = req.body;

  console.log(time);

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
  const result = await db.TimeModel.find({ activity: activity_id }).populate("sender");

  const days = activity.end_date - activity.start_date + 1;
  const times = (activity.end_time - activity.start_time) * 2;
  
  let arr = [];
  for(let i = 0 ; i < days ; i++){
    let temp_time = [] ;
    for(let j= 0 ; j < times ; j++){
      temp_time.push([]) ;
    }
    arr.push(temp_time) ;
  }

  result.map(({ available_time, sender }) => {
    const name = sender.name;
  
    for(let i = 0 ; i < days ; i++) {
      for(let j = 0 ; j < times ; j++) {
        if(available_time[i][j] === 1) {
          arr[i][j].push(name);
        }
      }
    }
  })

  res.send({ result: arr });
});






export default router;

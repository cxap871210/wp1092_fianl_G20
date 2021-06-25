// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);

import mongoose from 'mongoose';

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: {type: String, require: true},
  activities: [{ type: mongoose.Types.ObjectId, ref: 'Activity' }],
})

const activitySchema = new Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  code: { type: String, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
})

const timeSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  activity: { type: mongoose.Types.ObjectId, ref: 'Activity' },
  available_time: [[{ type: Number, required: true }]],
})

const UserModel = mongoose.model('User', userSchema);
const ActivityModel = mongoose.model('Activity', activitySchema);
const TimeModel = mongoose.model('Time', timeSchema);

const db = {
  UserModel,
  ActivityModel,
  TimeModel,
};

export default db;

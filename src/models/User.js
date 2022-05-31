import mongoose from 'mongoose'

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  },
  full_name: {
    type: String,
    required: [true, 'Please provide a full name.'],
    maxlength: [20, 'Full Name cannot be more than 60 characters'],
  },
  address: {
    type: String,
    default: ''
  },
  dob: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  account_role: {
    type: String,
    default: "owner"
  },
  account_plan: {
    type: String,
    default: ''
  },
  members: {
    type: Array,
    default: []
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)

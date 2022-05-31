import mongoose from 'mongoose'

/* UserSchema will correspond to a collection in your MongoDB database. */
const SubscriptionSchema = new mongoose.Schema({
  subType: {
    type: String
  },
  start_date: {
    type: String
  },
  end_date: {
    type: String
  },
  price: {
    type: String
  },
  next_billing_date: {
    type: String
  },
});
const PlanSchema = new mongoose.Schema({
  plan: {
    type: String
  },
  monthLimit: {
    type: Number
  },
  totalProjectsLimit: {
    type: Number
  },
  keywordListLimit: {
    type: Number
  },
  price: {
    type: Number
  }
});
const CurrentPlanSchem = new mongoose.Schema({
  month_credit: {
    type: Number
  },
  projects: {
    type: Number
  },
  keywords: {
    type: Number
  },
  account_plan: {
    type: PlanSchema,
  },
  next_billing_date: {
    type: String
  }
});
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
  account_history: {
    type: Array,
  },
  members: {
    type: Array,
    default: []
  },
  current_plan: {
    type: CurrentPlanSchem
  },
  subscriptions: {
    type: [SubscriptionSchema],
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema)

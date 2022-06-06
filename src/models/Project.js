import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({

})
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  industry: {
    type: String
  },
  articles: {
    type: [ArticleSchema],
    default: []
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)

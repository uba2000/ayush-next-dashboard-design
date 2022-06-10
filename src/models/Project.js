import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    industry: {
      type: String,
    },
    kewords: {
      type: [String],
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.models.Project ||
  mongoose.model('Project', ProjectSchema);

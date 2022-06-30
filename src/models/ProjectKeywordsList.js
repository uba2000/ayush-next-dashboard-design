import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    searchFor: {
      type: String,
      required: true,
    },
    cpc: {
      type: Number,
    },
    volume: {
      type: Number,
    },
    traffic: {
      type: Number,
    },
    difficulty: {
      type: Number,
    },
    trending: {
      type: Number,
    },
    ait: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const ProjectKeywordsListSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    industry: {
      type: String,
    },
    list: {
      type: [ListSchema],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.models.ProjectKeywordsList ||
  mongoose.model('ProjectKeywordsList', ProjectKeywordsListSchema);

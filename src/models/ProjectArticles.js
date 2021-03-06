import mongoose from 'mongoose';

const ProjectArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    article_content: {
      type: String,
    },
    project_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    keywordlist_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    word_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.models.ProjectArticle ||
  mongoose.model('ProjectArticle', ProjectArticleSchema);

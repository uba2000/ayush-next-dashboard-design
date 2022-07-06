import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      required: true,
    },
    monthLimit: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    totalProjects: {
      type: Number,
      required: true,
    },
    keywordListLimit: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    yearPrice: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.models.Plan || mongoose.model('Plan', PlanSchema);

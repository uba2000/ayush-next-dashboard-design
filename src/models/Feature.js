import mongoose from 'mongoose';

const FeaturesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide feature name'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide feature slug'],
    },
    description: {
      type: String,
      required: [true, 'Please provide feature description'],
    },
    type: {
      type: String,
      required: [true, 'Please provide feature type'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.models.Features ||
  mongoose.model('Features', FeaturesSchema);

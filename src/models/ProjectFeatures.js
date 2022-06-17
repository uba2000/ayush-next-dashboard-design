import mongoose from 'mongoose';

const ProjectFeaturesSchema = new mongoose.Schema(
  {},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.models.ProjectFeatures ||
  mongoose.model('ProjectFeatures', ProjectFeaturesSchema);

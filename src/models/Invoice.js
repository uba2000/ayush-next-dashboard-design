import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    transaction_details: {
      type: Object,
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

export default mongoose.models.Invoices ||
  mongoose.model('Invoices', InvoiceSchema);

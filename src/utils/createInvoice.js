import Invoice from '../models/Invoice';

export const checkAuth = async ({ user, transaction_details }) => {
  try {
    const invoice = new Invoice({
      user_id: user._id,
      description: '',
      transaction_details: transaction_details,
    });

    await invoice.save();

    return invoice;
  } catch (error) {
    throw new Error(error);
  }
};

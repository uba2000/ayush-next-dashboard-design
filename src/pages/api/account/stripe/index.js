import Stripe from 'stripe';
import User from '../../../../models/User';
import { checkAuth } from '../../../../utils/checkAuth';

import dbConnect from '../../../../utils/connect';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      const userAuth = checkAuth(req.headers);

      const user = await User.findById(userAuth._id);

      const stripe = Stripe(process.env.STRIPE_SERVER_SECRET_KEY);

      const customer = user.stripe_customer_id
        ? { id: user.stripe_customer_id }
        : await stripe.customers.create();

      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ['card'],
      });

      return res.status(200).json({
        success: true,
        client_secret: setupIntent.client_secret,
      });
      break;

    default:
      return res.status(400).json({ success: false });
      break;
  }
}

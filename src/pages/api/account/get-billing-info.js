import Crypto from 'crypto-js';
import Stripe from 'stripe';
import { forEach } from 'lodash';

import dbConnect from '../../../utils/connect';
import User from '../../../models/User';
import { checkAuth } from '../../../utils/checkAuth';
import { cardHide } from '../../../utils/hideCard';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const userAuth = checkAuth(req.headers);

        const stripe = Stripe(process.env.STRIPE_SERVER_SECRET_KEY);

        const customer = await stripe.customers.create();

        const setupIntent = await stripe.setupIntents.create({
          customer: customer.id,
          payment_method_types: ['bancontact', 'card', 'ideal'],
        });

        const userPaymentDetails = await User.findById(userAuth._id).select(
          'payment_methods current_plan'
        );

        let paymentMethods = userPaymentDetails.payment_methods;

        return res.status(200).json({
          success: true,
          data: {
            paymentMethods: [],
            currentPlan: userPaymentDetails.current_plan,
            intent: {
              client_secret: setupIntent.client_secret,
              customer_id: customer.id,
            },
          },
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }

    default:
      return res.status(400).json({ success: false });
      break;
  }
}

import Stripe from 'stripe';

import dbConnect from '../../../../utils/connect';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      const stripe = Stripe(process.env.STRIPE_SERVER_SECRET_KEY);

      const customer = await stripe.customers.create();

      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ['bancontact', 'card', 'ideal'],
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

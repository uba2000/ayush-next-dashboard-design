import Crypto from 'crypto-js';
import Stripe from 'stripe';

import dbConnect from '../../../utils/connect';
import User from '../../../models/User';
import { checkAuth } from '../../../utils/checkAuth';
import { forEach } from 'lodash';
import { cardHide } from '../../../utils/hideCard';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        let userAuth = checkAuth(req.headers);

        let { payment_method, customer_id, client_secret, intent_id } =
          req.body;

        await User.findOneAndUpdate(
          { _id: userAuth._id },
          {
            $push: {
              payment_methods: {
                stripe_intent_id: intent_id,
                client_secret: client_secret,
                stripe_customer_id: customer_id,
                stripe_payment_method_id: payment_method,
              },
            },
          }
        );

        return res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      break;
    case 'GET':
      try {
        const userAuth = checkAuth(req.headers);

        const userPaymentDetails = await User.findById(userAuth._id).select(
          'payment_methods'
        );

        let paymentMethods = [];

        // forEach(userPaymentDetails.payment_methods, (value, index) => {
        //   let p = userPaymentDetails.payment_methods[index];
        //   paymentMethods.push({
        //     ...p._doc,
        //     card_number: Crypto.AES.decrypt(
        //       p.card_number,
        //       process.env.ENC_SECRET
        //     ).toString(Crypto.enc.Utf8),
        //     mask_card_number: cardHide(
        //       Crypto.AES.decrypt(
        //         p.card_number,
        //         process.env.ENC_SECRET
        //       ).toString(Crypto.enc.Utf8)
        //     ),
        //     exp_date: Crypto.AES.decrypt(
        //       p.exp_date,
        //       process.env.ENC_SECRET
        //     ).toString(Crypto.enc.Utf8),
        //     security_code: Crypto.AES.decrypt(
        //       p.security_code,
        //       process.env.ENC_SECRET
        //     ).toString(Crypto.enc.Utf8),
        //   });
        // });

        return res.status(200).json({ success: true, data: [] });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
}

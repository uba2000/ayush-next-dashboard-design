import Crypto from 'crypto-js';
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

        const userPaymentDetails = await User.findById(userAuth._id).select(
          'payment_methods current_plan'
        );

        let paymentMethods = [];

        forEach(userPaymentDetails.payment_methods, (value, index) => {
          let p = userPaymentDetails.payment_methods[index];
          paymentMethods.push({
            ...p._doc,
            card_number: Crypto.AES.decrypt(
              p.card_number,
              process.env.ENC_SECRET
            ).toString(Crypto.enc.Utf8),
            mask_card_number: cardHide(
              Crypto.AES.decrypt(
                p.card_number,
                process.env.ENC_SECRET
              ).toString(Crypto.enc.Utf8)
            ),
            exp_date: Crypto.AES.decrypt(
              p.exp_date,
              process.env.ENC_SECRET
            ).toString(Crypto.enc.Utf8),
            security_code: Crypto.AES.decrypt(
              p.security_code,
              process.env.ENC_SECRET
            ).toString(Crypto.enc.Utf8),
          });
        });

        return res.status(200).json({
          success: true,
          data: {
            paymentMethods,
            currentPlan: userPaymentDetails.current_plan,
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

import Crypto from 'crypto-js';

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

        let { cardNumber, firstName, lastName, secCode, expDate } = req.body;

        // TODO: check if card is valid...

        cardNumber = Crypto.AES.encrypt(
          cardNumber,
          process.env.ENC_SECRET
        ).toString();
        secCode = Crypto.AES.encrypt(
          secCode,
          process.env.ENC_SECRET
        ).toString();
        expDate = Crypto.AES.encrypt(
          expDate,
          process.env.ENC_SECRET
        ).toString();

        console.log({
          card_number: cardNumber,
          first_name: firstName,
          last_name: lastName,
          exp_date: expDate,
          security_code: secCode,
        });

        await User.findOneAndUpdate(
          { _id: userAuth._id },
          {
            $push: {
              payment_methods: {
                card_number: cardNumber,
                first_name: firstName,
                last_name: lastName,
                exp_date: expDate,
                security_code: secCode,
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

        return res.status(200).json({ success: true, data: paymentMethods });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
}

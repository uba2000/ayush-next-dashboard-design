import Stripe from 'stripe';

import { checkAuth } from '../../../utils/checkAuth';
import dbConnect from '../../../utils/connect';
import User from '../../../models/User';
import Project from '../../../models/Project';
import Plan from '../../../models/Plan';
import errorTypes from '../../../_mock/errorTypes';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      const stripe = Stripe(process.env.STRIPE_SERVER_SECRET_KEY);

      try {
        let userAuth = checkAuth(req.headers);

        let {
          _id,
          slug,
          period,
          price,
          keywordListLimit,
          monthLimit,
          totalProjects,
        } = req.body;

        const user = await User.findById(userAuth._id).select(
          'current_plan payment_methods'
        );

        const defaultPaymentMethod = user.payment_methods.find(
          (item) => item.type == 'D'
        );

        if (!defaultPaymentMethod) {
          return res.status(422).json({
            success: false,
            error: {
              message: 'Invalid plan!',
              details: { type: errorTypes.NO_PAYMENT_METHOD },
            },
          });
        }

        const paymentMethods = await stripe.paymentMethods.list({
          customer: defaultPaymentMethod.stripe_customer_id,
          type: 'card',
        });
        console.log(paymentMethods);

        let date = new Date();

        const planDetails = await Plan.findById(_id);

        const planPrice =
          period == 'M' ? planDetails.price : planDetails.yearPrice;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: planPrice,
          currency: 'usd',
          customer: defaultPaymentMethod.stripe_customer_id,
          payment_method: defaultPaymentMethod.stripe_payment_method_id,
          off_session: true,
          confirm: true,
        });

        console.log('paymentIntent', paymentIntent, 'paymentIntent');

        // save invoice...

        await User.findOneAndUpdate(
          { _id: userAuth._id },
          {
            $set: {
              current_plan: {
                projects: user.current_plan
                  ? [...user.current_plan.projects]
                  : [],
                keywords: user.current_plan
                  ? [...user.current_plan.keywords]
                  : [],
                plan_projects: [],
                plan_keywords: [],
                period_type: period,
                period_credit: 0,
                plan_local_id: _id,
                next_billing_date:
                  period == 'M'
                    ? new Date(date.setMonth(date.getMonth() + 1))
                    : new Date(date.setFullYear(date.getFullYear() + 1)),
                account_plan: {
                  plan: slug,
                  price: price,
                  period_limit: period == 'M' ? monthLimit : monthLimit * 12,
                  total_projects: totalProjects,
                  keyword_list_limit: keywordListLimit,
                },
              },
            },
          }
        );

        return res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        // const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
        //   error.raw.payment_intent.id
        // );
        // console.log(paymentIntentRetrieved);
        return res.status(422).json({
          success: false,
          error: {
            message: 'An error occured!',
          },
        });
      }
      break;

    default:
      return res.status(400).json({ success: false });
      break;
  }
}

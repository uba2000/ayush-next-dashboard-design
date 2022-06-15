import { checkAuth } from '../../../utils/checkAuth';
import dbConnect from '../../../utils/connect';
import User from '../../../models/User';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      let userAuth = checkAuth(req.headers);

      let {
        id,
        slug,
        period,
        price,
        keywordListLimit,
        monthLimit,
        totalProjects,
      } = req.body;

      let date = new Date();

      await User.findOneAndUpdate(
        { _id: userAuth._id },
        {
          $set: {
            current_plan: {
              period_type: period,
              period_credit: 0,
              plan_local_id: id,
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
      break;

    default:
      return res.status(400).json({ success: false });
      break;
  }
}

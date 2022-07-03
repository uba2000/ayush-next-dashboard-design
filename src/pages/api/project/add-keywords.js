import dbConnect from '../../../utils/connect';
import ProjectKeywordsList from '../../../models/ProjectKeywordsList';
import User from '../../../models/User';
import { checkAuth } from '../../../utils/checkAuth';
import errorTypes from '../../../_mock/errorTypes';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const userAuth = checkAuth(req.headers);

        const user = await User.findById(userAuth._id);

        if (!user.current_plan) {
          return res.status(422).json({
            success: false,
            error: {
              message: 'No active plan!',
              details: { type: errorTypes.NO_PLAN },
            },
          });
        }

        if (
          new Date(user.current_plan.next_billing_date).getTime() <
          new Date().getTime()
        ) {
          return res.status(422).json({
            success: false,
            error: {
              message: 'Upgrade plan!',
              details: { type: errorTypes.PLAN_EXPIRED },
            },
          });
        }

        if (
          user.current_plan.keywords.length + 1 >
          user.current_plan.account_plan.keyword_list_limit
        ) {
          return res.status(422).json({
            success: false,
            error: {
              message: 'Upgrade plan!',
              details: { type: errorTypes.LIMIT_EXCEED },
            },
          });
        }

        const {
          project_id,
          title,
          tags,
          industry,
          keywordsQuestions,
          keywords = [],
        } = req.body;

        const newProjectListKeyword = new ProjectKeywordsList({
          title,
          tags,
          industry,
          list: keywordsQuestions,
          keywords: keywords,
          project_id: project_id,
          user_id: userAuth._id,
        });

        user.current_plan.keywords.push(newProjectListKeyword._id);

        user.current_plan.plan_keywords.push(newProjectListKeyword._id);

        await user.save();

        await newProjectListKeyword.save();
        res.status(200).json({ success: true, data: newProjectListKeyword });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      break;

    default:
      break;
  }
}

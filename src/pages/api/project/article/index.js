import dbConnect from '../../../../utils/connect';
import { checkAuth } from '../../../../utils/checkAuth';
import User from '../../../../models/User';
import ProjectArticles from '../../../../models/ProjectArticles';
import errorTypes from '../../../../_mock/errorTypes';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();
  console.log(method);
  switch (method) {
    case 'POST':
      try {
        let userAuth = checkAuth(req.headers);

        const user = await User.findById(userAuth._id);

        const {
          title,
          tags,
          article_content,
          project_id,
          keywordlist_id,
          articleWordCount,
        } = req.body;

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

        const newProjectArticle = new ProjectArticles({
          title,
          tags,
          article_content,
          project_id,
          user_id: userAuth._id,
          keywordlist_id,
          word_count: articleWordCount,
        });

        let periodCredits = user.current_plan.period_credit;

        if (
          periodCredits + articleWordCount >
          user.current_plan.account_plan.period_limit
        ) {
          return res.status(422).json({
            success: false,
            error: {
              message: 'Credit Limit Exceeded!',
              details: { type: errorTypes.LIMIT_EXCEED },
            },
          });
        }

        const userProjectIndex = user.current_plan.projects.findIndex(
          (up) => up.project_id == project_id
        );

        user.current_plan.period_credit = periodCredits + articleWordCount;

        user.current_plan.projects[userProjectIndex].credits =
          user.current_plan.projects[userProjectIndex].credits +
          articleWordCount;

        await user.save();

        await newProjectArticle.save();

        return res.status(200).json({ success: true, data: newProjectArticle });
        break;
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
        break;
      }

    default:
      return res.status(400).json({ success: false });
      break;
  }
}

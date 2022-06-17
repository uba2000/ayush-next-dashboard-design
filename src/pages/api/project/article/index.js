import dbConnect from '../../../../utils/connect';
import { checkAuth } from '../../../../utils/checkAuth';
import User from '../../../../models/User';
import ProjectArticles from '../../../../models/ProjectArticles';

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

        const newProjectArticle = new ProjectArticles({
          title,
          tags,
          article_content,
          project_id,
          keywordlist_id,
          word_count: articleWordCount,
        });

        let periodCredits = user.current_plan.period_credit;

        if (
          periodCredits + articleWordCount >
          user.current_plan.account_plan.period_limit
        ) {
          return res.status(400).send({ message: 'Credit Limit Exceeded!' });
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

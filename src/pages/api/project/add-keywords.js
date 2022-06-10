import dbConnect from '../../../utils/connect';
import Project from '../../../models/Project';
import ProjectKeywordsList from '../../../models/ProjectKeywordsList';
import { checkAuth } from '../../../utils/checkAuth';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const userAuth = checkAuth(req.headers);
        const { project_id, title, tags, industry, keywordsQuestions } =
          req.body;

        const newProjectListKeyword = new ProjectKeywordsList({
          title,
          tags,
          industry,
          list: keywordsQuestions,
          project_id: project_id,
        });
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

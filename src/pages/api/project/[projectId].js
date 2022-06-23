import dbConnect from '../../../utils/connect';
import ProjectArticles from '../../../models/ProjectArticles';
import ProjectKeywordsList from '../../../models/ProjectKeywordsList';
import { checkAuth } from '../../../utils/checkAuth';
import Project from '../../../models/Project';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        let userAuth = checkAuth(req.headers);

        const { projectId } = req.query;

        const thisProjects = await Project.findById(projectId).select('title');

        let ssrArticles = await ProjectArticles.find({
          project_id: projectId,
        }).select('title tags created_at industry');

        let ssrKeywordLists = await ProjectKeywordsList.find({
          project_id: projectId,
        }).select('title tags created_at industry');

        // TODO: get features on this PROJECT...

        return res.status(200).json({
          success: true,
          data: {
            project: thisProjects,
            articles: ssrArticles,
            keywordList: ssrKeywordLists,
          },
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      break;

    default:
      return res.status(400).json({ success: false });
      break;
  }
}

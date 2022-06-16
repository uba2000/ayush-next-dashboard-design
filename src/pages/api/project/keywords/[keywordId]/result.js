import dbConnect from '../../../../../utils/connect';
import ProjectKeywordsList from '../../../../../models/ProjectKeywordsList';
import { checkAuth } from '../../../../../utils/checkAuth';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        let userAuth = checkAuth(req.headers);

        const { keywordId } = req.query;

        let ssrProject = await ProjectKeywordsList.findById(keywordId);

        return res.status(200).json({
          success: true,
          data: ssrProject,
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

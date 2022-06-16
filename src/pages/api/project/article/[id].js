import dbConnect from '../../../../utils/connect';
import { checkAuth } from '../../../../utils/checkAuth';
import ProjectArticles from '../../../../models/ProjectArticles';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        let userAuth = checkAuth(req.headers);

        const { id } = req.query;

        let ssrArticle = await ProjectArticles.findById(id);

        return res.status(200).json({
          success: true,
          data: ssrArticle,
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

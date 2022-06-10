import dbConnect from '../../../../utils/connect';
import { checkAuth } from '../../../../utils/checkAuth';
import ProjectArticles from '../../../../models/ProjectArticles';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'POST':
      try {
        let userAuth = checkAuth(req.headers);

        const { title, tags, article_content, project_id, keywordlist_id } =
          req.body;

        const newProjectArticle = new ProjectArticles({
          title,
          tags,
          article_content,
          project_id,
          keywordlist_id,
        });
        await newProjectArticle.save();
        res.status(200).json({ success: true, data: newProjectArticle });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
}

import dbConnect from '../../../../utils/connect';
import { checkAuth } from '../../../../utils/checkAuth';
import ProjectArticles from '../../../../models/ProjectArticles';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        let user = checkAuth(req.headers);

        const { title, tags, newContent, article_id } = req.body;

        let updateObject = {};

        if (title) {
          updateObject.title = title;
        }
        if (tags) {
          updateObject.tags = tags;
        }
        if (newContent) {
          updateObject.article_content = newContent;
        }

        await ProjectArticles.updateOne(
          { _id: article_id },
          {
            $set: updateObject,
          }
        );

        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      break;
    case 'DELETE':
      try {
        let user = checkAuth(req.headers);

        const { article_id } = req.body;

        await ProjectArticles.deleteOne({ _id: article_id });

        return res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

import dbConnect from '../../../utils/connect';
import ProjectKeywordsList from '../../../models/ProjectKeywordsList';
import { checkAuth } from '../../../utils/checkAuth';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const userAuth = checkAuth(req.headers);
        const { title, tags, industry, list_id } = req.body;
        let updateObject = {};

        if (title) {
          updateObject.title = title;
        }
        if (tags) {
          updateObject.tags = tags;
        }
        if (industry) {
          updateObject.industry = industry;
        }

        await ProjectKeywordsList.updateOne(
          { _id: list_id },
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

    default:
      res.status(400).json({ success: false });
      break;
  }
}

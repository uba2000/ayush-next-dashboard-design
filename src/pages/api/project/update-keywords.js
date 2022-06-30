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
        const { keywordsQuestions, keywordId, keywords } = req.body;

        if (!keywordsQuestions || !keywordId) {
          return res.status(422).json({ message: 'Invalid Data' });
        }

        await ProjectKeywordsList.updateOne(
          {
            _id: keywordId,
          },
          {
            $set: {
              list: keywordsQuestions,
              keywords: keywords,
            },
          }
        );

        return res.status(200).json({ success: true, data: keywordId });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      break;
    case 'DELETE':
      try {
        let user = checkAuth(req.headers);

        const { keywordId } = req.body;

        await ProjectKeywordsList.deleteOne({ _id: keywordId });

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

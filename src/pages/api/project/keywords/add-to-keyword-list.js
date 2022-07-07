import { forEach } from 'lodash';

import { checkAuth } from '../../../../utils/checkAuth';
import dbConnect from '../../../../utils/connect';
import ProjectKeywordsList from '../../../../models/ProjectKeywordsList';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const userAuth = checkAuth(req.headers);

        const { keywords, keywordsListId } = req.body;
        const keywordList = await ProjectKeywordsList.findOne({
          _id: keywordsListId,
          user_id: userAuth._id,
        });
        console.log({ keywords, keywordsListId, keywordList });

        forEach(keywords, (value) => {
          keywordList.list.push({
            question: value.question,
            searchFor: value.searchFor,
            cpc: value.cpc,
            volume: value.volume,
            traffic: value.traffic,
            difficulty: value.difficulty,
            trending: value.trending,
            ait: value.ait,
          });
        });

        await keywordList.save();

        return res.status(200).json({ success: true });
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

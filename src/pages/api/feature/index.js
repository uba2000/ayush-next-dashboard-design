import dbConnect from '../../../utils/connect';
import Feature from '../../../models/Feature';
import { checkAuth } from '../../../utils/checkAuth';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const userAuth = checkAuth(req.headers);

        const features = await Feature.find({});

        return res.status(200).json({ success: true, data: features });
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

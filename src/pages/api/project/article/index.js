import dbConnect from '../../../../utils/connect';
import Project from '../../../../models/Project';
import { checkAuth } from '../../../../utils/checkAuth';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'POST':
      try {
        let userAuth = checkAuth(req.headers);

        const { title, tags } = req.body;

        if (!title || !tags) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    
    default:
      res.status(400).json({ success: false });
      break;
  }
}

import { checkAuth } from '../../../utils/checkAuth';
import dbConnect from '../../../utils/connect';
import User from '../../../models/User';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        let userAuth = checkAuth(req.headers);

        const user = await User.findById(userAuth._id).select('current_plan');

        const userProjects = await Project.find({
          _id: {
            $in: user.current_plan.projects,
          },
        }).select('title tags created_at');

        // TODO: calculate credits...

        return res.status(200).json({
          success: true,
          data: {
            user,
            history: {
              projects: userProjects,
            },
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

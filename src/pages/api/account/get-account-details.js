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

        const user = await User.findById(userAuth._id).select(
          'current_plan full_name email address dob gender'
        );

        const projectsIds = user.current_plan
          ? user.current_plan.projects.map((value) => {
              return value.project_id;
            })
          : [];

        const userProjects = await Project.find({
          _id: {
            $in: projectsIds,
          },
        }).select('title tags created_at');

        const projectHistory = user.current_plan
          ? user.current_plan.projects.map((value) => {
              const currentProject = userProjects.find(
                (va) => va._id.toString() == value.project_id.toString()
              );
              let rest = currentProject ? currentProject._doc : {};
              return {
                credits: value.credits,
                ...rest,
              };
            })
          : [];

        return res.status(200).json({
          success: true,
          data: {
            user,
            history: {
              projects: projectHistory,
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

import dbConnect from '../../../utils/connect';
import Project from '../../../models/Project';
import User from '../../../models/User';
import { checkAuth } from '../../../utils/checkAuth';
import errorTypes from '../../../_mock/errorTypes';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'PUT':
      try {
        let user = checkAuth(req.headers);

        const { title, tags, industry } = req.body;

        let updateObject = {};

        if (title) {
          updateObject.full_name = fullName;
        }
        if (tags) {
          updateObject.password = await hash(password, 12);
        }
        if (industry) {
          updateObject.gender = gender;
        }

        await Project.updateOne(
          { email: user.email },
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
    case 'GET':
      try {
        let userAuth = checkAuth(req.headers);

        const projects = await Project.find({
          user_id: userAuth._id,
          active: true,
        }).select('title tags created_at industry');
        return res.status(200).json({ success: true, data: projects });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      break;
    case 'POST':
      try {
        let userAuth = checkAuth(req.headers);

        const user = await User.findById(userAuth._id);

        if (!user.current_plan) {
          return res.status(422).json({
            success: false,
            error: {
              message: 'No active plan!',
              details: { type: errorTypes.NO_PLAN },
            },
          });
        }

        if (
          new Date(user.current_plan.next_billing_date).getTime() <
          new Date().getTime()
        ) {
          return res.status(422).json({
            success: false,
            error: {
              message: 'Upgrade plan!',
              details: { type: errorTypes.PLAN_EXPIRED },
            },
          });
        }

        if (
          user.current_plan.projects.length + 1 >
          user.current_plan.account_plan.total_projects
        ) {
          return res.status(422).json({
            success: false,
            error: {
              message: 'Upgrade plan!',
              details: { type: errorTypes.LIMIT_EXCEED },
            },
          });
        }

        const { title, tags, industry } = req.body;

        if (!title || !tags) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
        }

        const newProject = new Project({
          title,
          tags,
          industry,
          user_id: userAuth._id,
        });

        user.current_plan.projects.push({
          project_id: newProject._id,
          credits: 0,
        });

        user.current_plan.plan_projects.push({
          project_id: newProject._id,
          credits: 0,
        });

        await user.save();

        await newProject.save();

        return res.status(200).json({ success: true, data: newProject });
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

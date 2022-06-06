import dbConnect from '../../../utils/connect';
import Project from '../../../models/Project';
import { checkAuth } from '../../../utils/checkAuth';

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

        const projects = await Project.find({ user_id: userAuth._id });
        return res.status(200).json({ success: true, data: projects });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      break;
    case 'POST':
      try {
        let userAuth = checkAuth(req.headers);

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

        await newProject.save();
        res.status(200).json({ success: true, data: newProject });
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

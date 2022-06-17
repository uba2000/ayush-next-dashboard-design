import dbConnect from '../../../utils/connect';
import Feature from '../../../models/Feature';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        let { name, slug, description, type } = req.body;

        if (!name || !slug || !description || !type) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
        }

        const newFeature = new Feature({
          type,
          name,
          slug,
          description,
        });
        await newFeature.save();
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

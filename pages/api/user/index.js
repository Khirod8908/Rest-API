import dbConnect from '../../../utils/dbconnect';
import user from '../../../models/user';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method == 'GET') {
    try {
      const users = await user.find({});
      res.status(200).json({ sucess: true, data: users });
    } catch (error) {
      res.status(400).json({ sucess: false, message: error });
    }
  } else if (method == 'POST') {
    try {
      const userdata = await user.create(req.body);
      res.status(200).json({ sucess: true, data: userdata });
    } catch (error) {
      res.status(400).json({ sucess: false, message: error });
    }
  }
  res.status(400).json({ sucess: false });
};

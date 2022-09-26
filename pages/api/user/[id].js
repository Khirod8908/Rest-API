import dbConnect from '../../../utils/dbconnect';
import user from '../../../models/user';

dbConnect();
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  if (method == 'GET') {
    try {
      const userdata = await user.findById(id);
      console.log(userdata);
      if (!userdata) {
        return res.status(400).json({ sucess: false });
      }

      res.status(200).json({ sucess: true, data: userdata });
    } catch (error) {
      res.status(400).json({ sucess: false, message: error });
    }
  } else if (method == 'PUT') {
    try {
      const userdata = await user.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!userdata) {
        return res.status(400).json({ sucess: false });
      }
      res.status(200).json({ sucess: true, data: userdata });
    } catch (error) {
      res.status(400).json({ sucess: false, message: error });
    }
  } else if (method == 'DELETE') {
    try {
      const deletuserdata = await user.deleteOne({ _id: id });
      if (!deletuserdata) {
        return res.status(400).json({ sucess: false });
      }
      res.status(200).json({ sucess: true, data: {} });
    } catch (error) {
      res.status(400).json({ sucess: false, message: error });
    }
  }

  res.status(400).json({ sucess: false });
};

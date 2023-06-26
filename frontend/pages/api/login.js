import connect from '../../lib/mongodb';
import User from '../../model/schema';

connect();

export default async function handler(req, res) {
  const { name, password } = req.body;
  const user = await User.findOne({ name, password });
  
  if (!user) {
    return res.json({ status: 'Not able to find the user' });
  } else {
    res.writeHead(302, { Location: '/home' });
    res.end();
  }
}

import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'No access',
      });
    }
  } else {
    return res.status(403).json({
      message: 'No access',
    });
  }
};

export default checkAuth;

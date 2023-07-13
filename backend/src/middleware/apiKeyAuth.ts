const apiKeyAuth = async (req, res, next) => {
  const API_KEY: string = process.env.API_KEY || 'demo';
  const headerApiKey = req.headers['x-api-key'];

  try {
    if (headerApiKey === API_KEY) {
      next();
    } else {
      throw 'Invalid API key.';
    }
  } catch (error) {
    //this should return error to client
    console.log(error);
    return res.status(401).json({
      message: error,
      error: true
    });
  }
};

export default apiKeyAuth;

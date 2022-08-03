export const uploadController = async (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
};

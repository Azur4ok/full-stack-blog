import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_, __, callBack) => {
    callBack(null, 'uploads');
  },
  filename: (_, file, callBack) => {
    callBack(null, file.originalname);
  },
});

export const upload = multer({ storage });

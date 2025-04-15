// lib/multer.js
import multer from "multer";
import path from "path";

// تحديد مكان تخزين الملفات بشكل صحيح
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads/")); // تأكد من أن المجلد في الجذر
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export default upload;

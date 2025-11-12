import multer from "multer";
import path from "path";

//configure storage
const storage =multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"./public/temp")
    },
    filename:function(req,file,cb){
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${req.user?._id || "anon"}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only PDF/DOC/DOCX files allowed"), false);
};

export const uploadResume=multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit set

});
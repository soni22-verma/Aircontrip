import multer from "multer";

const upload = multer({
    storage : multer.diskStorage({}),
    limits : {fileSize : 10485760}
})

export default upload;

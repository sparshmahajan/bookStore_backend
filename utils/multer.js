const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
            cb(null, true);
        }
        else {
            cb(new Error('Only images are allowed'), false);
        }
    }
});

module.exports = { upload };
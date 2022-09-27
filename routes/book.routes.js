const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { upload } = require('../utils/multer');
const {dataValidator} = require('../middlewares/dataValidator');
const {authMiddleware} = require('../middlewares/auth.middleware');

const { addBook, getBooks, updateBook, deleteBook } = require('../controllers/book.controller');

router.post('/', upload.single('image'),
    body('title').not().isEmpty().withMessage('Title is required'),
    body('author').not().isEmpty().withMessage('Author is required'),
    body('pages').not().isEmpty().withMessage('Pages is required'),
    body('price').not().isEmpty().withMessage('Price is required'),
    dataValidator, authMiddleware, addBook);

router.get('/', authMiddleware, getBooks);

router.put('/:id',authMiddleware, upload.single('image'),
    body('title').not().isEmpty().withMessage('Title is required'),
    body('author').not().isEmpty().withMessage('Author is required'),
    body('pages').not().isEmpty().withMessage('Pages is required'),
    body('price').not().isEmpty().withMessage('Price is required'),
    dataValidator, updateBook);

router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
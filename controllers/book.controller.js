const multer = require('multer');
const bookSchema = require('../models/bookSchema');
const { cloudinary } = require('../utils/cloudinary');

const addBook = async (req, res) => {
    const { title, author, pages, price } = req.body;
    
    try {
        let result = {
            secure_url: '',
            public_id: ''
        };
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const newBook = new bookSchema({
            title: title,
            imageUrl: result.secure_url,
            imageId: result.public_id,
            author: author,
            pages: parseInt(pages),
            price: parseFloat(price)
        });

        const book = await newBook.save();
        res.status(201).json({
            message: 'Book added successfully',
            bookId: book._id,
            title: book.title,
            imageUrl: book.imageUrl,
            imageId: book.imageId,
            author: book.author,
            pages: book.pages,
            price: book.price
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getBooks = async (req, res) => {
    const { page, limit,bookId } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    try {
        if(bookId){
            const book = await bookSchema.findById(bookId);
            res.status(200).json({
                message: 'Book retrieved successfully',
                book: book
            });
        }else{
            if(pageNumber && limitNumber){
                const books = await bookSchema.find().skip(skip).limit(limitNumber);
                const count = await bookSchema.countDocuments();
                res.status(200).json({
                    message: 'Books retrieved successfully',
                    totalBooks: count,
                    page : pageNumber,
                    limit : limitNumber,
                    books: books
                });
            } else {
                const books = await bookSchema.find();
                res.status(200).json({
                    message: 'Books retrieved successfully',
                    books: books
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server error' });
    }
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, pages, price } = req.body;
    try {
        let result = {
            secure_url: '',
            public_id: ''
        };
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const book = await bookSchema.findById(id);
        await cloudinary.uploader.destroy(book.imageId);

        if (book) {
            book.title = title;
            book.imageUrl = result.secure_url;
            book.imageId = result.public_id;
            book.author = author;
            book.pages = pages;
            book.price = price;
            const updatedBook = await book.save();
            res.status(200).json({
                message: 'Book updated successfully',
                bookId: updatedBook._id,
                title: updatedBook.title,
                imageUrl: updatedBook.imageUrl,
                imageId: updatedBook.imageId,
                author: updatedBook.author,
                pages: updatedBook.pages,
                price: updatedBook.price
            });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await bookSchema.findById(id);
        if (book) {
            await book.remove();
            await cloudinary.uploader.destroy(book.imageId);
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    addBook,
    getBooks,
    updateBook,
    deleteBook
};
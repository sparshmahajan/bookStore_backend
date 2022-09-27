require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

//connect to mongoDB
const db = require("./utils/database");

//Routes imports
const userRouter = require('./routes/user.routes');
const bookRouter = require('./routes/book.routes');

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

//routes
app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);


app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});

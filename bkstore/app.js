const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/friends_and_store', {
      useNewUrlParser: true, 
      useUnifiedTopology: true 
  });

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  edition: String,
  aboutAuthor: String,
  publish: String,
  status: String,
});

const Book = mongoose.model('Book', bookSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Route to display a list of books
app.get('/', async (req, res) => {
  try {
    const books = await Book.find({}).exec();
    res.render('index.ejs', { books });
  } catch (err) {
    console.error(err);
  }
});

// Route to add a new book
app.get('/add', (req, res) => {
  res.render('add.ejs');
});

app.post('/add', async (req, res) => {
  const { title, author, price, description, edition, aboutAuthor, publish, status } = req.body;

  const newBook = new Book({
    title,
    author,
    price,
    description,
    edition,
    aboutAuthor,
    publish,
    status,
  });

  try {
    await newBook.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/add');
  }
});

// Route to view book details
app.get('/view/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId).exec();
    if (book) {
      res.render('view.ejs', { book });
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to edit book details
app.get('/edit/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId).exec();
    if (book) {
      res.render('edit.ejs', { book });
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/edit/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    await Book.findByIdAndUpdate(bookId, req.body);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete a book
// app.get('/delete/:id', async (req, res) => {
//   const bookId = req.params.id;

//   try {
//     await Book.findByIdAndRemove(bookId).exec();
//     res.redirect('delete');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// -----------------------
app.post('/delete/:id', async (req, res) => {
  const bookId = req.params.id; 

  try {
    await Book.findByIdAndRemove(bookId).exec();
    res.redirect('/'); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// // Route to view book details
app.get('/view/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId).exec();
    if (book) {
      res.render('view.ejs', { book });
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
// -----------------------


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

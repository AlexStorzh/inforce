var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
var app = express();
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');
connect().catch(err => console.log(err));

async function connect() {
  await mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.a12bz5b.mongodb.net/?retryWrites=true&w=majority');
}

app.use('/', indexRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: 'error' });
});

module.exports = app;

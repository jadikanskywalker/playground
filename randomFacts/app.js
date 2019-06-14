const express = require('express'),
  app = express(),
  ejs = require('ejs');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const Schema = mongoose.Schema;
const articleSchema = new Schema({
  title: String,
  body: String,
  date: Date,
});

const Article = mongoose.model('Article', articleSchema);

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var articles = { title: 'This is fake', body: 'Fake words.', date: 'Not a date.' };
  var date = new Date();
  Article.find({ date: new Date(date.getFullYear(), date.getMonth(), date.getUTCDate() - 1) }, function(error, docs) {
    if (!error) {
      articles = docs;
      res.render('home', { articles: articles });
    }
    else {
      console.log(error);
      res.send(error);
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Running...');
});

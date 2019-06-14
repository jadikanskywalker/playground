var express = require('express'),
  app = express(),
  request = require('request');

app.get('/versions', function(req, res) {
  var url = 'https://api.scripture.api.bible/v1/bibles';
  request(url, {
    headers: {
      'api-key': '287eadeb42a4f433d825f2a9959d12bb'
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const { data } = JSON.parse(body);
      const versions = data.map((data) => {
        return {
          name: data.name,
          id: data.id,
          abbreviation: data.abbreviation,
          description: data.description,
          language: data.language.name
        };
      });
      res.json(versions);
    }
    else {
      res.json({ error: error, response: response });
    }
  });
});

app.get('/books', function(req, res) {
  var bibleId = req.query.bibleId;
  var url = 'https://api.scripture.api.bible/v1/bibles/' + bibleId + '/books';
  request(url, {
    headers: {
      'api-key': '287eadeb42a4f433d825f2a9959d12bb'
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const { data } = JSON.parse(body);
      const books = data.map(({ name, id }) => { return { name, id }; });
      res.json(books);
    }
    else {
      res.json({ error: error, response: response });
    }
  });
});

app.get('/chapters', function(req, res) {
  var bibleId = req.query.bibleId;
  var bookId = req.query.bookId;
  var url = 'https://api.scripture.api.bible/v1/bibles/' + bibleId + '/books/' + bookId + '/chapters';
  request(url, {
    headers: {
      'api-key': '287eadeb42a4f433d825f2a9959d12bb'
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const { data } = JSON.parse(body);
      const chapters = data.map(({ number, id }) => { return { number, id }; });
      res.json(chapters);
    }
    else {
      console.log('Sorry');
      res.json({ error: error, response: response });
    }
  });
});

app.get('/chapters', function(req, res) {
  var bibleId = req.query.bibleId;
  var bookId = req.query.bookId;
  var url = 'https://api.scripture.api.bible/v1/bibles/' + bibleId + '/books/' + bookId + '/chapters';
  request(url, {
    headers: {
      'api-key': '287eadeb42a4f433d825f2a9959d12bb'
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const { data } = JSON.parse(body);
      const chapters = data.map(({ number, id }) => { return { number, id }; });
      res.json(chapters);
    }
    else {
      console.log('Sorry');
      res.json({ error: error, response: response });
    }
  });
});

app.get('/passage', function(req, res) {
  var bibleId = req.query.bibleId;
  var chapterId = req.query.chapterId;
  var url = 'https://api.scripture.api.bible/v1/bibles/' + bibleId + '/passages/' + chapterId;
  request(url, {
    headers: {
      'api-key': '287eadeb42a4f433d825f2a9959d12bb'
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const { data } = JSON.parse(body);
      const passage = { reference: data.reference, content: data.content };
      res.json(passage);
    }
    else {
      res.json({ error: error, response: response });
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Listening on port ' + process.env.PORT);
});

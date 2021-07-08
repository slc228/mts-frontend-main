const path = require('path');
const ejs = require('ejs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const request = require('request');

const appPackage = require(path.resolve(__dirname, '../package.json'));
const port = appPackage.port;

const app = express();

app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, '../build'));
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../build')));
const pathList = ['/', '/home', '/search', '/auth'];

// Set proxy
app.use('/api', (req, res) => {
  const url = 'http://localhost:8082' + req.url;
  req.pipe(request(url)).pipe(res);
});

app.get(pathList, (req, res) => { res.render('index.html'); });
app.get('*', (req, res) => { res.redirect('../home') });

app.listen(port, function () { console.log(`Example app listening on port ${port}!`);});
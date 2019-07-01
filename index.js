const express = require('express');
const app = express();

require('./src/helper/wfc-simple-tile-helper').generate();
app.get('/', function(req, res) {
	res.send('Hello World!');
});

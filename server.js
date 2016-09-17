var express = require('express');
var app = express();

var imgur = require('./imgur.js');

var recentQueries = [];

app.get('/', function(req, res) {
    res.end("Access the API at /api/imagesearch/<query>/<page>");
});

app.get('/api/imagesearch/:query/:offset', function(req, res) {
    var query = req.params.query;
    var offset = req.params.offset;
    
    // Keep the 10 most recent queries.
    if (recentQueries.length >= 10)
        recentQueries.shift();
    recentQueries.push(query);
    
    // The search function ends the response itself once the data is collected.
    imgur.search(query, offset, res);
});

app.get('/api/imagesearch/recent', function(req, res) {
    res.end('Recent search queries: ' + recentQueries.toString()); 
});

app.listen(process.env.PORT || 5000);
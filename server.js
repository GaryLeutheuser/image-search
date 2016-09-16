var express = require('express');
var app = express();
var https = require('https');

var apiEndPoint = 'https://api.imgur.com/3/';

displayCredits();

app.get('/', function(req, res) {
    res.end("Access the API at /api/imagesearch/");
});

app.get('/api/imagesearch/:query/:offset', function(req, res) {
    var query = req.params.query;
    var offset = req.params.offset;
    
    imgurSearch('cats');
    
    res.end('Query: ' + query + ' Offset: ' + offset);
});

app.listen(process.env.PORT || 5000);

function displayCredits() {
    var getOptions = {
        hostname: 'api.imgur.com',
        path: '/3/credits',
        port: '443',
        method: 'GET',
        headers: {
            'Authorization': 'Client-ID ' + 'b9ac78f85cc8ca2'
        }
    }
    
    var getReq = https.request(getOptions, function(res) {
        res.on('data', function(data) {
            data = JSON.parse(data);
            console.log(data);
            console.log(data['data']['UserRemaining']);
        });
    });
    
    getReq.end();
}

function imgurSearch(query) {
    
    var postOptions = {
        encoding: 'UTF-8',
        host: 'api.imgur.com',
        path: '/3/gallery/search/top/0/?q=' + query,
        port: '443',
        method: 'GET',
        headers: {
            'Authorization': 'Client-ID ' + 'b9ac78f85cc8ca2'
        }
    }
    
    var postReq = https.request(postOptions, function(res) {
        var response = '';
        res.on('data', function(data) {
            response += data;
        });
        
        res.on('end', function() {
            console.log(JSON.parse(response));            
        });

    });
    
    postReq.end();
}
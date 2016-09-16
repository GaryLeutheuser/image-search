var express = require('express');
var app = express();
var https = require('https');

var imgur = require('./imgur.js');

var apiEndPoint = 'https://api.imgur.com/3/';

imgur.displayCredits();

app.get('/', function(req, res) {
    res.end("Access the API at /api/imagesearch/");
});

app.get('/api/imagesearch/:query/:offset', function(req, res) {
    var query = req.params.query;
    var offset = req.params.offset;
    
    imgur.search(query);
    
    res.end('Query: ' + query + ' Offset: ' + offset);
});

app.listen(process.env.PORT || 5000);

// function displayCredits() {
//     var getOptions = {
//         hostname: 'api.imgur.com',
//         path: '/3/credits',
//         port: '443',
//         method: 'GET',
//         headers: {
//             'Authorization': 'Client-ID ' + 'b9ac78f85cc8ca2'
//         }
//     }
    
//     var getReq = https.request(getOptions, function(res) {
//         res.on('data', function(data) {
//             data = JSON.parse(data);
//             console.log(data);
//             console.log(data['data']['UserRemaining']);
//         });
//     });
    
//     getReq.end();
// }

// function imgurSearch(query) {
    
//     var postOptions = {
//         encoding: 'UTF-8',
//         host: 'api.imgur.com',
//         path: '/3/gallery/search/top/0/?q_all=' + query + '&q_type=jpg',
//         port: '443',
//         method: 'GET',
//         headers: {
//             'Authorization': 'Client-ID ' + 'b9ac78f85cc8ca2'
//         }
//     }
    
//     var postReq = https.request(postOptions, function(res) {
//         var response = '';
//         res.on('data', function(data) {
//             response += data;
//         });
        
//         res.on('end', function() {
//             response = JSON.parse(response);
//             for (var i in response['data']) {
//                 console.log(response['data'][i]['link']);
//             }
//         });

//     });
    
//     postReq.end();
// }
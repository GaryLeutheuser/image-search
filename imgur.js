// Imgur API functionality.
// ===============
module.exports = {
    displayCredits: function() {
        var https = require('https');
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
    },
    
    search: function(query) {
        var https = require('https');
        
        var postOptions = {
            encoding: 'UTF-8',
            host: 'api.imgur.com',
            path: '/3/gallery/search/top/0/?q_all=' + query + '&q_type=jpg',
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
                response = JSON.parse(response);
                for (var i in response['data']) {
                    console.log(response['data'][i]['link']);
                }
            });
    
        });
        postReq.end();
    }
}
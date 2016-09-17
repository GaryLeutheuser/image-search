// Imgur API functionality.
// ===============
module.exports = {
    https: require('https'),
    creditsEndPoint: '/3/credits',
    searchEndPoint: '/3/gallery/search/',
    
    // Base GET options - path should be changed by calling function to
    // reflect which API endpoint is going to be used.
    getOptions: {
        encoding: 'UTF-8',
        hostname: 'api.imgur.com',
        path: '',
        port: '443',
        method: 'GET',
        headers: {
            'Authorization': 'Client-ID ' + 'b9ac78f85cc8ca2'
        }        
    },
    
    // Display information pertaining to remaining credits for usage of API.
    displayCredits: function() {
        this.getOptions.path = '/3/credits';
        
        var getReq = this.https.request(this.getOptions, function(res) {
            res.on('data', function(data) {
                data = JSON.parse(data);
                console.log(data);
            });
        });
        
        getReq.end();
    },
    
    search: function(query, offset, parentRes) {
        // Utilize the search endpoint.
        this.getOptions['path'] = this.searchEndPoint + 'top/' + offset + '/?q_all=' + query + '&q_type=jpg';
        
        var images = [];
        
        var getReq = this.https.request(this.getOptions, function(res) {
            var response = '';
            
            res.on('data', function(data) {
                response += data;
            });
            
            // Parse JSON only after the whole object is received.
            res.on('end', function() {
                response = JSON.parse(response);
                for (var i in response['data']) {
                    var image = response['data'][i];
                    
                    // Ignore albums - only want individual images
                    if (image['is_album'])
                        continue;
                        
                    var imageData = {
                        url: image['link'],
                        description: image['description']
                    }
                    
                    images.push(imageData);
                }
                
                parentRes.end(JSON.stringify(images));
            });
        });
        
        getReq.end();
    }
}
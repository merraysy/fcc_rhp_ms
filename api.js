var express = require('express'),
    uaParser = require('ua-parser-js');

var app = express();

app.get('/', function(req, res) {
   
   res.end('Go to https://' + req.hostname + '/api/whoami');
    
});

app.get('/api/whoami', function(req, res) {
    
    var ip = req.headers['x-forwarded-for'] || req.connection.socket.remoteAddress || req.socket.remoteAddress,
        lg = req.acceptsLanguages()[0],
        ua = uaParser(req.headers['user-agent']);
    
    var result = {
        'IP Address': ip,
        'Language': lg,
        'Operating System': ua.os.name + ' ' + ua.os.version
    }
   
    res.end(JSON.stringify(result));
    
});

var port = process.env.PORT;

app.listen(port, function() {
   console.log('Listening on port ' + port + '...'); 
});
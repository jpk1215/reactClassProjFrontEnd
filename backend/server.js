var express = require('express');
var env = require('../env');
var axios = require('axios');
var app = express();
var morgan = require('morgan');


app.use(morgan('combined'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/twitter', function(req,res){
    axios.request({
        url: 'https://api.twitter.com/1.1/search/tweets.json?q='+ req.query.name,
        method: 'get',
        headers:{
            'Authorization': 'Bearer ' + env.TWITTER_BEARER_TOKEN,
            'Access-Control-Allow-Origin': '*'
        }
    }).then(function(response) { res.send(response.data) })
        .catch(err => console.log(err))
});

app.listen('3000', function() {
    console.log('Universal App is running on port 3000')
});

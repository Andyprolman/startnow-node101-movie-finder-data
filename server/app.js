

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const axios = require('axios');
const cache ={};



const app = express();
app.use(morgan('combined'));

app.get('/', function(req, res){
    //res.setHeader('Content-Type', 'text/html')
    //res.status(200);
   if(cache[req.query.i]){
       res.send(cache[req.query.i])
   }
   if(cache[req.query.t]){
       res.send(cache[req.query.t]);
    }
             if(req.query.i){
                var movieId = `i=${req.query.i}`;
                axios.get('http://www.omdbapi.com/?' + movieId + '&apikey=8730e0e')
                    .then((response)=>{ 
                        res.send(response.data);
                        cache[req.query.i] = response.data;
                        
                        
                    })
                    .catch(err =>console.log(err.message));
                    
            } 
            if(req.query.t){
                    //console.log('inside t')
                    var movieTitle = `/?t=${req.query.t}`.replace(' ','%20');
                    console.log(movieTitle, req.url)
                    axios.get('http://www.omdbapi.com' + req.url + '&apikey=8730e0e')
                    .then((response)=>{
                        res.send(response.data);
                        cache[req.query.t] = response.data;
                        
                    })
                    .catch(err =>console.log(err.message));
                    

            }
        
    //console.log('this is the cache:' + cache);
    
})






// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;
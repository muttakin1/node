var http = require('http');
var express = require('express');
var app = express();
var server= http.Server(app);
var bodyParser=require ('body-parser');
var mongo = require('mongodb');

var db_url= "mongodb+srv://Muttakin:12345six@cluster0-2wehj.mongodb.net/test?retryWrites=true&w=majority"
var db;
var mongoose = require("mongoose");

mongoose.connect(db_url, { useNewUrlParser: true });
mongoose.connection.on('error', function(err){
  console.log(err);
  console.log('Could not connect to mongodb');
})


mongo.MongoClient.connect(db_url,{useNewUrlParser:true}, 
  function(err,client){
    if(err){
      console.log("Could Not Connect DB")
    }else{
      db=client.db('node-cw9')

    }

})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))



// app.get('/index',function(req,res){
//     res.sendFile(__dirname+'/index.html')
// })
// app.get('/second',function(req,res){
//     res.sendFile(__dirname+'/secondpage.html')
// })
// app.get('/form',function(req,res){
//   res.sendFile(__dirname+'/form.html')
// })
// app.get('/article',function(req,res){
//   res.render('article.ejs',{article:dummyArticle})
// })
// app.post('/article/new',function(req,res){
//   console.log(req.body)
//   db.createCollection('articles',function(err,collection){
//     console.log(collection)
//   })
//   var collection =db.collection('articles');
//   collection.save(req.body)
//   res.send({message:"data received"})
// })
// // var server = http.createServer(function(req, res){
// //   res.statusCode = 200;
// //   sre.setHeader('Content-Type', 'text/html');
// //   fs.readFile('index.html', function(err,data){
// //     if (err){
// //        return console.log("File read error")
// //     }  
    
// //     res.end(data);
// //   })
// // });
// server.listen(3000, 'localhost', function(){
//   console.log('Server running');
// });



app.get('/', function(request, response){
  response.render('index.ejs');
});

app.get('/about-page', function(request, response){
  response.render('about.ejs');
});

require('./routes/article-routes.js')(app);
server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
  console.log('Server running');
});

const express= require('express');
const app = express();
var mongo= require('mongodb');
app.use(express.json());
//connect to database and show list of collections.

app.get('/api/ass',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("event_management_system");
 
  dbo.listCollections().toArray(function(err, collInfos) {
    if (err) throw err;
    console.log(collInfos);
    res.send(collInfos);
db.close();
 });
});
});
//post services to insert document into staff collection.
app.post('/API/as/st/', (req, res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("event_management_system");
  var myobj = { sid:113,password: "aaabb", designation:"event organiser"};
  dbo.collection("staff").insertOne(myobj, function(err, result) {
    if (err) throw err;
    console.log("1 document inserted");
res.send(result);
    db.close();
  });
});
});
//put service to update the data......
app.put('/API/as/staf/:sid', (req, res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("event_management_system");
  var myquery = { sid:110 };
  var newvalues = { $set: {designation:"operational Manager"} };
  dbo.collection("staff").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("document updated");
res.send(result);
    db.close();
  });
});
});
//delete service to delete the data
app.delete('/API/staff/:sid', (req, res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    var dbo = db.db("event_management_system");
  var myquery = { sid:'111'};
  dbo.collection("staff").deleteMany(myquery, function(err, result) {
    if (err) throw err;
    console.log("documents deleted");
res.send(result);
    db.close();
  });
});
});
const port= process.env.PORT||8081;
app.listen(port,()=>console.log('listening to port ${port}...'));
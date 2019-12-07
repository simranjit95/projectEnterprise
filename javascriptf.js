const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


app.post('/insert', (req, res)=> {
console.log("Trying to insert new client data..");
console.log("SponsorId: " + req.body.client)
res.send("1 document inserted");
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("event_management_system");
 var myobj = {"sponsorId": req.body.sponsorId,"sname" :req.body.same,"amount" :req.body.amount,};
 dbo.collection("sponsor").insertOne(myobj, function(err, res) {
   if (err) throw err;
   console.log("1 document inserted");

   db.close();
 });

});
});


app.get('/show',(req,res)=> {

MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("event_management_system");
 dbo.collection("sponsor").find({}).toArray(function(err,result) {
 if (err) throw err;
 console.log(result);
 res.send(result);
 db.close();
});
});
});

app.post('/update',(req,res)=> {
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("event_management_system");
 var myquery = { "sponsor": req.body.sponsor };
 var newvalues = { $set: {"sname":req.body.sname } };
 dbo.collection("sponsor").updateOne(myquery, newvalues, function(err, res) {
   if (err) throw err;
   console.log("1 document updated");
   db.close();
 });
});
});

app.post('/delete',(req, res)=> {
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("event_management_system");
 var myobj = { "sponsor": req.body.sponsor };
 dbo.collection("sponsor").deleteOne(myobj, function(err, result) {
   if (err) throw err;
   res.send("1 document deleted");
   console.log("1 document deleted");
   db.close();
 });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));


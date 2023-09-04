var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
// const {MongoClient} = require('mongodb');

// const client = new MongoClient('mongodb://localhost:27017/mydatabase')

// client.connect().then(()=>
// console.log("Database created!")
// ).catch(err=>
//     console.log(err));

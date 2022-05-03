const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = "mongodb+srv://rana012:s1rd1rp1r1@cluster0.2hdxw.mongodb.net/lastDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});





client.connect(err => {
  const productCollection = client.db("lastDb").collection("something");

  app.get("/products", (req, res) => {
    productCollection.find({})
    .toArray( (err, documents) => {
      res.send(documents);
    })
  })  
  
    
  app.post("/addProduct", (req, res) => {
    const product = req.body;
    productCollection.insertOne(product)
    .then(result => {
      console.log('product added successfully');
      res.send('product added successfully');
    })
  })


  app.delete("/delete/:id", (req, res) => {
    productCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
      console.log(result);
    })
  })


});



app.listen(3000);
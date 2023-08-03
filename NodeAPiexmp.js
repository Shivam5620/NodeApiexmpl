const Express = require("express");
const MongoClient = require('mongodb').MongoClient;
const BodyParser = require("body-parser");
const ObjectId=require('mongodb').ObjectId;
const CONNECTION_URL = "mongodb://127.0.0.1:27017/";
const DATABASE_NAME = "Ecommerce";
var app = Express();
var cors = require('cors')
app.use(cors())
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var db, collection;
app.listen(5000, () => {
    const client = new MongoClient(CONNECTION_URL);
    client.connect();
    db = client.db(DATABASE_NAME);
    collection = db.collection("Student");
    console.log("Connected to `" + DATABASE_NAME + "`!");
});


app.get("/studata", async (request, response) => {
    var result = await collection.find({}).toArray();
    response.send(result);
});

app.get("/studata/:id", async (request, response) => {
    console.log(request.params.id)
    var result = await collection.findOne({ "userid": request.params.id });
    response.send(result);
});
// exports.getProductDetailsById = (req, res) => {
//     const { id } = req.params
//     if (id) {
//       collection.findOne({ _id: id }).then((product) => {
//         if (product) {
//           res.status(200).json({ message: "product found successfully....", product });
//         }
//       }).catch((error) => {
//         res.status(400).json({ message: "No Product in database...", error });
//       });
//     } else {
//       return res.status(400).json({ error: "Params required" });
//     }
//   };

app.post("/studata", async (request, response) => {
    var result = await collection.insertOne(request.body);
    response.send(result);
});

app.put("/studata/:id", async (request, response) => {
    var result = await collection.updateOne({ "userid": request.params.id }, { $set: request.body });
    response.send(result);
});


app.delete("/studata/:id", async (request, response) => {
    var result = await collection.deleteOne({ "userid": request.params.id });
    response.send(result);
});

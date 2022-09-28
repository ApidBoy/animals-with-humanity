require('dotenv').config()
const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.CREDENTIALS;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/views/styles'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.render('index.ejs');  
});

app.post('/', (req, res) => {
    async function init() {
        try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        const collection = client.db("test").collection("users");
        await collection.insertOne({
            'Name': 'xyz',
            'Address': '123 street',
            'Description': 'test desc',
            'One more thingy': 'one more thing',
            'Picture': "https://imgsv.imaging.nikon.com/lineup/dslr/df/img/sample/img_01_l.jpg"
        });
        console.log(req.body.image);
        console.log("Connected successfully to server");
        } finally {
        await client.close();
        }
    }
    init().catch(console.dir);
    res.redirect('/');
});

app.listen(8000);

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
            'Name': req.body.name,
            'Contact No.': req.body.contact,
            'Description': req.body.desc,
            'Location': req.body.location,
            'Picture': req.body.imageData
        });
        console.log("Connected successfully to server");
        } finally {
        await client.close();
        }
    }
    init().catch(console.dir);
    res.redirect('/');
});
app.get('/about', (req, res) => {
    res.render('about.ejs');
})

app.listen(process.env.PORT || 8000);

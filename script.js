require('dotenv').config()
const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.CREDENTIALS;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/views/styles'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.render('index1.ejs');
});

app.post('/', (req, res) => {
    async function init() {
        try {
        await client.connect();
        const collection = client.db("main").collection("users");
        await collection.insertOne({
            'Name': req.body.name,
            'Contact': req.body.contact,
            'Location': req.body.location,
            'Type': req.body.type,
            'Description': req.body.desc,
            'Picture': req.body.imageData,
            'DeletionID': String(Date.now())
        });
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

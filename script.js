const express = require('express');
const app = express();
app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/views/styles'));
app.use(express.urlencoded({extended:true}));
app.get('/', (req, res) => {
    res.render('index.ejs');  
});
app.post('/', (req, res) => {
    console.log(req.body.data);
});
app.listen(8000);

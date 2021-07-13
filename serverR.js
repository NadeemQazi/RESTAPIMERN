var express = require("express")
let Books  = require('./booksSchema')  
let mongodbConnected=require('./MongodbConnect')
const cors = require('cors');

var app =express()
const todoRoutes = express.Router();
var bodyparser=require("body-parser")
app.use(bodyparser.json());
app.use(bodyparser.urlencoded())

app.use(cors());



const PORT = 5000;
todoRoutes.route('/').get(function(req,res){ 
    Books.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            
            res.json(todos);
        }
    });
});

todoRoutes.route('/addbooks').post(function(req,res)
{
    console.log("Ref",req.body)
    let newbook = new Books(req.body);
    console.log("newbook",newbook)
    newbook.save()
        .then(todo => {
            res.status(200).json({'books': 'book added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new book failed');
        });
})






app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
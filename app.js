//Import our dependencies
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');

//init app
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//session setup
app.use(session({secret:'WAWAWAWA'}));
let ssn ;

//set app view engine
app.set('views', './public/views');
app.set('view engine', 'ejs');
//set application public files
app.use(express.static(__dirname + '/public'));

//Default Route - Index
app.get('/', (req, res) => {
    res.render('pages/index');
    ssn = req.session;
    ssn.basket = [];
});
//set the defualt route
app.get('/menu', (req, res) => {
    res.render('pages/menu');
});

//HOME
app.get('/home', (req, res) => { //home page post login
    ssn = req.session;
    res.render('pages/home');
})

app.get('/about', (req, res) => {
    res.render('pages/about');
})


//USER LOGIN & REGISTER ROUTES

// login form view
app.get('/login', (req, res) => {
    res.render('pages/login');
})


    // process form submit
app.post('/login', (req, res) => {
    console.log("woohoo");
    if (req.body.username === "luke" && req.body.password === "woo") { //valid login
      res.redirect('/home');
      ssn.loggedIn = true;
      ssn.username = req.body.username;
      console.log(ssn);

      //to-do Initiate session variables
    }
    else { //invalid login
        res.render('pages/login/err')
    }
})

app.get('/register', (req, res) => {
    res.render('pages/register');
})

app.post('/register', (req, res) => {
    res.render('pages/register');
})

app.get('/logout', (req, res) => {
    res.redirect('/home');
})


//ORDER ROUTES

app.get('/menu', (req, res) => {
    res.render('pages/menu');
})

//basket
app.get('/basket', (req, res) => {
    res.render('pages/basket');
})

app.post('/addToBasket', (req, res) => {
    ssn.basket = ssn.basket || [];
    ssn.basket.push(req.body.item);
    res.end();
})

app.post('/removeFromBasket', (req, res) => {
    //find the index of the item to delete
    var index = ssn.basket.indexOf(req.body.item);
    //if the item exists remove it
    if( index > -1 ) {
        ssn.basket.splice(index, 1);
    }
    res.end();
})
app.get('/requestBasket', (req, res) => {
    if (ssn != undefined) {
        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        res.end(JSON.stringify(ssn.basket));
    }
    res.end();
})

app.get('/checkout', (req, res) => {
    res.render('pages/checkout');
})


app.listen(8080);
console.log('App running on port 8080');


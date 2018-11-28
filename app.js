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
});
//set the defualt route
app.get('/menu', (req, res) => {
    res.render('pages/menu');
});

//HOME
app.get('/home', (req, res) => { //home page post login
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

    if (req.body.username === "luke") { //valid login

      ssn.loggedIn = true;
      res.redirect('/home');

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
    if (ssn === undefined) {
        ssn = req.session;
        ssn.basket = [];
    }
    ssn.basket.push(req.body.item);
    console.log(ssn.basket.length);
    res.end();
})



app.get('/checkout', (req, res) => {
    res.render('pages/checkout');
})


app.listen(8080);
console.log('App running on port 8080');

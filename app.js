//Import our dependencies
let express = require('express');

//init app
const app = express();
//set app view engine
app.set('views', './public/views');
app.set('view engine', 'ejs');
//set application public files
app.use(express.static(__dirname + '/public'));

//Default Route - Index
app.get('/', (req, res) => {
    res.render('pages/home');
});
//set the defualt route
app.get('/menu', (req, res) => {
    res.render('pages/menu');
});

//HOME
app.get('/home', (req, res) => {
    res.render('pages/home');
})

app.get('/about', (req, res) => {
    res.render('pages/about');
})


//USER LOGIN & REGISTER ROUTES

// -pre login
app.get('/login', (req, res) => {
    res.render('pages/login');
})

    // after submit
app.post('/login', (req, res) => {
    res.render('pages/login');
})

app.get('/register', (req, res) => {
    res.render('pages/register');
})

app.post('/register', (req, res) => {
    res.render('pages/register');
})

app.get('/logout', (req, res) => {
    res.render('pages/home');
})


//ORDER ROUTES

app.get('/menu', (req, res) => {
    res.render('pages/menu');
})

app.get('/basket', (req, res) => {
    res.render('pages/basket');
})

app.get('/checkout', (req, res) => {
    res.render('pages/checkout');
})


app.listen(8080);
console.log('App running on port 8080');


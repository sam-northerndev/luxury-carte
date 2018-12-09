//Import our dependencies
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');

//init app
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//session setup
app.use(session({secret: 'WAWAWAWA'}));
let ssn;

//set app view engine
app.set('views', './public/views');
app.set('view engine', 'ejs');
//set application public files
app.use(express.static(__dirname + '/public'));

//wenlong ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var resultArray = [];
MongoClient.connect('mongodb://localhost:27017/testDB', function (err, db) {
    if (err) throw err;

    app.get('/getJapaneseFood', (req, res) => {
        checkSession(req);
        var cursor = db.collection('janpaneseFood').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            res.render('pages/menu', {ejsData: resultArray});
            resultArray = [];
        })

    });
    app.get('/getItalianFood', (req, res) => {
        checkSession(req);
        var cursor = db.collection('italianFood').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            res.render('pages/menu', {ejsData: resultArray});
            resultArray = [];
        })
    });
//wenlong ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    app.get('/getChef', (req, res) => {
        checkSession(req);
        var cursor = db.collection('chefs').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
            resultArray.chef = true;
<<<<<<< HEAD
=======
        }, function () {
            res.render('pages/menu', {ejsData: resultArray});
            resultArray = [];
        })
    });
    app.get('/getDecor', (req, res) => {
        checkSession(req);
        var cursor = db.collection('decor').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
            resultArray.decor = true;
>>>>>>> sam-dev
        }, function () {
            res.render('pages/menu', {ejsData: resultArray});
            resultArray = [];
        })
    });

//Default Route - Index
    app.get('/', (req, res) => {
        checkSession(req);
        res.render('pages/index');
    });
//set the defualt route
    app.get('/menu', (req, res) => {
        checkSession(req);
        res.render('pages/menu', {ejsData: resultArray});
    });
//ACCOUNT
    app.get('/account', (req, res) => {

        let query = db.collection('user').findOne({username: ssn.username}).then(function (user) {
            //console.log(user);
            res.render('pages/account', {ejsData: user});
        });

    });

//HOME
    app.get('/home', (req, res) => { //home page post login
        checkSession(req);
        res.render('pages/home', {loggedIn: ssn.loggedIn});

    })

    app.get('/about', (req, res) => {
        res.render('pages/about');
    })


//USER LOGIN & REGISTER ROUTES

// login form view
    app.get('/login', (req, res) => {
        //TODO: add home button in nav bar
        checkSession(req)
        res.render('pages/login', {error: false});
    })


    // process form submit
    app.post('/login', (req, res) => {
        //wenlong ↓↓↓↓↓↓↓↓↓
        let query = db.collection('user').findOne({username: req.body.username}).then(function (user) {
            if (user === null) {
                res.render('pages/login/err');
            } else {
                if (req.body.password === user.password) { //valid login
                    res.redirect('/home');
                    ssn.loggedIn = true;
                    ssn.username = req.body.username;
                    console.log(ssn);


                } else { //incorrect password
                    res.render('pages/login', {error: true})
                }
            }
        });
    });
//wenlong ↑↑↑↑↑↑↑↑↑↑

    app.post('/register', (req, res1) => {

        let user_id = 0;
        //find which id the user should have
        let query = db.collection('user').find({}).toArray(function (err, result) {
            if (err) throw err;
            user_id = result.length + 1;

            let newUser = {
                ID: user_id,
                fullname: req.body.fullName_reg,
                username: req.body.username_reg,
                password: req.body.password_reg,
                email: req.body.email_reg
            };
            db.collection("user").insertOne(newUser, function (err, res) {
                if (err) throw err;
                res1.redirect('/home');
                ssn.loggedIn = true;
                ssn.username = req.body.username_reg;
                console.log(ssn);
            });
        });

    });

    app.get('/logout', (req, res) => {
        ssn = req.session;
        console.log(ssn);
        res.redirect('/');
    })


//ORDER ROUTES

    app.get('/menu', (req, res) => {
        res.render('pages/menu', {ejsData: resultArray});
    })
    app.get('/orderConfirm', (req, res) => {
        res.render('pages/confirm', {ejsData: ssn.basket});
        //clear the basket
        ssn.basket = [];
    })

//basket
    app.get('/basket', (req, res) => {
        if (ssn != undefined) {
            res.render('pages/basket', {ejsData: ssn.basket});
        }
        else {
        res.render('pages/basket');
        }
    })

    app.post('/addToBasket', (req, res) => {
        ssn.basket = ssn.basket || [];
        let obj = {
            item: req.body.item,
            price: req.body.price
        }
        ssn.basket.push(obj);
        console.log(ssn.basket);
        res.end();
    })

    app.post('/removeFromBasket', (req, res) => {
        //find the index of the item to delete
        var index = ssn.basket.findIndex(obj => obj.item === req.body.item);
        //if the item exists remove it
        if (index > -1) {
            ssn.basket.splice(index, 1);
        }
        res.end();
    })
    app.get('/requestBasket', (req, res) => {
        if (ssn != undefined) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(ssn.basket));
        }
        res.end();
    })

    app.get('/checkout', (req, res) => {
        res.render('pages/checkout');
    })
})


function checkSession(req) {
    if (!ssn) {
        ssn = req.session;
        ssn.loggedIn = false;
    }
}

app.listen(8080);
console.log('App running on port 8080');
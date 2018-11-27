//Import our dependencies
let express = require('express');

//init app
const app = express();
//set app view engine
app.set('views', './public/views');
app.set('view engine', 'ejs');
//set application public files
app.use(express.static(__dirname + '/public'));

//set the defualt route
app.get('/', (req, res) => {
    res.render('pages/home');
});
//set the defualt route
app.get('/menu', (req, res) => {
    res.render('pages/menu');
});


app.listen(8080);
console.log('App running on port 8080');


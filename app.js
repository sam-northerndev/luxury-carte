//Import our dependencies
let express = require('express');

//init app
const app = express();
//set app view engine
app.set('views', './public/views');
app.set('view engine', 'ejs');

//set the defualt route
app.get('/', (req, res) => {
    res.render('pages/index');
});


app.listen(8080);
console.log('App running on port 8080');


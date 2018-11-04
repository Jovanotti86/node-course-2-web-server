const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}, method: ${req.method}, path: ${req.url} `;
    
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error) {
            console.log('Unable to appent to server.log');
        }
    })
    console.log(log);
    next();
});
app.use(express.static(__dirname + '/public'))
/*app.use((req, res, next) => {
    res.render('maintance.hbs');
});*/


// region HBS
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
} )
hbs.registerHelper('screamIt', (string) => {
    return string.toUpperCase();
})
// endregion

// region ROUTES
app.get('/', (request, response) => {
    response.render('home.hbs', {
        title: 'Home title',
        WelcomeMessage: 'Welcome to the home page',
        webSiteTitle: 'Using handlebars moustache'
    })
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About the page',
        webSiteTitle: 'Using handlebars moustache ',
        simpleText: 'small letter first in server.js'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to do'
    });
});
// endregion

app.listen(3000);
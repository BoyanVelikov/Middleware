const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use('/register', (req, res, next) => {
    console.log('Middleware for register route!');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.route('/register')
    .get((req, res, next) => {
        console.log('Response will be sent after execution of the middleware!');
        next();
    }, (req, res) => {
        res.sendFile(__dirname + '/form.html');
    })
    .post((req, res) => {
        const {name, location} = req.body;
        res.send(`Name ${name} and location ${location} submitted successfully!`);
    });

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    res.send(`Current profile id is: ${id}`);
});

app.get('/*', (req, res) => {
    res.send('Page is not found!');
});

app.listen(port, () => {
    console.log(`App is running on ${port}`);
});
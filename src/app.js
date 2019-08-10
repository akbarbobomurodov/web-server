const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '/templates/views');
const partialPath = path.join(__dirname, '/templates/partials')

app.set('views', viewsPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath);

app.use(express.static(staticPath));
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Bobomurodov Akbar'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bobomurodov Akbar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help: 'Can you help',
        name: 'Bobomurodov Akbar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'This message address is not provided'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude }={}) => {
            if (error) {
                return res.send({
                    err: error
                })
            } else {
                console.log(latitude, longitude)
                forecast(latitude, longitude, (err, data) => {
                    if (err) {
                        return res.send({
                            err: err
                        })
                    } else {
                        res.send({
                            latitude: data.latitude,
                            longitude:data.longitude,
                            temperature: data.temperature,
                            timezone:data.timezone
                        })
                    }
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provides earch term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        errorText: 'This page not found :(',
        name: 'Bobomurodov Akbar'
    })
})

app.get('*', (req, res) => {
    res.send('Not found this page :|');
})


app.listen(3000, () => {
    console.log('server started at 3000 port');
})

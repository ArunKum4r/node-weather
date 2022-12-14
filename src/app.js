const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'ArunKumar S'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'ArunKumar S'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        con: 'How can we help you',
        name: 'ArunKumar S'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    console.log(req.query.address)

    
    geoCode(req.query.address, (error,{latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
           if (error) {
            return res.send({error})
           }
        
        res.send({
            forecast: forecastdata,
            address: req.query.address,
            location
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Help Page Not Found',
        name: 'ArunKumar S'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Page Not Found',
        name: 'ArunKumar S'
    })
})

app.listen(port, () => {
    console.log('Server is online on port' + port)
})
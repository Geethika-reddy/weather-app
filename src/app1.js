const path = require('path')
const express= require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templets/views')
const partialsPath = path.join(__dirname, '../templets/partials')


//setup handlebars engine and view engine
app.set('view engine', 'hbs')
app.set('views',viewPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'weather',
        name: 'Geethika'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Geethika'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        Help: 'help command',
        title: 'Help',
        name: 'geethika'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address) 
    {
        return res.send({
            error: "you must provide address"
        })
    }

    geocode(req.query.address, (error,{ latitude, longitude, location } = {}) =>{
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })   
})    
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })

  

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'geethika',
        errorMessage: 'help article not found'

    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'geethika',
        errorMessage: 'page not found.'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})
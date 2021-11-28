// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs =  require('express-handlebars')
const restaurantList = require('./restaurant.json')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set ('view engine', 'handlebars')
app.use(express.static('public'))
// routes setting
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results })
})

//show page
app.get('/restaurants/:restaurants_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurants_id)
  res.render('show', { restaurant: restaurant })
})

//search bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurant, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})

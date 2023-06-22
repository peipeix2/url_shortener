const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const port = 3000
const Url = require('./models/url')
const generateShortURL = require('./generate_shorturl')
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //設定連線到mogoDB
const app = express()

//啟用handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended:true }))


//取得資料連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () =>{
  console.log('mongodb connected!')
})

//瀏覽首頁畫面
app.get('/', (req, res) => {
  res.render('index')
})

//說明文字：：：：
app.post('/', (req, res) => {
  const originalURL = req.body.original_url.toLowerCase()
  const shortenedURL = generateShortURL()
  return Url.create({ 
    original_url: originalURL, 
    shortened_url: shortenedURL })
    .then((url) => res.render('showurl', { originalURL, shortenedURL }))
    .catch(error => console.log(error))
})

//用短網址導回到原網站
app.get('/:encodedUrl', (req, res) => {
  const encodedUrl = req.params.encodedUrl
  Url.findOne({ shortened_url: encodedUrl })
    .then(url => {
      res.redirect(url.original_url)
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
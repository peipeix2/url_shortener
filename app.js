const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const port = 3000
const Url = require('./models/url')
const generateShortURL = require('./generate_shorturl')
const validateURL = require('./validate_url')
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

//產生不重複的短網址
app.post('/', (req, res) => {
  if (!req.body.original_url.trim()) {
    console.log(`Input can't be blank.`) //若輸入空白，提示使用者，並導回首頁
    return res.redirect('/')} 
  if (!validateURL(req.body.original_url.trim())) {
    console.log(`Input is not a valid url. Please try again.`) //若輸入非有效url，提示使用者，並導回首頁
    return res.redirect('/')
  }
  const originalURL = req.body.original_url.toLowerCase()
  Url.findOne({ original_url: originalURL })
    .then(data => {
      //若輸入相同網址，產生相同縮址
      if (data) {
        res.render('showurl', { originalURL, shortenedURL: data.shortened_url})
      } else {
        const shortenedURL = generateShortURL()
        Url.create({
          original_url: originalURL,
          shortened_url: shortenedURL
        })
          .then(newUrl => res.render('showurl', { originalURL, shortenedURL }))
          .catch(error => console.log(error))
      }
    })

})

//用短網址導回到原網站
app.get('/:encodedUrl', (req, res) => {
  const encodedUrl = req.params.encodedUrl
  Url.findOne({ shortened_url: encodedUrl })
    .then(data => {
      if (data) {
        res.redirect(data.original_url)
      } else {
        //發生錯誤時（例如：1. 資料庫不存在這筆縮址; 2. 原網址為無效網址），顯示可能的錯誤，並將網站導回首頁
        console.error(`Errors: 1. Couldn't find this url. OR 2. Original url is not valid.`)
        res.redirect('/')
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
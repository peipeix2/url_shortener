const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const port = 3000
const URL = require('./models/url')
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

app.post('/', (req, res) => {
  const original_URL = req.body.original_url
  console.log(original_URL)
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
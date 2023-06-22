const express = require('express')
const mongoose = require('mongoose')
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //設定連線到mogoDB
const app = express()



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

app.get('/', (req, res) => {
  res.send('Hello World, this is url_shortener.')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
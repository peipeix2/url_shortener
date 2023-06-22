//短網址設計：大小寫、數字隨機產生的5位數，必須包含至少一個數字

//函式1：隨機產生一組5位數密碼，密碼由號碼或大小寫文字組成
function generateCode() {
  //定義產生短網址的元素
  const letters = 'abcdedfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '1234567890'
  const collection = letters + numbers
  let shortCode = ''
  
  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * collection.length)
    shortCode += collection[index]
  }

  return shortCode
}

//函式2：檢驗密碼是否包含數字
function containNumbers(str) {
  return /\d/.test(str)
}

//函式3：最終產生包含至少一個數字的短網址
function generateShortURL() {
  let shortUrl = generateCode()
  while (!containNumbers(shortUrl)) {
     shortUrl = generateCode()
   }
  return shortUrl
}


module.exports = generateShortURL
# URL Shortener短網址產生器

將使用者輸入的https或http網址，轉化為簡潔的短網址

## 功能

1. 使用者於首頁輸入有效的https或http網址後，將能獲得由“localhost:3000/” + 5位英數亂碼組成的短網址
    
   ![URL-shortener-index](https://github.com/peipeix2/url_shortener/assets/61790525/c744d02f-cbff-465f-9e8d-e7d70bed44f0)
    
2. 若輸入內容為空白鍵、或非有效的URL格式，console將跳出提示提醒使用者，並將頁面導回首頁
3. 輸入相同的網址時，使用者會獲得相同的短網址
4. 點擊”copy”，直接複製短網址。視窗跳出提示，通知使用者複製成功
    
   ![URL-shortener-copy](https://github.com/peipeix2/url_shortener/assets/61790525/3134639f-becb-42fe-9eb7-e85b6f8d0796)
    
5. 在伺服器運作的情況下，通過短網址，能成功連到原址
6. 點擊左上角網頁名稱“Shortened-URL Generator”，回到首頁

## 開發工具

1. Node.js
2. Express 4.17.1
3. Express Handlebars 4.0.2
4. MongoDB
5. Mongoose 5.9.7
6. dotenv 16.3.1

## 開始使用

1. 確認電腦中安裝開發工具，以及npm和nodemon
2. 將專案clone到本地
3. 在本地，進入專案資料夾，輸入

```jsx
npm install
```

4. 確認下載開發工具及所需套件
5. 在專案內新建.env檔案，並輸入MongoDB連線資訊

```jsx
MONGODB_URI = mongodb+srv://<Your account>:<Your password><server location>/<database name>?retryWrites=true&w=majority
```

6. 在終端機輸入以下，啟動程式

```jsx
npm run dev
```

7. 當終端機出現以下字樣，伺服器啟動，連線成功

```jsx
App is running on http://localhost:3000
mongodb connected!
```

8. 在瀏覽器輸入以下網址，連線到首頁

```jsx
http://localhost:3000
```

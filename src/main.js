/*
 * @Author: joker
 * @Date: 2021-04-17 21:24:18
 * @LastEditTime: 2021-04-21 23:00:18
 * @LastEditors: Please set LastEditors
 * @Description: entry
 * @FilePath: \node_express\src\main.js
 */
const express = require("express")
// const cors = require("cors")
const cookieParser = require('cookie-parser')
const expreSession = require('express-session')
const filter = require("./utils/filter")
const router = require("./router")


const app = express()

// 访问静态资源
// app.use("/public", express.static("./public")) // 资源文件前要加 /public localhost:3001/public/test.html
// app.use(express.static("./public")) // 直接访问 localhost:3001/test.html

// 使用cors进行跨域处理,必须在app.use(router)的前面,无法携带cookie
// app.use(cors())

// 使用express调用bodyParser的方法（bodyParser已被弃用）,必须在app.use(router)的前面
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// 使用session保存用户信息
app.use(cookieParser())
app.use(expreSession({
    secret: 'itcast',
    resave: false,
    saveUninitialized: true
}))

// 路由拦截
app.all("*",filter.RouterFilter)

// 使用express路由中间件
app.use(router)

app.listen(3001, () => {
    console.log("loaclhost:3001");
})
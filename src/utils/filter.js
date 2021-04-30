/*
 * @Author: joker
 * @Date: 2021-04-26 21:57:49
 * @LastEditTime: 2021-04-30 00:06:29
 * @LastEditors: Please set LastEditors
 * @Description: router nav
 * @FilePath: \node_express\src\utils\filter.js
 */
const token = require("./token")

const RouterFilter = function (req, res, next) {

    // 解决跨域并允许携带cookie
    res.setHeader("Access-Control-Allow-Credentials", true)
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization,Origin,Accept") // Origin, X-Requested-With, Content-Type, Accept
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.setHeader("Content-Type", "application/json; charset=utf-8")
    res.setHeader("Access-Control-Allow-Credentials", true)

    if (req.method == 'OPTIONS') {
        return next()
    }

    const URL = req.url

    if (URL === '/login' || URL === '/sendemail') {
        return next()
    }

    const authorization = req.headers['authorization'];

    if (authorization === "undefined") {
        return res.status(401).send('用户未登录')
    } else {
        token.verToken(authorization).then((data) => {
            req.data = data;
            return next();
        }).catch((error) => {
            return res.status(401).send('Unauthorized');
        })
    }
}

exports.RouterFilter = RouterFilter
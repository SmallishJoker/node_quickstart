/*
 * @Author: joker
 * @Date: 2021-04-26 21:57:49
 * @LastEditTime: 2021-04-28 23:05:37
 * @LastEditors: Please set LastEditors
 * @Description: router nav
 * @FilePath: \node_express\src\utils\filter.js
 */
const RouterFilter = function (req, res, next) {
    // 解决跨域并允许携带cookie
    res.setHeader("Access-Control-Allow-Credentials", true)
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,Content-Type, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.setHeader("Content-Type", "application/json; charset=utf-8")
    res.setHeader("Access-Control-Allow-Credentials", true)
    if (!req.session.user && req.url !== "/login" && req.url !== "/sendemail") {
        console.log(req.url);
        return res.status(200).send({
            status: 401,
            message: "用户未登录"
        })
    }
    next()
}

exports.RouterFilter = RouterFilter
/*
 * @Author: joker
 * @Date: 2021-04-17 21:51:39
 * @LastEditTime: 2021-04-21 23:19:58
 * @LastEditors: Please set LastEditors
 * @Description: router
 * @FilePath: \node_express\router.js
 */
const router = require("express").Router()

const Service = require("./service/userService")

router.get("/", (req, res) => {
    res.send(req.url)
})

router.post("/login", (req, res) => {
    Service.QueryUsers(req.body).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(err).send(err)
    })
})

module.exports = router
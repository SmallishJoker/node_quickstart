/*
 * @Author: joker
 * @Date: 2021-04-17 21:51:39
 * @LastEditTime: 2021-04-21 23:19:58
 * @LastEditors: Please set LastEditors
 * @Description: router
 * @FilePath: \node_express\router.js
 */
const router = require("express").Router()
const sendEmail = require("./utils/sendEmail")

const Service = require("./service/userService")

router.post("/login", (req, res) => {
    console.log(req.session);
    if (req.body.verifyCode !== req.session.verifyCode) {
        return res.status(200).send({
            status: 500,
            message: "验证码错误"
        })
    }
    Service.QueryUsers(req.body).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.post("/sendemail", (req, res) => {
    sendEmail.send(req.body.email).then((data) => {
        console.log(data.verifyCode);
        req.session.verifyCode = data.verifyCode
        res.status(200).send(data.data)
    }).catch(err => {
        res.status(500).send(err)
    })
})

module.exports = router
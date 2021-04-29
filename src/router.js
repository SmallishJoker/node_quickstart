/*
 * @Author: joker
 * @Date: 2021-04-17 21:51:39
 * @LastEditTime: 2021-04-26 22:58:00
 * @LastEditors: Please set LastEditors
 * @Description: router
 * @FilePath: \node_express\router.js
 */
const router = require("express").Router()
const sendEmail = require("./utils/sendEmail")
const userService = require("./service/userService")
const articleService = require("./service/articleService")
const token = require("./utils/token")

router.post("/login", (req, res) => {
    // if (req.body.verifyCode !== req.session.verifyCode) {
    //     return res.status(200).send({
    //         status: 500,
    //         message: "验证码不正确"
    //     })
    // }
    userService.QueryUsers(req.body).then(data => {

        token.setToken(data.user_name, data.user_id).then((token) => {
            req.session.user = data.data
            res.status(200).send({
                status: 200,
                message: "登录成功",
                token,
            })
        });

    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: "服务器错误"
        })
    })
})

router.post("/sendemail", (req, res) => {
    sendEmail.send(req.body.email).then((data) => {
        req.session.verifyCode = data.verifyCode
        res.status(200).send(data.data)
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: "服务器错误"
        })
    })
})

router.get("/getCategory", (req, res) => {
    articleService.QueryCategorys().then(data => {
        res.status(200).send({
            status: 200,
            data,
        })
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: "服务器错误"
        })
    })
})

router.post("/getTag", (req, res) => {
    articleService.QueryTags(req.body.tag_name).then(data => {
        res.status(200).send({
            status: 200,
            data,
        })
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: "服务器错误"
        })
    })
})

router.post("/saveArticle", (req, res) => {
    articleService.SaveArticle({ ...req.body, ...{ user_info: req.session.user } }).then(data => {
        res.status(200).send({
            status: 200,
            data,
        })
    }).catch(err => {
        res.status(500).send({
            status: 500,
            message: "服务器错误"
        })
    })
})

module.exports = router
/*
 * @Author: joker
 * @Date: 2021-04-17 23:04:42
 * @LastEditTime: 2021-04-21 23:14:23
 * @LastEditors: Please set LastEditors
 * @Description: user crud 
 * @FilePath: \node_express\src\service\userService.js
 */
const Model = require("../model/userModel")

exports.QueryUsers = function (conditions) {
    if (conditions === undefined) {
        conditions = {}
    } else {
        if (conditions.name === '') {
            conditions = {}
        }
    }
    return new Promise((resolve, reject) => {
        Model.User.find({ user_name: conditions.username }).then(data => {
            if (data.length === 0) {
                resolve({
                    status: 404,
                    message: "该邮箱还未注册账号，请注册后登录"
                })
            }
            resolve({
                status: 200,
                message: "登录成功"
            })
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    })
}
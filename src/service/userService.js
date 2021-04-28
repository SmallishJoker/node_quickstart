/*
 * @Author: joker
 * @Date: 2021-04-17 23:04:42
 * @LastEditTime: 2021-04-26 23:20:35
 * @LastEditors: Please set LastEditors
 * @Description: user crud 
 * @FilePath: \node_express\src\service\userService.js
 */
const mongoose = require("mongoose")
const Model = require("../model/userModel")

const ObjectId = mongoose.Types.ObjectId

exports.QueryUsers = function (conditions) {
    if (conditions === undefined) {
        conditions = {}
    } else {
        if (conditions.name === '') {
            conditions = {}
        }
    }
    return new Promise((resolve, reject) => {
        Model.User.findOne({ email: conditions.email }, { _id: 0 }).then(data => {
            if (!data) {
                let user = Model.User({
                    user_id: ObjectId(),
                    user_name: `用户${new Date().getTime()}`,
                    pass_word: `${new Date().getTime()}`,
                    email: conditions.email
                })
                user.save((err, product) => {
                    if (err) throw err
                    resolve({
                        status: 200,
                        message: "登录成功",
                        data: product,
                    })
                })
            } else {
                resolve({
                    status: 200,
                    message: "登录成功",
                    data: data,
                })
            }
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    })
}
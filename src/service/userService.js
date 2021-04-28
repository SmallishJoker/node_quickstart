/*
 * @Author: joker
 * @Date: 2021-04-17 23:04:42
 * @LastEditTime: 2021-04-28 23:00:06
 * @LastEditors: Please set LastEditors
 * @Description: user crud 
 * @FilePath: \node_express\src\service\userService.js
 */
const mongoose = require("mongoose")
const Model = require("../model/userModel")
const SequenceValue = require("../utils/SequenceValue")

const ObjectId = mongoose.Types.ObjectId

exports.QueryUsers = async function (conditions) {
    const _id = await SequenceValue.getNextSequenceValue("userid")
    return new Promise((resolve, reject) => {
        Model.User.findOne({ email: conditions.email }, { _id: 0 }).then(data => {
            if (!data) {
                let user = Model.User({
                    _id,
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
/*
 * @Author: joker
 * @Date: 2021-04-17 22:57:07
 * @LastEditTime: 2021-04-21 22:49:50
 * @LastEditors: Please set LastEditors
 * @Description: database model
 * @FilePath: \node_express\src\model.js
 */
const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId;

const url = 'mongodb://localhost:27017/test'

const Schema = mongoose.Schema

// 连接数据库
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// 设计数据表结构
const userSchema = new Schema({
    user_id: {
        type: ObjectId,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
        trim: true,
    },
    pass_word: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: Number,
        default: 1
    },
}, {
    versionKey: false,
})

const User = mongoose.model('user', userSchema) // 构造User模型

exports.User = User
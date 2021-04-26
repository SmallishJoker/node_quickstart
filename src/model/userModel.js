/*
 * @Author: joker
 * @Date: 2021-04-17 22:57:07
 * @LastEditTime: 2021-04-26 23:20:52
 * @LastEditors: Please set LastEditors
 * @Description: database model
 * @FilePath: \node_express\src\model.js
 */
const mongoose = require("mongoose")

const url = 'mongodb://localhost:27017/test'

const Schema = mongoose.Schema

// 连接数据库
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// 设计数据表结构
const userSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: Number,
        default: 1
    },
    company: {
        type: String,
        default: "",
    },
    job_title: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    followee_count: {
        type: Number,
        default: 0,
    },
    follower_count: {
        type: Number,
        default: 0,
    },
    favorites_count: {
        type: Number,
        default: 0,
    },
}, {
    versionKey: false,
})

const User = mongoose.model('user', userSchema) // 构造User模型

exports.User = User
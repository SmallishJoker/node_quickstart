/*
 * @Author: joker
 * @Date: 2021-04-17 22:57:07
 * @LastEditTime: 2021-04-28 20:56:00
 * @LastEditors: Please set LastEditors
 * @Description: database model
 * @FilePath: \node_express\src\model.js
 */
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const url = 'mongodb://localhost:27017/test'

const Schema = mongoose.Schema

// 连接数据库
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// 设计数据表结构
const categorySchema = new Schema({
    _id: String,
    category_id: {
        type: ObjectId,
        required: true,
    },
    category_name: {
        type: String,
        required: true,
    },
    category_url: {
        type: String,
        required: true
    },
    ctime: {
        type: String,
        required: true
    },
    mtime: {
        type: String,
        required: true
    },
}, {
    versionKey: false,
})

const Category = mongoose.model('categorys', categorySchema)

exports.Category = Category

const tagSchema = new Schema({
    _id: String,
    tag_id: {
        type: ObjectId,
        required: true,
    },
    tag_name: {
        type: String,
        required: true,
        trim: true
    },
    ctime: {
        type: String,
        required: true,
        trim: true
    },
    mtime: {
        type: String,
        required: true,
        trim: true
    },
}, {
    versionKey: false
})

const Tag = mongoose.model('tags', tagSchema)

exports.Tag = Tag

const articleSchema = new Schema({
    _id: String,
    article_id: {
        type: ObjectId,
        required: true,
    },
    is_publish: {
        type: Boolean,
        default: false,
    },
    article_info: {
        title: {
            type: String,
        },
        mark_content: {
            type: String,
        },
        brief_content: {
            type: String,
        },
        category_id: {
            type: String,
        },
        ollect_count: {
            type: Number,
            default: 0
        }, // 收藏计数
        comment_count: {
            type: Number,
            default: 0
        }, // 评论计数
        like_count: {
            type: Number,
            default: 0
        }, // 点赞计数
    },
    user_info: Object,
    category: Object,
    tags: Array,
}, {
    versionKey: false
})

const Article = mongoose.model("articles", articleSchema)

exports.Article = Article
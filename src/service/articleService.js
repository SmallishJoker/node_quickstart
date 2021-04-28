/*
 * @Author: joker
 * @Date: 2021-04-17 23:04:42
 * @LastEditTime: 2021-04-26 23:20:35
 * @LastEditors: Please set LastEditors
 * @Description: user crud 
 * @FilePath: \node_express\src\service\userService.js
 */
const mongoose = require("mongoose")
const Model = require("../model/articleModel")

const ObjectId = mongoose.Types.ObjectId

exports.QueryCategorys = () => {
    return Model.Category.find({ _id: 0 })
}

exports.QueryTags = (tag_name) => {
    let arr = [
        {
            tag_id: ObjectId(),
            tag_name: "IOS",
            ctime: new Date(),
            mtime: "1619590990637"
        }
    ]
    const reg = new RegExp(tag_name, 'i') //不区分大小写
    return Model.Tag.find({
        $or: [
            {
                tag_name: {
                    $regex: reg
                }
            }
        ]
    }, { _id: 0 })
}

exports.SaveArticle = (article) => {
    return new Promise((resolve, reject) => {
        article = Model.Article({ ...{ article_id: ObjectId() }, ...article })
        article.save((err, product) => {
            if (err) reject(err)
            resolve(product)
        })
    })
}
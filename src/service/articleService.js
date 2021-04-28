/*
 * @Author: joker
 * @Date: 2021-04-17 23:04:42
 * @LastEditTime: 2021-04-28 20:39:55
 * @LastEditors: Please set LastEditors
 * @Description: user crud 
 * @FilePath: \node_express\src\service\userService.js
 */
const mongoose = require("mongoose")
const Model = require("../model/articleModel")
const SequenceValue = require("../utils/SequenceValue")

const ObjectId = mongoose.Types.ObjectId

exports.QueryCategorys = () => {
    return Model.Category.find({}, { _id: 0 })
}

exports.QueryTags = (tag_name) => {
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

exports.SaveArticle = async (article) => {
    const _id = await SequenceValue.getNextSequenceValue("articleid")
    return new Promise((resolve, reject) => {
        article = Model.Article({ ...{ article_id: ObjectId(), _id }, ...article })
        article.save((err, product) => {
            if (err) reject(err)
            resolve(product)
        })
    })
}
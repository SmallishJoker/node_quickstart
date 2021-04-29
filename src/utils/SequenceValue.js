/*
 * @Author: joker
 * @Date: 2021-04-28 19:50:26
 * @LastEditTime: 2021-04-28 23:06:31
 * @LastEditors: Please set LastEditors
 * @Description: getNextSequenceValue
 * @FilePath: \node_express\test.js
 */
const mongoose = require("mongoose")

const url = 'mongodb://localhost:27017/test'

const Schema = mongoose.Schema

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// 连接数据库
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const counterSchema = new Schema({
    _id: {
        type: String
    },
    sequence_value: {
        type: Number
    }
}, {
    versionKey: false
})

const Counter = mongoose.model("counters", counterSchema)

const getNextSequenceValue = function (id) {
    return new Promise((resolve, reject) => {
        Counter.findOneAndUpdate({ _id: id }, { $inc: { sequence_value: 1 } }, { new: true }, (err, product) => {
            if (err) throw err
            resolve(product.sequence_value)
        })
    })
}

exports.getNextSequenceValue = getNextSequenceValue
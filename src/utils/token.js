const jwt = require("jsonwebtoken")
const signkey = 'mes_qdhd_mobile_xhykjyxgs'

exports.setToken = (username, userid) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            name: username,
            id: userid
        }, signkey, { expiresIn: '1h' });
        resolve(token);
    })
}

exports.verToken = (token) => {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token.split(' ')[1], signkey);
        resolve(info);
    })
}
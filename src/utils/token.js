const jwt = require("jsonwebtoken")
const signkey = 'mes_qdhd_mobile_xhykjyxgs'

exports.setToken = (email, id) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            email,
            id
        }, signkey, { expiresIn: '1h' });
        resolve(token);
    })
}

exports.verToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, signkey, (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                console.log(result);
                resolve(result)
            }
        })
    })
}
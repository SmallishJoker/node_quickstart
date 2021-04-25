/*
 * @Author: joker
 * @Date: 2021-04-24 17:31:48
 * @LastEditTime: 2021-04-24 18:02:21
 * @LastEditors: Please set LastEditors
 * @Description: send email
 * @FilePath: \node_express\src\utils\sendEmail.js
 */
const nodeemailer = require('nodemailer');
const transporter = nodeemailer.createTransport({
    host: "smtp.qq.com",						// QQ邮箱的SMTP地址
    // host: "smtp.163.com",						// 网易邮箱的SMTP地址
    // host: "smtpdm.aliyun.com",// 阿里云的邮件地址
    port: 465,									// 每个邮箱的端口号可能是一样的，一般都使用465，但有些公司使用的就不是465
    secureConnection: false, // 是否使用 SSL
    auth: {
        user: 'smallishjoker@qq.com', 		// 你自己的邮箱的邮箱地址,用来发送邮件
        pass: 'ykblytbipwptdaaj'         // 授权码（不是邮箱密码）
    }
});

module.exports.send = (email) => {
    const emailCode = function captchaNumber() {
        let num = [];
        for (let i = 0; i < 6; i++) {
            num[i] = parseInt(Math.random() * 10);
        }
        return num.join('');
    }
    //随机生成6位数字

    const emailCotent = {
        from: 'smallishjoker@qq.com', // 发件人地址
        to: '', // 收件人地址，多个收件人可以使用逗号分隔
        subject: 'SmaiilshJoker的个人博客网站---邮箱验证码', // 邮件标题
        html: `
                <h1>您好：</h1>
                <p style="font-size: 18px;color:#000;">
                    您的验证码为：
                    <span style="font-size: 16px;color:#f00;"> <a>${emailCode()}</a>， </span>
                    您当前正在某某的个人博客网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
                </p>
                <p style="font-size: 1.5rem;color:#999;">5分钟内有效</p>
                ` // 邮件内容
    };

    return new Promise((resolv, reject) => {
        transporter.sendMail({ ...emailCotent, ...{ to: email } }, function (error, info) {
            if (error) {
                reject(error)
            }
            resolv({
                status: 200,
                message: "验证码已发送，请注意查收"
            })
        });
    })
}
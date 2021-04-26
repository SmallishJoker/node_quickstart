const RouterFilter = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Credentials", true)
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.setHeader("Content-Type", "application/json; charset=utf-8")
    res.setHeader("Access-Control-Allow-Credentials", true)
    next()
}

exports.RouterFilter = RouterFilter
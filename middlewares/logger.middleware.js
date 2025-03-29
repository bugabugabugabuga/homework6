
const logger = (req, res, next) => {
    console.log(req.method, "logger middleware", req.headers["user-agent"]);

    next()
}


module.exports = {logger}
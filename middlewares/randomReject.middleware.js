



const randomRejectMiddleware = (req, res, next) => {

    const randomNumber = Math.random();

    if (randomNumber >= 0.5) {
        res.status(403).json({ message: "Request rejected randomly." });
    } else {
        next(); 
    }
};

module.exports = randomRejectMiddleware;
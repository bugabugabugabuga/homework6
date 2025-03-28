


const evenIdMiddleware = (req, res, next) => {
    const id = Number(req.params.id) || Number(req.body.id) || Number(req.query.id);

    if (id % 2 !== 0) {
        return res.status(403).json({ message: "Only even IDs are allowed" });
    }
    next();
};


module.exports =  evenIdMiddleware
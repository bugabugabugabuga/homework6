





const businessHoursMiddleware = (req, res, next) => {

    const currentTime = new Date();

    const currentHour = currentTime.getHours();
    
    if (currentHour >= 10 && currentHour < 18) {
        next();
    } else {
        res.status(403).json({ message: "Our service is available only during business hours (10:00 - 18:00)" });
    }
};



module.exports = businessHoursMiddleware;
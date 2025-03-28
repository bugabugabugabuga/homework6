
const express = require("express")


const blogsRouter = require("./blogs/blogs.router")
const { logger } = require("./middlewares/logger.middleware")



const app = express()
app.use(express.json())
app.use(logger) 
app.use(businessHoursMiddleware);
app.use(randomRejectMiddleware);
app.use(evenIdMiddleware);


app.use("/blogs",  blogsRouter)


app.get("/",  (req, res) => {
    res.send("hello world")
})





app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
    
})

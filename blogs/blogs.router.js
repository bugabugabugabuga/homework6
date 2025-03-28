const { Router } = require("express")
const { readFileAndParse, writeObjectInFile } = require("../utils/utils")
const { hasDeletePermition } = require("../middlewares/has-delete-permission.middlware")


const blogsRouter = Router()




blogsRouter.get("/", async (req, res) => {
    let (page = 30, take) = req.query
    take = Math.min(take, 30)
 const blogs = await readFileAndParse("blogs.json")
 const chunk = blogs.slice((page - 1) * take, take * page)
 res.json(chunk)

    

})

blogsRouter.post("/", async (req, res) => {
    const {title, content} = req.body
    if(!title || !content){
        return res.status(400).json({message: "bad request"})
    }
    const userEmail = req.headers["email"]

    const blogs = await readFileAndParse("blogs.json")
    const lastID = blogs[blogs.length - 1]?.id || 0

    const newBlog = {
        id: lastID +1,
        title,
        content,
        userEmail
    }

    blogs.push(newBlog)
    await writeObjectInFile("blogs.json", blogs)


    res.status(201).json({message: "created new blog", blog: newBlog})

})


blogsRouter.delete("/:id", hasDeletePermition, async (req, res) => {

    const id = Number(req.params.id)
    const parsedUsers = await readFileAndParse("blogs.json")
    
    const index = parsedUsers.findIndex(el => el.id === id)
    if(index === -1){
        res.status(400).json({message: "user not found"})
        return
    }


    const deletedUser = parsedUsers.splice(index, 1)
    await writeObjectInFile ("blogs.json", blogs)

    res.json({message: "deleted succesfully", data: deletedUser})
})


blogsRouter.get("/server-info", (req, res) => {
    const startTime = Date.now();
    const methodUsed = req.method;
    const deviceInfo = req.headers["user-agent"];

    setTimeout(() => {
        const responseTime = Date.now() - startTime;
        res.json({
            methodUsed: methodUsed,
            responseTime: `${responseTime} ms`,
            deviceInfo: deviceInfo
        });
    }, 500);
});


module.exports = blogsRouter
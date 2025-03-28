import { assert } from "console"
import fs from "fs/promises"


const readFileAndParse = async (filePath) => {
    const data =  await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
}


const writeObjectInFile = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data))
    console.log("write");
    
}

module.exports = {readFileAndParse,writeObjectInFile}
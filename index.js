const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors")

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))


const fs = require("fs")
const path = require("path");
const pathToFile = path.resolve("./data.json")

const getSongs = () => JSON.parse(fs.readFileSync(pathToFile))

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Smoke Test")
})

app.get("/songs", (req, res) => {
    const songs = getSongs()
    const newObject = songs.reduce((obj, currentSong) => {
        if(!obj[currentSong.decade]) {
        obj[currentSong.decade] = []
        }
        obj[currentSong.decade].push(currentSong)
        return obj
    }, {})
    res.status(200).json(newObject);
})

app.listen(PORT, () => {
    console.log("Server is listening on port:" + PORT)
})

module.exports = app
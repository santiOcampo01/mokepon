const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.static("https://santiocampo01.github.io/mokepon/public/"))
app.use(cors())
app.use(express.json())





const players = []

class Player {
    constructor(id) {
        this.id = id
    }

    getMokepon(mokepon) {
        this.mokepon = mokepon
    }

    getposition(x, y) {
        this.x = x;
        this.y = y
    }
    attacks(ataques) {
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(name) {
        this.name = name
    }
}

app.get("/join", (req, res) => {
    const id = `${Math.random()}`

    const player = new Player(id)
    res.setHeader("Access-Control-Allow-Origin", "*")
    players.push(player)
    res.send(id)
})

app.post("/mokepon/:playerId", (req, res) => {
    const playerId = req.params.playerId || ""
    const name = req.body.mokepon || ""
    const mokepon = new Mokepon(name)
    const playerIndex = players.findIndex((player) => playerId === player.id)

    if(playerIndex >= 0 ) {
        players[playerIndex].getMokepon(mokepon)
        res.send("players[playerIndex]")

    }else if(players >= 2){
        players.shift()
        res.send("no puedes tener mas de 2 mokepon")
    }

    console.log(players)
    console.log(playerId)
    res.end()
})

app.post("/mokepon/:playerId/position", (req, res) => {
    const playerId = req.params.playerId || ""
    const x = req.body.x || 0 
    const y = req.body.y || 0

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if(playerIndex >= 0 ) {
        players[playerIndex].getposition(x, y)
    }
    const enemys = players.filter((player) => playerId !== player.id)

    res.send({
        enemys
    })
})

app.post("/mokepon/:playerId/ataques", (req, res) => {
    const playerId = req.params.playerId || ""
    const ataques = req.body.ataques || []

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if(playerIndex >= 0 ) {
        players[playerIndex].attacks(ataques)
    }
    res.end()
})


app.get("/mokepon/:playerId/ataques", (req, res) => {
    const playerId = req.params.playerId || ""
    const player = players.find((player) => player.id === playerId)
    res.send({
        ataques: player.ataques || []
    })
    
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on http://192.168.0.16:${PORT}`);
  });


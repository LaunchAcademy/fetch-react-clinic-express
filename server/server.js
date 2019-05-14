const express = require("express")
const path = require("path")
const logger = require("morgan")
const bodyParser = require("body-parser")
const hbsMiddleware = require("express-handlebars")
const fs = require("fs")
const _ = require("lodash")

const app = express()

app.use(logger("dev"))
app.use(express.json())

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const bikesPath = path.join(__dirname, "../bikes.json")

const bikesJson = () => {
  return JSON.parse(fs.readFileSync(bikesPath).toString())
}

const newBikeId = () => {
  const bikes = bikesJson().bikes
  //lodash maxBy method returns an object by default
  const maxBike = _.maxBy(bikes, bike => bike.id)
  return maxBike.id + 1
}

const updateBikeDataJson = (bikes) => {
  const data = {bikes: bikes}
  fs.writeFileSync(bikesPath, JSON.stringify(data))
}

app.get("/", (req, res) => {
  res.send("Hello from the backend")
})

app.get("/api/v1/bikes", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "../bikes.json")).toString()
  res.json(JSON.parse(jsonString))
})

app.post("/api/v1/bikes", (req, res) => {
  const {make, year, model} = req.body
  if (make && year && model){
    const newBike = {
      id: newBikeId(),
      make: make,
      year: year,
      model: model
    }
    let bikes = bikesJson().bikes
    bikes.push(newBike)
    updateBikeDataJson(bikes)
    res.status(201).json({ bike: newBike })
  }
  else {
    res.status(422).json({ name: ["Fields can't be blank"] })
  }
})

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...")
})

module.exports = app

let express = require("express");
let cookie = require("cookie-parser");
let fs = require("fs");
let bp =  require("body-parser");
let arenas = require("./arenas")

let app = express();

app.use(bp.json())

let open = (path) => {
    let me = {
        read:() => fs.readFileSync(path, "utf8"),
        write:(data) => fs.writeFileSync(path, data)
    };

    return me
}


app.get("/", (req, res, next) => {
    res.send(
        open("./public/index.html").read()
    )

})

app.post("/getcard_info", (req, res, next) => {
    console.log(req.body)
    let json = JSON.parse(fs.readFileSync(`./data/cards/${req.body.card}/data.json`, "utf8"));
    res.json(json)
})

app.post("/getarenas", (req, res, next) => {
    res.json(arenas)
})


app.post("/getcards", (req, res, next) => {
    res.json(fs.readdirSync("data/cards", "utf8"))
})

app.use("/src", express.static("./src"));
app.use("/data", express.static("./data"));

app.listen(7070, () => {
    console.log(":3")
})
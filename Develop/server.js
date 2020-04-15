// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        let notes = JSON.parse(data);
        console.log(notes);
        res.json(notes);
    });
});


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    newNote.id = Date.now();
    console.log(newNote);
    fs.readFile(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        let notes = JSON.parse(data);
        // console.log(notes);
        notes.push(newNote);
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function () {
            console.log("testing function");
        });
    })
});
app.delete("/api/notes/:id", function(req, res){
    console.log(req.params.id);
    // read the file use loop to get the note by id delete it  
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

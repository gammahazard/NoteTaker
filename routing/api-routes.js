const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


module.exports = function(app) {
// to use notes route
    app.get("/api/notes", function(req, res) {
       
        res.json(data);

    });

    app.get("/api/notes/:id", function(req, res) {

        res.json(data[Number(req.params.id)]);

    });

// posting note in html 
    app.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(`note added with id: ` + uniqueId);
        newNote.id = uniqueId;
        data.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 

        res.json(data);    
        
    });

    // delete note using id
    app.delete("/api/notes/:id", function(req, res) {

        let noteId = req.params.id;
        let newId = 0;
        console.log(`Note deleted, ID: ${noteId}`);
        data = data.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 

}


const express = require("express");
const ejs = require("ejs");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use("/static", express.static('./static/'));


app.get("/", function(req, res){
  res.render("beatles-game-index");
});






let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port, function() {
  console.log("Server has started succesfully");
});

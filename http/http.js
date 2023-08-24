const http = require("http")
const PORT = 1111;

// ------------using inside--------------------------
// http.createServer( (req, res) =>
// {
//     res.write("Welcome to Our World.")
//     res.end();
// }).listen(PORT)


// ---------------using function--------------------

function htFunction (req, res)
{
    console.log("Welcome to Our World");
}
http.createServer(htFunction).listen(PORT)
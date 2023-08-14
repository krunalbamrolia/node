const http = require("http")
const PORT = 5111;

http.createServer( (req, res) =>
{
    res.write("Ge8rn Geschehen")
    res.end();
}).listen(PORT,"127.0.0.1",()=> {
    console.log("server is running....")
})
